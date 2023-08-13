/* eslint-disable */
/**
 * UI Elements used in forms
 * this file is a sub document of protoplus-ui file
 * document.createNewWindow => Creates a new floating window
 * Element.tooltip => show a floating tooltip when mouse overed
 * Element.slider => Custom input slider
 * Element.spinner => Custom input spinner
 * Element.textshadow => Mimics CSS textshadow
 * Element.rating => Prints rating stars
 * Element.hint => Places hint texts into text boxs
 */

if(window.Protoplus === undefined){
    throw("Error: ProtoPlus is required by ProtoPlus-UI.js");
}
Object.extend(document, {
    getViewPortDimensions: function (){
        // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        var height;
        var width;
        if (typeof window.innerWidth != 'undefined')
        {
            width = window.innerWidth;
            height = window.innerHeight;
        } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth !== 0) {
            width = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        } else { // older IE
            width = document.getElementsByTagName('body')[0].clientWidth;
            height = document.getElementsByTagName('body')[0].clientHeight;
        }
        return {height: height, width: width};
    },
    /**
     * Stops and destroys all tooltips
     */
    stopTooltips: function(){
        document.stopTooltip = true;
        $$(".pp_tooltip_").each(function(t){ t.remove(); });
        return true;
    },
    /**
     * Resumes tooltips
     */
    startTooltips: function(){
        document.stopTooltip = false;
    }
});

Protoplus.ui = {

    /**
     * Recursively check if the given element is visible or not
     */
    isVisible: function(element){
        element = $(element);
        if (!element.parentNode) {
            return false;
        }

        if (element && element.tagName == "BODY") {
            return true;
        }

        if (element.style.display == "none" || element.style.visibility == "hidden") {
            return false;
        }

        return Protoplus.ui.isVisible(element.parentNode);
    },

    /**
     * Makes element draggable
     * @param {Object} element
     * @param {Object} options
     */
    setDraggable:function(element, options){
        options = Object.extend({
            dragClass: "",
            handler: false,
            dragFromOriginal: false, // Disabled drag event on child elements
            onStart: Prototype.K,
            changeClone: Prototype.K,
            onDrag:  Prototype.K,
            onDragEnd:  Prototype.K,
            onEnd:   Prototype.K,
            dragEffect: false,
            revert: false,
            clone:  false,
            snap:   false,
            cursor: "move",
            offset: false,
            // Constraints are somewhat buggy in internet explorer
            constraint: false,
            constrainLeft:false,
            constrainRight:false,
            constrainTop:false,
            constrainBottom:false,
            constrainOffset:false, // [top, right, bottom, left]
            constrainViewport:false,
            constrainParent: false,
            dynamic:true
        }, options || {});

        if(options.snap && (typeof options.snap == "number" || typeof options.snap == "string")){
            options.snap = [options.snap, options.snap];
        }
        var mouseUp   = "mouseup",
            mouseDown = "mousedown",
            mouseMove = "mousemove";

        /*
        if(Prototype.Browser.MobileSafari){
            // It's nice and all but There is a problem with finishing the event
            // Until it's fixed we cannot use this
            mouseUp   = "touchend";
            mouseDown = "touchstart";
            mouseMove = "touchmove";
        }
        */

        if(options.constrainOffset){
            if(options.constrainOffset.length == 4){
                options.constrainTop = options.constrainTop? options.constrainTop : options.constrainOffset[0];
                options.constrainRight = options.constrainRight? options.constrainRight : options.constrainOffset[1];
                options.constrainBottom = options.constrainBottom? options.constrainBottom : options.constrainOffset[2];
                options.constrainLeft = options.constrainLeft? options.constrainLeft : options.constrainOffset[3];
            }
        }

        var handler;
        var stopDragTimer = false;

        var drag = function (e){
            Event.stop(e);
            if(mouseMove == "touchmove"){
                e = e.touches[0];
            }

            if(options.onDrag(drag_element, handler, e) === false){
                return;
            }

            var top   = startY+(Number(Event.pointerY(e)-mouseY));
            var left  = startX+(Number(Event.pointerX(e)-mouseX));

            if(options.offset){
                top   = options.offset[1]+ Event.pointerY(e);
                left  = options.offset[0]+ Event.pointerX(e);
            }

            if(options.snap){
                top = (top/options.snap[1]).round()*options.snap[1];
                left = (left/options.snap[0]).round()*options.snap[0];
            }
            top  = (options.constrainBottom !== false && top >= options.constrainBottom)? options.constrainBottom : top; // Check for max top
            top  = (options.constrainTop !== false && top <= options.constrainTop)? options.constrainTop : top; // Check for min top
            left = (options.constrainRight !== false && left >= options.constrainRight)? options.constrainRight : left; // Check for max left
            left = (options.constrainLeft !== false && left <= options.constrainLeft)? options.constrainLeft : left; // Check for min left

            if(options.constraint == "vertical"){
                drag_element.setStyle({top: top+"px"});
            }else if(options.constraint == "horizontal"){
                drag_element.setStyle({left: left+"px"});
            }else{
                drag_element.setStyle({top: top+"px", left: left+"px"});
            }

            if(stopDragTimer){
                clearTimeout(stopDragTimer);
            }
            options.onDrag(drag_element, handler, e);
            stopDragTimer = setTimeout(function(){
                options.onDragEnd(drag_element, handler, e);
            }, 50);
        };

        var mouseup = function (ev){
            Event.stop(ev);
            if(mouseUp == "touchend"){
                ev = e.touches[0];
            }
            if(options.dynamic !== true){
                document.temp.setStyle({top:element.getStyle('top'), left:element.getStyle('left')});
                element.parentNode.replaceChild(document.temp, element);
                document.temp.oldZIndex = element.oldZIndex;
                element = document.temp;
            }

            if(options.onEnd(drag_element, handler, ev) !== false){
                if(element.oldZIndex){
                    drag_element.setStyle({zIndex: element.oldZIndex});
                }else{
                    drag_element.setStyle({zIndex: ''});
                }

                if(options.revert){
                    if(options.revert === true){
                        options.revert = {
                            easing: "sineIn",
                            duration: 0.5
                        };
                    }
                    options.revert = Object.extend({
                        left:drag_element.startX,
                        top:drag_element.startY,
                        opacity:1,
                        duration:0.5,
                        easing:'sineIn'
                    }, options.revert || {});
                    drag_element.shift(options.revert);
                    drag_element.startX = false;
                    drag_element.startY = false;
                }else{
                    if(options.dragEffect){
                        drag_element.shift({opacity: 1, duration:0.2});
                    }
                }
            }
            element.__dragging = false;
            drag_element.removeClassName(options.dragClass);
            handler.setSelectable();
            drag_element.setSelectable();
            $(document.body).setSelectable();
            document.stopObserving(mouseMove, drag);
            document.stopObserving(mouseUp, mouseup);
        };

        if (options.handler) {
            if (typeof options.handler == "string") {
                handler = (options.handler.startsWith(".")) ? element.descendants().find(function(h){
                    return h.className == options.handler.replace(/^\./, "");
                }) : $(options.handler);
            } else {
                handler = $(options.handler);
            }
        }else{
            handler = element;
        }

        handler.setStyle({cursor:options.cursor});
        handler.observe(mouseDown, function(e){
            Event.stop(e);
            var evt = e;
            if(mouseDown == "touchstart"){
                e = e.touches[0];
            }
            element.__dragging = true;
            if(document.stopDrag){ return true; }
            if(options.dragFromOriginal && e.target != handler) { return false; }

            var vdim = false, voff = false;

            if(options.constrainElement) {
                voff = (Prototype.Browser.IE)? {top:0, left:0} : $(options.constrainElement).cumulativeOffset();
                vdim = $(options.constrainElement).getDimensions();
            }

            if(options.constrainParent)  {
                if($(element.parentNode).getStyle('position') == "relative" || $(element.parentNode).getStyle('position') == "absolute"){
                    voff = {top:0, left:0};
                }else{
                    voff = (Prototype.Browser.IE)? {top:0, left:0} : $(element.parentNode).cumulativeOffset();
                }

                vdim = $(element.parentNode).getDimensions();
            }

            if(options.constrainViewport){
                voff = $(document.body).cumulativeScrollOffset(); //{top:0, left:0};
                vdim = document.viewport.getDimensions();
            }

            if(vdim){
                vdim.height+=voff.top;
                vdim.width+=voff.left;
                options.constrainTop = voff.top+1;
                options.constrainBottom = vdim.height-(element.getHeight()+3);
                options.constrainRight = vdim.width-(element.getWidth()+3);
                options.constrainLeft = voff.left+1;
            }
            var temp_div;
            if(options.dynamic !== true){
                try{
                document.temp = element;
                temp_div = new Element('div').setStyle({
                        height: element.getHeight()+"px", width:element.getWidth()+"px", border:'1px dashed black',
                        top: element.getStyle('top') || 0,
                        left: element.getStyle('left') || 0,
                        zIndex: element.getStyle('zIndex')||0,
                        position:element.getStyle('position'), background:'#f5f5f5', opacity:0.3 });
                }catch(err){}
                element.parentNode.replaceChild(temp_div, element);
                element = temp_div;
            }
            if(["relative", "absolute"].include($(element.parentNode).getStyle('position'))){
                startX = element.getStyle("left")? parseInt(element.getStyle("left"), 10) : element.offsetLeft;
                startY = element.getStyle("top")? parseInt(element.getStyle("top"), 10) : element.offsetTop;
            }else{
                var eloff = element.cumulativeOffset();
                startX = eloff.left;
                startY = eloff.top;
            }
            mouseX = Number(Event.pointerX(e));
            mouseY = Number(Event.pointerY(e));
            if (options.clone) {
                drag_element = options.changeClone(element.cloneNode({deep: true}), startX, startY);
                $(document.body).insert(drag_element);
            }else{
                drag_element = element;
            }

            options.onStart(drag_element, handler, e);
            drag_element.addClassName(options.dragClass);

            element.oldZIndex = element.getStyle("z-index")||0;
            if(options.dragEffect){
                drag_element.shift({opacity: 0.7, duration:0.2});
            }

            drag_element.setStyle({position: "absolute", zIndex:99998});
            if(options.revert && !drag_element.startX && !drag_element.startY){
                drag_element.startX = startX;
                drag_element.startY = startY;
            }
            drag_element.setUnselectable();
            handler.setUnselectable();
            $(document.body).setUnselectable();
            document.observe(mouseMove, drag);
            document.observe(mouseUp, mouseup);

        });
        return element;
    },    
    /**
     * Creates a tooltion on an element
     * @param {Object} element
     * @param {Object} text
     * @param {Object} options
     */
    tooltip: function(element, text, options){
        element = $(element);
        // If prototip is included use it instead
        if('Prototip' in window){

            options = Object.extend({
                delay: 0.01
            }, options || {});

            var T = new Tip(element, text, options);
            return element;
        }


        // removed for whatever..
        // return element;
        if(typeof text != "string"){ return element; }
        options = Object.extend({
            className: false,
            fixed:false,
            opacity:1,
            title:false,
            width:200,
            height:100,
            offset:false,
            zIndex:100000,
            delay:false,
            duration:false,
            fadeIn:false,
            fadeOut:false,
            shadow:false
        }, options || {});
        text = (options.title)? "<b>"+options.title+"</b><br>"+text : text;
        element.hover(function(el, evt){
            var vpd = document.viewport.getDimensions();
            var getBoxLocation = function(e){

                var offTop = options.offset.top? options.offset.top : 15;
                var offLeft = options.offset.left? options.offset.left : 15;
                var top = (Event.pointerY(e)+offTop);
                var left = (Event.pointerX(e)+offLeft);

                var dim = tooldiv.getDimensions();

                // Keep the box in viewport
                if(left + dim.width > (vpd.width - 20)) { left -= dim.width  + 20 + offLeft; }
                if(top + dim.height > (vpd.height - 20)){ top  -= dim.height + offTop; }
                return {top:top, left:left};
            };

            if(document.stopTooltip){
                $$(".pp_tooltip_").each(function(t){ t.remove(); });
                return true;
            }

            outer = new Element("div", {className:'pp_tooltip_'}).setStyle({ opacity:options.opacity, position:"absolute", zIndex:options.zIndex});
            if(options.className){
                tooldiv = new Element("div", {className:options.className}).setStyle({position:"relative", top:"0px", left:"0px", zIndex:10}).update(text);
            }else{
                tooldiv = new Element("div").setStyle({padding:"4px", background: "#eee", width:(options.width == "auto"? "auto" : options.width+"px"), border:"1px solid #333", position:"absolute", top:"0px", left:"0px", zIndex:10}).update(text);
                tooldiv.setCSSBorderRadius('5px');
            }
            if(options.shadow){
                shadTop = options.shadow.top? parseInt(options.shadow.top, 10) : 4;
                shadLeft = options.shadow.left? parseInt(options.shadow.left, 10) : 4;
                shadBack = options.shadow.back? options.shadow.back : "#000";
                shadOp = options.shadow.opacity? options.shadow.opacity : 0.2;
                if (options.className) {
                    shadow = new Element("div", {className: options.className || ""}).setStyle({position:"absolute", borderColor:"#000", color:"#000", top:shadTop+"px", left:shadLeft+"px", zIndex:9, background:shadBack, opacity:shadOp});
                    shadow.update(text);
                }else{
                    shadow = new Element("div", {className: options.className || ""}).setStyle({padding:"4px", border:"1px solid black",  color:"#000", width:options.width+"px", position:"absolute", top:shadTop+"px", left:shadLeft+"px", zIndex:9, background:shadBack, opacity:shadOp});
                    shadow.setCSSBorderRadius('5px');
                    shadow.update(text);
                }

                outer.appendChild(shadow);
            }
            outer.appendChild(tooldiv);
            /*
            var removeButton = new Element('div');
            removeButton.innerHTML = 'X';
            removeButton.setStyle({ cursor:'pointer', border:'1px solid #666', background:'#cecece', textAlign:'center', top:'1px', width:'15px', position:'absolute', right:'1px', zIndex:1000 });
            removeButton.setCSSBorderRadius('4px');
            tooldiv.appendChild(removeButton);
            removeButton.observe('click', function(){
                outer.parentNode.removeChild(outer);
            });
            */
            var makeItAppear = function(){
                if (options.fixed) {
                    var fixTop = options.fixed.top? parseInt(options.fixed.top, 10) : element.getHeight();
                    var fixLeft = options.fixed.left? parseInt(options.fixed.left, 10) : element.getWidth()-50;
                    outer.setStyle({ top: fixTop+"px", left: fixLeft+"px"});
                }else{
                    element.observe("mousemove", function(e){
                        if(document.stopTooltip){
                            $$(".pp_tooltip_").each(function(t){ t.remove(); });
                            return true;
                        }
                        var loc = getBoxLocation(e);
                        // Keep the box in viewport
                        outer.setStyle({ top: loc.top+"px", left: loc.left+"px"});
                    });
                }
            };

            outer.delay = setTimeout(function(){
                if(options.fadeIn){
                    document.body.appendChild(outer);
                    var fl = getBoxLocation(evt);
                    outer.setStyle({opacity: 0, top:fl.top+"px", left:fl.left+"px"});
                    dur = options.fadeIn.duration? options.fadeIn.duration : 1;
                    outer.appear({duration:dur, onEnd:makeItAppear()});
                }else{
                    document.body.appendChild(outer);
                    var l = getBoxLocation(evt);
                    outer.setStyle({top:l.top+"px", left:l.left+"px"});
                    setTimeout(makeItAppear, 100);
                }

                if (options.duration) {
                    outer.duration = setTimeout(function(){
                        if (options.fadeOut) {
                            dur = options.fadeOut.duration ? options.fadeOut.duration : 1;
                            outer.fade({duration: dur, onEnd: function(){ if(outer.parentNode){  outer.remove(); } }});
                        }else{
                            if(outer.parentNode){ outer.remove(); }
                        }
                    }, options.duration * 1000 || 0);
                }
            }, options.delay*1000 || 0);
        },function(){

            if(document.stopTooltip){
                $$(".pp_tooltip_").each(function(t){ t.remove(); });
                return true;
            }
            if(outer){
                clearTimeout(outer.delay);
                clearTimeout(outer.duration);
            }
            if(options.fadeOut){
                dur = options.fadeOut.duration? options.fadeOut.duration : 0.2;
                outer.fade({duration:dur, onEnd:function(){ if(outer.parentNode){  outer.remove(); } }});
            }else{
                if(outer.parentNode){ outer.remove(); }
            }
        });
        return element;
    },
    /**
     * Creates Star rating element. Requires stars.png
     * @param {Object} element
     * @param {Object} options
     */
    rating: function(element, options){
        var isNewTheme = element.getAttribute('data-version') === 'v2';
        var starWidth = isNewTheme ? 32 : 16;
        var starHeight = isNewTheme ? 30 : 16;
        element = $(element);

        options = Object.extend({
            imagePath: "stars.png",
            onRate: Prototype.K,
            resetButtonImage:false,
            resetButtonTitle: 'Cancel Your Rating',
            resetButton:true,
            inputClassName:'',
            titles: [], // Give an array of titles for corresponding stars
            disable:false, // Disable element just after user gives a rating.
            disabled: element.getAttribute("disabled")? element.getAttribute("disabled") : false,
            stars: element.getAttribute("stars")? element.getAttribute("stars") : 5,
            name: element.getAttribute("name")? element.getAttribute("name") : "rating",
            value: element.getAttribute("value")? element.getAttribute("value") : 0,
            cleanFirst: false
        }, options || {});

        // Don't allow element to be starred again
        if(element.converted){ return element; }

        element.converted = true;
        element.addClassName('form-star-rating');
        var image = {
            blank: "0px 0px",
            over: -1 * starWidth + "px 0px",
            clicked: -2 * starWidth + "px 0px",
            half: -3 * starWidth + "px 0px",
            error: -4 * starWidth + "px 0px"
        };
        var hidden = new Element("input", {type:"hidden", name:options.name, className:options.inputClassName});
        var stardivs = $A([]);

        // Make Element Disabled
        element.disabled = (options.disabled=="true" || options.disabled === true)? true : false;
        element.setStyle({
            cursor: options.disabled ? "default" : "pointer" /*, clear:"left"*/
        });
        element.setUnselectable();
        if(options.cleanFirst){
            element.update();
        }
        var setStar = function(i){
            var elval = i;
            i = i || 0;
            var desc = $A(element.descendants());

            if (isNewTheme && element.querySelectorAll('.rated').length === i){
                desc[i-1].setStyle({ backgroundPosition:image.blank}).removeClassName("rated");
                i = i-1;
            }
            
            desc.each(function(e,c){
              e.setAttribute('aria-checked', i - 1 === c);
              if((i-1) < c){
                e.setStyle({ backgroundPosition:image.blank}).removeClassName("rated");
              }
              else {
                if(c<i){ 
                  e.setStyle({backgroundPosition:image.clicked}).addClassName("rated")
                }
              }
            });   
            hidden.value = i || "";
            if(options.disable){
                element.disabled = true;
                element.setStyle({cursor:"default"});
            }
            element.value = elval;
            options.onRate(element, options.name, i);
            element.run('keyup');
            hidden.run('change');
            if(!isNewTheme && options.resetButton){
                cross[ (i === 0)? "hide" : "show" ](); // Show or hide the resetButton
            }
        };
        /**
         * External method for setting the rating manually
         */
        element.setRating = setStar;

        $A($R(1, options.stars)).each(function(i){
            var starStyle = { backgroundImage: "url("+options.imagePath+")" };
            var star = new Element("div").setStyle(starStyle);
            star.observe("mouseover", function(){
                if(!element.disabled){
                    var desc = $A(element.descendants());
                    desc.each(function(e, c){ if(c < i){ e.setStyle({ backgroundPosition: e.hasClassName("rated")? image.clicked : image.over }); } });
                }
            }).observe("click", function(){
                if (!element.disabled) {
                    setStar(i);
                }
            });
            if(options.titles && options.titles[i-1]){
                star.title = options.titles[i-1];
            }
            stardivs.push(star);
        });

        if (!options.disabled) {
            element.observe("mouseout", function(){
                element.descendants().each(function(e){
                    // if rated then clicked, if not check if errored and new themethen apply errored if not apply blank
                    e.setStyle({
                        backgroundPosition: e.hasClassName("rated") ? image.clicked : hidden.errored && isNewTheme ? image.error : image.blank
                    });
                });
            });
        }

        if(options.resetButton){
            var cross = new Element("div").setStyle({height:"16px", width:"16px", margin:"0.5px", cssFloat:"left", color:'#999', fontSize:'12px', textAlign:'center'});
            if(options.resetButtonImage){
                cross.insert(new Element('img', {src:options.resetButtonImage, align:'absmiddle'}));
            }else{
                cross.insert(' x ');
            }
            cross.title = options.resetButtonTitle;
            cross.hide();
            cross.observe('click', function(){
                // disables the cancel button when elements disabled
                if (!element.disabled) {
                    setStar(undefined);
                }
            });
            stardivs.push(cross);
        }

        stardivs.each(function(star){ element.insert(star); });
        element.insert(hidden);
        if(options.value > 0){
            element.descendants().each(function(e, c){
                 c++;
                 if(c <= options.value){
                     e.setStyle({backgroundPosition:image.clicked }).addClassName("rated");
                 }

                 if(options.value > c-1 && options.value < c){
                     e.setStyle({backgroundPosition:image.half }).addClassName("rated");
                 }
             });
            hidden.value = options.value;
        }
        return element;
    },
    /**
     * Slider tool
     * @param {Object} element
     * @param {Object} options
     */
    slider:function(element, options){
        element = $(element);
        options = Object.extend({
            width:100,
            onUpdate:Prototype.K,
            maxValue:100,
            value:0,
            buttonBack:'url("../images/ball.png") no-repeat scroll 0px 0px transparent'
        }, options || {});

        if("JotForm" in window && "url" in JotForm){
            options.buttonBack = 'url("'+JotForm.url+'/images/ball.png") no-repeat scroll 0px 0px transparent';
        }

        var valueToPixel = function(value){
            var val = (value*100/options.maxValue)*barWidth/100;
            val = val < 3? 3 : val;
            return Math.round(val);
        };

        var sliderOut    = new Element('div', {tabindex:1});
        var sliderBar    = new Element('div');
        var sliderButton = new Element('div', {id:new Date().getTime()});
        var sliderTable  = new Element('table', {cellpadding:0, cellspacing:1, border:0, width:options.width, className:element.className});
        var tbody        = new Element('tbody');
        var tr           = new Element('tr');
        var tr2          = new Element('tr');
        var sliderTD     = new Element('td', {colspan:3});
        var startTD      = new Element('td', {align:'center', width:20}).insert('0');
        var statTD       = new Element('td', {align:'center', width:options.width-40}).insert(options.value).setStyle('font-weight:bold');
        var endTD        = new Element('td', {align:'center', width:20}).insert(options.maxValue);
        var barWidth     = options.width-18;
        var defaultValue = options.value;

        options.value = valueToPixel(options.value);

        /**
         * Moves the button left side by given value
         * @param {Object} amount
         */
        var moveLEFT = function(amount){
            var l = parseInt(sliderButton.getStyle('left'),10)-amount;
            l = (l <= 3)? 3 : l;
            sliderButton.setStyle({left:l+"px"});
            updateValue(l);
        };
        /**
         * Moves the button right side by given value
         * @param {Object} amount
         */
        var moveRIGTH = function(amount){
            var l = parseInt(sliderButton.getStyle('left'),10)+amount;
            l = (l >= barWidth)? barWidth : l;
            sliderButton.setStyle({left:l+"px"});
            updateValue(l);
        };
        /**
         * Handle key events
         * @param {Object} e
         */
        var sliderKeys = function(e){
            e = document.getEvent(e);
            if(e.keyCode == 37){
                moveLEFT(5);
            }else if(e.keyCode == 39){
                moveRIGTH(5);
            }
        };
        /**
         * Handle wheel events
         * @param {Object} e
         */
        var sliderWheel = function(e){
            if(!sliderOut.__hasFocus){ return true; }
            e.stop();
            sliderOut.focus();
            var w = Event.wheel(e);
            if(w > 0){ moveRIGTH(5); // If scroll up then move to the right
            }else if(w < 0){ moveLEFT(5); } // else move to the left
        };

        /**
         * Calculate the selected value ove 100
         * @param {Object} pos
         * @param {Object} start
         * @param {Object} end
         */
        var updateValue = function(pos){

            var total = barWidth;

            if(parseInt(pos, 10) <= 3){
                element.value = 0;
            }else{
                var a = Math.round( (parseInt(pos, 10) * options.maxValue) / total );
                element.value =  parseInt(a, 10);
            }
            sliderOut.value = element.value === 0? "" : element.value;
            sliderTable.value = sliderOut.value;
            options.onUpdate(element.value);
            statTD.innerHTML = element.value;
            element.run('keyup');
            return element.value;
        };

        // Set styles
        sliderOut.setStyle({
            //border: '1px solid #ccc',
            //background: '#f5f5f5',
            width: options.width + 'px',
            position: 'relative',
            overflow:'hidden',
            outline:'none'
        });

        sliderBar.setStyle({
            border: '1px solid #999',
            background: '#eee',
            margin: '8px',
            overflow:'hidden',
            height: '3px'
        }).setCSSBorderRadius('4px');

        sliderButton.setStyle({
            position: 'absolute',
            height: '13px',
            width: '13px',
            background: options.buttonBack,
            overflow:'hidden',
            border: '1px solid transparent',
            top: '3px',
            left: options.value + 'px'
        }).setCSSBorderRadius('8px');

        startTD.setStyle({fontFamily:'Verdana', fontSize:'9px'});
        statTD.setStyle({fontFamily:'Verdana', fontSize:'9px'});
        endTD.setStyle({fontFamily:'Verdana', fontSize:'9px'});

        sliderOut.insert(sliderBar).insert(sliderButton);
        sliderTable.insert(tbody.insert(tr).insert(tr2));
        sliderTD.insert(sliderOut);
        tr.insert(sliderTD);
        tr2.insert(startTD).insert(statTD).insert(endTD);

        // Set button draggable
        sliderButton.setDraggable({constraint:'horizontal', /*snap:10,*/ dragEffect:false, cursor:'default', constrainLeft:3, constrainRight:barWidth, onDrag:function(i){
            updateValue(i.getStyle('left')); // Calculate the amount while dragging
        }});

        sliderOut.observe('focus', function(){
            sliderOut.__hasFocus = true;
            sliderOut.setStyle({borderColor:'#333'});
        }).observe('blur', function(){
            sliderOut.__hasFocus = false;
            sliderOut.setStyle({borderColor:'#ccc'});
        });

        // Set key and mousewheel events
        sliderOut.observe('keypress', sliderKeys).observe(Event.mousewheel, sliderWheel);

        sliderOut.observe('click', function(e){ // Set bar click event
            if(e.target.id == sliderButton.id){ return false; }
            var l = (Event.pointerX(e)-sliderBar.cumulativeOffset().left);
            l = l < 3? 3 : l;
            l = l > barWidth? barWidth : l;
            sliderButton.shift({left:l, duration:0.5}); // move the button where it's clicked
            updateValue(l);
        });

        // Create an hidden field

        var hidden = new Element('input', {type:'hidden', className: 'form-slider ' + element.className,  name:element.name, value:defaultValue, id:element.id});
        element.parentNode.replaceChild(hidden, element); // replace the hidden with original box

        element = hidden;



        $(hidden.parentNode).insert(sliderTable.setUnselectable()); // add slider to the page

        hidden.setSliderValue = function(val){
            var v =valueToPixel(val);
            sliderButton.shift({left:v, duration:0.5});
            updateValue(v);
        };

        return hidden;
    },
    /**
     * Spinner input box
     * @param {Object} element
     * @param {Object} options
     */
    spinner: function(element, options){

        element = $(element);

        options = Object.extend({
            width:60,
            cssFloat:false,
            allowNegative:false,
            addAmount:1,
            maxValue:false,
            minValue:false,
            readonly:false,
            value:false,
            size: 5,
            iconPath: '//cdn.jotfor.ms/assets/img/builder/flat_arrow.svg',
            onChange: Prototype.K
        }, options || {});

        element.size = options.size; // Set a size to make it look good
        if(options.value === false){
            element.value = parseFloat(element.value) || '0';
        }else{
            element.value = options.value;
        }
        //set to minimum if smaller
        if(options.minValue)
        {
            if(parseFloat(element.value) < parseFloat(options.minValue))
            {
                element.value = options.minValue;
            }
        }
        //check negative if minimum is not set
        else if (!options.allowNegative && parseFloat(element.value) < 0) 
        {
            element.value = '0';
        }

        element.writeAttribute('autocomplete', 'none');
        // button Styles
        var spinnerContainer = new Element('div', {tabindex:'1'});

        if(options.cssFloat){
            spinnerContainer.setStyle({cssFloat:options.cssFloat, marginRight:'5px'});
        }

        var spinnerTable, arrowCont, inputCont, upTD, downTD, upArrow, downArrow; // define values

        spinnerTable = new Element('div', { className: 'form-spinner'});

        spinnerContainer.insert(spinnerTable);

        element.parentNode.replaceChild(spinnerContainer, element);
        // Construcy the input
        spinnerTable.insert(inputCont = new Element('div', {className: 'form-spinner-input-td'}).insert(element));
        // Construct the arrow button container
        spinnerTable.insert(arrowCont = new Element('div',  {className: 'form-spinner-button-container'}));
        // Construct the up arrow
        arrowCont.insert(upTD = new Element('div', {className: 'form-spinner-button form-spinner-up'}).insert(upArrow = new Element('img', {className: 'form-spinner-image form-spinner-up-image', src:options.iconPath, alt:'up arrow'})));
        // Construct the down arrow
        arrowCont.insert(downTD = new Element('div', {className: 'form-spinner-button form-spinner-down'}).insert(downArrow = new Element('img', {className: 'form-spinner-image form-spinner-down-image', src:options.iconPath, alt:'down arrow'})));

        var spinnerTableWidth = (options && options.width >= 180 ? options.width : 180)+'px';
        spinnerTable.setStyle({ width:spinnerTableWidth });

        /**
         * Up click handler
         */
        var numberUP = function(e){
            // Do not change disabled inputs
            if(element.hasAttribute("disabled")) {
                return;
            }

            if(!parseFloat(element.value)){
                element.value = 0;
            }
            if(options.maxValue && Number(element.value) >= Number(options.maxValue)){ return; } // Don't go up to maxValue
            var elementValueDP = parseInt(element.value) === parseFloat(element.value) ? 0 : (element.value + '').split('.')[1].length;
            var addAmountDP = parseFloat(options.addAmount) === parseInt(options.addAmount) ? 0 : (options.addAmount + '').split('.')[1].length;
            var decimalPoints = elementValueDP > addAmountDP ? elementValueDP : addAmountDP;
            element.value = (parseFloat(element.value)+parseFloat(options.addAmount)).toFixed(decimalPoints);
            options.onChange(element.value);
        };
        /**
         * Down click handler
         */
        var numberDOWN = function(e){
            // Do not change disabled inputs
            if(element.hasAttribute("disabled")) {
                return;
            }
            
            if(!parseFloat(element.value)){
                element.value = 0;
            }
            var elementValueDP = parseInt(element.value) === parseFloat(element.value) ? 0 : (element.value + '').split('.')[1].length;
            var addAmountDP = parseFloat(options.addAmount) === parseInt(options.addAmount) ? 0 : (options.addAmount + '').split('.')[1].length;
            var decimalPoints = elementValueDP > addAmountDP ? elementValueDP : addAmountDP;
            var newValue = (parseFloat(element.value)-parseFloat(options.addAmount)).toFixed(decimalPoints);
            if(options.minValue) { // Don't go below to minValue
                if(Number(newValue) < Number(options.minValue)){ return; }
            }  
            else if(!options.allowNegative && newValue < 0){ return; } // Don't go negative
            element.value = newValue;
            options.onChange(element.value);
        };
        /**
         * Handle key events
         * @param {Object} e
         * @param {Object} mode
         */
        var spinnerKeys = function(e, mode){
            if(e.target.tagName == "INPUT" && mode == 2){ return; }
            e = document.getEvent(e);
            if(e.keyCode == 38){
                numberUP(e);
                e.stop();
            }else if(e.keyCode == 40){
                numberDOWN(e);
                e.stop();
            }
        };

        upTD.observe('click', function(e){
            numberUP(e);
            element.run('keyup');
        }).setUnselectable();

        downTD.observe('click', function(e){
            numberDOWN(e);
            element.run('keyup');
        }).setUnselectable();

        element.observe(Prototype.Browser.Gecko? 'keypress' : 'keydown', function(e){ spinnerKeys(e, 1); });
        spinnerContainer.observe(Prototype.Browser.Gecko? 'keypress' : 'keydown', function(e){ spinnerKeys(e, 2); });
        if(options.readonly){
            element.writeAttribute('readonly', "readonly");
        }

        element.observe('change', function(){
            options.onChange(element.value);
        });

        return element;
    },
    /**
     * Places a small label boz at the specified position on an input box
     * @param {Object} element
     * @param {Object} label
     * @param {Object} options
     */
    miniLabel:function(element, label, options){
        options = Object.extend({
            position: 'bottom',
            color: '#666',
            size: 9,
            text:'',
            nobr: false
        }, options || {});
        element.wrap('span');
        span = $(element.parentNode);
        span.setStyle({whiteSpace:'nowrap', cssFloat:'left', marginRight:'5px'});
        var labelStyle = {paddingLeft:'1px', fontSize:options.size+"px", color:options.color, cursor:'default'};
        var labelClick = function(){
            element.focus();
        };
        var br = '<br>';

        if(options.nobr){
            br = '';
        }

        if(options.position == "top"){
            element.insert({before:new Element('span').setText(label+br).setStyle(labelStyle).observe('click', labelClick)}).insert({after:options.text});
        }else{
            element.insert({after:new Element('span').setText(br+label).setStyle(labelStyle).observe('click', labelClick)}).insert({after:options.text});
        }

        return span;
    },
    /**
     * Places hint texts into input boxes
     * @param {Object} element
     * @param {Object} value
     */
    hint: function(element, value, options){
        element = $(element);

        if("placeholder" in element){
            element.writeAttribute('placeholder', value);
            return element;
        }

        if(element.type == 'number'){ element.value="0"; return element; }

        if(element.removeHint){
            return element.hintClear();
        }

        options = Object.extend({
            hintColor:'#bbb'
        }, options || {});

        var color = element.getStyle('color') || '#000';

        if (element.value === '') {
            element.setStyle({color:options.hintColor});
            element.value = value;
            element.hinted = true;
        }
        var focus = function(){
            if(element.value == value){
                element.value = "";
                element.setStyle({color:color}).hinted = false;
            } else if(element.readAttribute("masked") == "true") {
                element.setStyle({color:color}).hinted = false;
            }
        };

        var blur = function(){
            setTimeout(function() {
                if(element.value === "") {
                    element.value = value;
                    element.setStyle({ color:options.hintColor }).hinted = true;
                }
            }, element.readAttribute("masked") == "true" ? 10 : 0);
        };

        if(element.readAttribute("masked") == "true") {
            element.observe('mouseleave', blur);
        }

        var submit = function(){
            if(element.value == value){
                element.value = "";
                element.hinted = false;
            }
        };

        element.observe('focus', focus);
        element.observe('blur', blur);

        if(element.form){
            $(element.form).observe('submit', submit);
        }

        element.runHint = blur;

        element.clearHint = function(){
            element.value = "";
            element.setStyle({color:color}).hinted = false;
        };

        element.hintClear = function(){
            element.value = value;
            element.setStyle({ color:options.hintColor }).hinted = true;
            return element;
        };

        element.removeHint = function(){
            element.setStyle({color:color});

            if(element.value == value){
                element.value = "";
            }
            element.hintClear = undefined;
            element.hinted = undefined;
            element.removeHint = undefined;

            element.stopObserving('focus', focus);
            element.stopObserving('blur', blur);

            if(element.form){
                $(element.form).stopObserving('submit', submit);
            }
            return element;
        };

        return element;
    }
};
Element.addMethods(Protoplus.ui);