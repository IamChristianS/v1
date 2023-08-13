/**
 * @file    protoplus.js
 * @title   Prototype Plus Extensions Library
 * @author  Serkan Yersen
 * @company Interlogy LLC
 * @version 0.9.9
 * @todo Perform a complete test for all CSS values for shift
 * @todo Read CSS classes and add Morping
 * @todo Write a complete documentation
 * @todo Add droppables
 * @todo Add resizables
 */
if(window.console === undefined){
    if (!window.console || !console.firebug) {
        (function (m, i) {
            window.console = {};
            var e = function () {};
            while (i--) { window.console[m[i]] = e; }
        })('log debug info warn error assert dir dirxml trace group groupEnd time timeEnd profile profileEnd count'.split(' '), 16);
    }
    window.console.error = function(e){ throw(e); };
}
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
if(window.Prototype === undefined){
    throw("Error:prototype.js is required by protoplus.js. Go to prototypejs.org and download lates version.");
}

Protoplus = {
    Version: "0.9.9",
    exec: function(code){
        return eval(code); // I have had this 'eval is evil' message
    },
    REFIDCOUNT: 100, // Reference ID
    references:{}, // Hold references
    /**
     * Returns the Internet explorer version
     */
    getIEVersion: function(){
      var rv = -1; // Return value assumes failure.
      if (navigator.appName == 'Microsoft Internet Explorer')
      {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
        if (re.exec(ua) !== null){
          rv = parseFloat( RegExp.$1 );
        }
      }
      return rv;
    },
    /**
     * Easing functions for animation effects
     * @param {Object} x
     */
    Transitions: {
        linear:     function(x){ return x; },
        sineIn:     function(x){ return 1 - Math.cos(x * Math.PI / 2); },
        sineOut:    function(x){ return Math.sin(x * Math.PI / 2); },
        sineInOut:  function(x){ return 0.5 - Math.cos(x * Math.PI) / 2; },
        backIn:     function(b){ var a = 1.70158;return (b) * b * ((a + 1) * b - a);},
        backOut:    function(b){ var a = 1.70158;return (b = b - 1) * b * ((a + 1) * b + a) + 1;},
        backInOut:  function(b){ var a = 1.70158;if ((b /= 0.5) < 1) {return 0.5 * (b * b * (((a *= (1.525)) + 1) * b - a));}return 0.5 * ((b -= 2) * b * (((a *= (1.525)) + 1) * b + a) + 2);},
        cubicIn:    function(x){ return Math.pow(x, 3); },
        cubicOut:   function(x){ return 1 + Math.pow(x - 1, 3); },
        cubicInOut: function(x){ return x < 0.5 ? 4 * Math.pow(x, 3) : 1 + 4 * Math.pow(x - 1, 3); },
        quadIn:     function(x){ return Math.pow(x, 2); },
        quadOut:    function(x){ return 1 - Math.pow(x - 1, 2); },
        quadInOut:  function(x){ return x < 0.5 ? 2 * Math.pow(x, 2) : 1 - 2 * Math.pow(x - 1, 2); },
        quartIn:    function(x){ return Math.pow(x, 4); },
        quartOut:   function(x){ return 1 - Math.pow(x - 1, 4); },
        quartInOut: function(x){ return x < 0.5 ? 8 * Math.pow(x, 4) : 1 - 8 * Math.pow(x - 1, 4); },
        quintIn:    function(x){ return Math.pow(x, 5); },
        quintOut:   function(x){ return 1 + Math.pow(x - 1, 5); },
        quintInOut: function(x){ return x < 0.5 ? 16 * Math.pow(x, 5) : 1 + 16 * Math.pow(x - 1, 5); },
        circIn:     function(x){ return 1 - Math.sqrt(1 - Math.pow(x, 2)); },
        circOut:    function(x){ return Math.sqrt(1 - Math.pow(x - 1, 2)); },
        circInOut:  function(x){ return x < 0.5 ? 0.5 - Math.sqrt(1 - Math.pow(2 * x, 2)) * 0.5 : 0.5 + Math.sqrt(1 - Math.pow(2 * x - 2, 2)) * 0.5; },
        expoIn:     function(x){ return Math.pow(2, 10 * (x - 1)); },
        expoOut:    function(x){ return 1 - Math.pow(2, -10 * x); },
        expoInOut:  function(x){ x = 2 * x - 1; return x < 0 ? Math.pow(2, 10 * x) / 2 : 1 - Math.pow(2, -10 * x) / 2; },
        swingFrom:  function(b){ var a = 1.70158;return b * b * ((a + 1) * b - a);},
        swingTo:    function(b){ var a = 1.70158;return (b -= 1) * b * ((a + 1) * b + a) + 1;},
        swingFromTo:function(b){ var a = 1.70158;return ((b /= 0.5) < 1) ? 0.5 * (b * b * (((a *= (1.525)) + 1) * b - a)) : 0.5 * ((b -= 2) * b * (((a *= (1.525)) + 1) * b + a) + 2);},
        easeFrom:   function(a){ return Math.pow(a, 4);},
        easeTo:     function(a){ return Math.pow(a, 0.25);},
        easeFromTo: function(a){ if ((a /= 0.5) < 1) {return 0.5 * Math.pow(a, 4);}return -0.5 * ((a -= 2) * Math.pow(a, 3) - 2);},
        pulse:      function(x, n){ if (!n) { n = 1; } return 0.5 - Math.cos(x * n * 2 * Math.PI) / 2; },
        wobble:     function(x, n){ if (!n) { n = 3; } return 0.5 - Math.cos((2 * n - 1) * x * x * Math.PI) / 2; },
        elastic:    function(x, e){ var a; if (!e) { a = 30; } else { e = Math.round(Math.max(1, Math.min(10, e))); a = (11 - e) * 5; } return 1 - Math.cos(x * 8 * Math.PI) / (a * x + 1) * (1 - x); },
        bounce:     function(x, n){ n = n ? Math.round(n) : 4; var c = 3 - Math.pow(2, 2 - n); var m = -1, d = 0, i = 0; while (m / c < x) { d = Math.pow(2, 1 - i++); m += d; } if (m - d > 0) { x -= ((m - d) + d / 2) / c; } return c * c * Math.pow(x, 2) + (1 - Math.pow(0.25, i - 1)); },
        bouncePast: function(a){ if (a < (1 / 2.75)) {return (7.5625 * a * a);}else {if (a < (2 / 2.75)) {return 2 - (7.5625 * (a -= (1.5 / 2.75)) * a + 0.75);}else {if (a < (2.5 / 2.75)) {return 2 - (7.5625 * (a -= (2.25 / 2.75)) * a + 0.9375);}else {return 2 - (7.5625 * (a -= (2.625 / 2.75)) * a + 0.984375);}}}}
    },
    Colors: {
        /**
         * Valid CSS color names
         */
        colorNames: {"Black": "#000000", "MidnightBlue": "#191970", "Navy": "#000080", "DarkBlue": "#00008B", "MediumBlue": "#0000CD", "Blue": "#0000FF", "DodgerBlue": "#1E90FF", "RoyalBlue": "#4169E1", "SlateBlue": "#6A5ACD", "SteelBlue": "#4682B4", "CornflowerBlue": "#6495ED", "Teal": "#008080", "DarkCyan": "#008B8B", "MediumSlateBlue": "#7B68EE", "CadetBlue": "#5F9EA0", "DeepSkyBlue": "#00BFFF", "DarkTurquoise": "#00CED1", "MediumAquaMarine": "#66CDAA", "MediumTurquoise": "#48D1CC", "Turquoise": "#40E0D0", "LightSkyBlue": "#87CEFA", "SkyBlue": "#87CEEB", "Aqua": "#00FFFF", "Cyan": "#00FFFF", "Aquamarine": "#7FFFD4", "PaleTurquoise": "#AFEEEE", "PowderBlue": "#B0E0E6", "LightBlue": "#ADD8E6", "LightSteelBlue": "#B0C4DE", "Salmon": "#FA8072", "LightSalmon": "#FFA07A", "Coral": "#FF7F50", "Brown": "#A52A2A", "Sienna": "#A0522D", "Tomato": "#FF6347", "Maroon": "#800000", "DarkRed": "#8B0000", "Red": "#FF0000", "OrangeRed": "#FF4500", "Darkorange": "#FF8C00", "DarkGoldenRod": "#B8860B", "GoldenRod": "#DAA520", "Orange": "#FFA500", "Gold": "#FFD700", "Yellow": "#FFFF00", "LemonChiffon": "#FFFACD", "LightGoldenRodYellow": "#FAFAD2", "LightYellow": "#FFFFE0", "DarkOliveGreen": "#556B2F", "DarkSeaGreen": "#8FBC8F", "DarkGreen": "#006400", "MediumSeaGreen": "#3CB371", "DarkKhaki": "#BDB76B", "Green": "#008000", "Olive": "#808000", "OliveDrab": "#6B8E23", "ForestGreen": "#228B22", "LawnGreen": "#7CFC00", "Lime": "#00FF00", "YellowGreen": "#9ACD32", "LimeGreen": "#32CD32", "Chartreuse": "#7FFF00", "GreenYellow": "#ADFF2F", "LightSeaGreen": "#20B2AA", "SeaGreen": "#2E8B57", "SandyBrown": "#F4A460", "DarkSlateGray": "#2F4F4F", "DimGray": "#696969", "Gray": "#808080", "SlateGray": "#708090", "LightSlateGray": "#778899", "DarkGray": "#A9A9A9", "Silver": "#C0C0C0", "Indigo": "#4B0082", "Purple": "#800080", "DarkMagenta": "#8B008B", "BlueViolet": "#8A2BE2", "DarkOrchid": "#9932CC", "DarkViolet": "#9400D3", "DarkSlateBlue": "#483D8B", "MediumPurple": "#9370D8", "MediumOrchid": "#BA55D3", "Fuchsia": "#FF00FF", "Magenta": "#FF00FF", "Orchid": "#DA70D6", "Violet": "#EE82EE", "DeepPink": "#FF1493", "Pink": "#FFC0CB", "MistyRose": "#FFE4E1", "LightPink": "#FFB6C1", "Plum": "#DDA0DD", "HotPink": "#FF69B4", "SpringGreen": "#00FF7F", "MediumSpringGreen": "#00FA9A", "LightGreen": "#90EE90", "PaleGreen": "#98FB98", "RosyBrown": "#BC8F8F", "MediumVioletRed": "#C71585", "IndianRed": "#CD5C5C", "SaddleBrown": "#8B4513", "Peru": "#CD853F", "Chocolate": "#D2691E", "Tan": "#D2B48C", "LightGrey": "#D3D3D3", "PaleVioletRed": "#D87093", "Thistle": "#D8BFD8", "Crimson": "#DC143C", "FireBrick": "#B22222", "Gainsboro": "#DCDCDC", "BurlyWood": "#DEB887", "LightCoral": "#F08080", "DarkSalmon": "#E9967A", "Lavender": "#E6E6FA", "LavenderBlush": "#FFF0F5", "SeaShell": "#FFF5EE", "Linen": "#FAF0E6", "Khaki": "#F0E68C", "PaleGoldenRod": "#EEE8AA", "Wheat": "#F5DEB3", "NavajoWhite": "#FFDEAD", "Moccasin": "#FFE4B5", "PeachPuff": "#FFDAB9", "Bisque": "#FFE4C4", "BlanchedAlmond": "#FFEBCD", "AntiqueWhite": "#FAEBD7", "PapayaWhip": "#FFEFD5", "Beige": "#F5F5DC", "OldLace": "#FDF5E6", "Cornsilk": "#FFF8DC", "Ivory": "#FFFFF0", "FloralWhite": "#FFFAF0", "HoneyDew": "#F0FFF0", "WhiteSmoke": "#F5F5F5", "AliceBlue": "#F0F8FF", "LightCyan": "#E0FFFF", "GhostWhite": "#F8F8FF", "MintCream": "#F5FFFA", "Azure": "#F0FFFF", "Snow": "#FFFAFA", "White": "#FFFFFF"},
        /**
         * Creates a color palette
         */
        getPalette: function(){
            var generated = {};
            var cr = ['00', '44', '77', '99', 'BB', 'EE', 'FF'];
            var i = 0;
            for(var r = 0;  r < cr.length; r++){
                for(var g = 0;  g < cr.length; g++){
                    for(var b = 0;  b < cr.length; b++){
                        generated[(i++)+"_"] = '#'+cr[r]+cr[g]+cr[b];
                    }
                }
            }
            return generated;
        },
        /**
         * Parses the color string and returns rgb codes in array
         * @param {Object} color
         */
        getRGBarray: function (color){
            if(typeof color == "string"){
                if(color.indexOf("rgb") > -1){
                    color = color.replace(/rgb\(|\).*?$/g, "").split(/,\s*/, 3);
                }else{
                    color = color.replace("#", "");
                    if(color.length == 3){ // Handle 3 letter colors #CCC
                        color = color.replace(/(.)/g, function(n){ return parseInt(n+n, 16)+", "; }).replace(/,\s*$/, "").split(/,\s+/);
                    }else{ 
                        color = color.replace(/(..)/g, function(n){ return parseInt(n, 16)+", "; }).replace(/,\s*$/, "").split(/,\s+/);
                    }
                }
            }
            for(var x=0; x<color.length; x++){ color[x] = Number(color[x]); }
            return color;
        },
        /**
         * gets rgb values as parameters and returns HEX color string
         */
        rgbToHex: function (){
            var ret = [];
            var ret2 = [];
            for ( var i = 0; i < arguments.length; i++ ){ 
                ret.push((arguments[i] < 16 ? "0" : "") + Math.round(arguments[i]).toString(16));
                //ret.push((arguments[i] < 16 ? "0" : "") + arguments[i].toString(16).replace(/^(\w+)\.\w+$/g, '$1'));
            }
            return "#"+ret.join('').toUpperCase();
        },
        /**
         * Gets HEX color string an returns rgb array
         * @param {Object} str
         */
        hexToRgb: function (str){
            str = str.replace("#", "");
            var ret = [];
            if(str.length == 3){
                str.replace(/(.)/g, function(str){
                    ret.push(parseInt(str+str, 16));
                });
            }else{
                str.replace(/(..)/g, function(str){
                    ret.push(parseInt(str, 16));
                });
            }
            return ret;
        },
        /**
         * Inverts the given hex color
         * @param {Object} hex
         */
        invert: function(hex){
            var rgb = Protoplus.Colors.hexToRgb(hex);
            return Protoplus.Colors.rgbToHex(255-rgb[0], 255-rgb[1], 255-rgb[2]);
        }
    },
    /**
     * Profiler. Calculates the time of the process
     * @param {Object} title
     */
    Profiler: {
        stimes:{},
        /**
         * Start the profile
         * @param {Object} title Title of the process in order to recognize later
         */
        start: function(title){
            Protoplus.Profiler.stimes[title] = (new Date()).getTime();
                        
            //console.profile(Protoplus.Profiler.title);
        },
        /**
         * Finish and print the result of the profiler
         */
        end:function(title, ret){
            var res = ( ( (new Date()).getTime() - Protoplus.Profiler.stimes[title])/1000).toFixed(3);
            if(ret){
                return res;
            }
            msg = title+' took '+res;
            
            if('console' in window){
                console.log(msg);
            }
        }
    }
};

/**
 * @extends Hash class
 */
Object.extend(Hash.prototype, {
    /**
     * Debug: Object.debug(); Alerts each array element in a confirm box. Click ok to stop loop.
     * @param {Object} options
     * -- showFunction: if true show the appanded functions of an object.
     * -- skipBlanks: if true skips the blank values.
     */
    debug: function(opts){
        opts = opts? opts : {};
        node = this._object;
        text = opts.text? opts.text+"\n" : "";
        for(var e in node){
            if(typeof node[e] == "function" && !opts.showFunctions){ continue; }
            if(opts.skipBlanks && (node[e] === "" || node[e] === undefined)){ continue; }

            var stophere = confirm(text+e+" => "+node[e]);
            if(stophere){
                return node[e];
            }
        }
    }
});

Object.extend(Object, {
    deepClone: function(obj){
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        var clone = Object.isArray(obj)? [] : {};
        for (var i in obj) {
            var node = obj[i];
            if (typeof node == 'object') {
                if (Object.isArray(node)) {
                    clone[i] = [];
                    for (var j = 0; j < node.length; j++) {
                        if (typeof node[j] != 'object') {
                            clone[i].push(node[j]);
                        } else {
                            clone[i].push(this.deepClone(node[j]));
                        }
                    }
                } else {
                    clone[i] = this.deepClone(node);
                }
            } else {
                clone[i] = node;
            }
        }
        return clone;
    },
    /**
     * Checks if the given object is boolean or not
     * @param {Object} bool
     */
    isBoolean: function(bool){
        return (bool === true || bool === false);
    },
    /**
     * Checks if the given element is regular expression or not
     */
    isRegExp: function(obj){
        return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
    }

});


/**
 * Extend the string
 */
Object.extend(String.prototype, {
    /**
     * Remove unnecessary white spaces and compress the json string
     */
    cleanJSON: function (){
        return this.replace(/(\"?)(\:|\,)\s+(\"?)/g, '$1$2$3');
    },
    /**
     * Shortens the string
     * @param {Object} length
     * @param {Object} closure
     */
    shorten: function(length, closure){
        length = length? length : "30";
        closure = closure? closure : "...";
        var sh = this.substr(0, length);
        sh += (this.length > length)? closure : "";
        return sh;
    },
    /**
     * Squezes the long texts
     * Keeps the start end end of the string to make it more readable
     * @param {Object} length
     */
    squeeze: function(length){
        length = length? length : "30";
        var join = "...";
        
        if((length - join.length) >= this.length){ return this; }
        
        var l = Math.floor((length -join.length) / 2);
        var start = this.substr(0, l+1);
        var end = this.substr(-(l), l);
        return start+join+end;
    },
    
    /**
     * A simple printf
     */
    printf: function(){
        var args = arguments;
        var word = this.toString(),
        i = 0;
         
        return word.replace(/(\%(\w))/gim, function(word, match, tag, count){
            var s = args[i] !== undefined? args[i] : '' ;
            i++;
            switch(tag){
                case "f":
                    return parseFloat(s).toFixed(2);
                case "d":
                    return parseInt(s, 10);
                case "x":
                    return s.toString(16);
                case "X":
                    return s.toString(16).toUpperCase();
                case "s":
                    return s;
                default:
                    return match;
            }
        });
    },
    
    /**
     * Add slashes
     */
    sanitize: function(){
        var str = this;
        return (str+'').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    },
    
    nl2br: function(is_xhtml){
        var str = this;
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'');// +'\n'); Removed trailing new line
    },
    
    /**
     * Strip slashes
     */
    stripslashes: function(){
        var str = this;
        return (str+'').replace(/\\(.?)/g, function (s, n1) {
            switch (n1) {
                case '\\':
                    return '\\';
                case '0':
                    return '\u0000';
                case '':
                    return '';
                default:
                    return n1;
            }
        });
    },
    
    /**
     * Turkish to lowercase
     */
    turkishToUpper: function(){
        var string = this;
        var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
        string = string.replace(/([iışğüçö])+/g, function(letter){ return letters[letter]; });
        return string.toUpperCase();
    },
    /**
     * Turkish to uppper case
     */
    turkishToLower: function(){
        var string = this;
        var letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
        string = string.replace(/([İIŞĞÜÇÖ])+/g, function(letter){ return letters[letter]; });
        return string.toLowerCase();
    },
    /**
     * Convert to camelCase
     */
    toCamelCase: function() {
        var str = this;
        newStr = str.replace(/\s+/g, '_');
        strArr = newStr.split('_');
        if (strArr.length === 0) {
            return newStr;
        }
        newStr = "";
        for (var i = 0; i < strArr.length; i++) {
            newStr += strArr[i][0].toUpperCase();
            newStr += strArr[i].substr(1);
        }
        return newStr;
    },
    /**
     * @see http://www.conlang.info/cgi/dia.cgi
     */
    fixUTF: function(){
        var lowerCase={"a":"00E1:0103:01CE:00E2:00E4:0227:1EA1:0201:00E0:1EA3:0203:0101:0105:1D8F:1E9A:00E5:1E01:2C65:00E3:0251:1D90","b":"1E03:1E05:0253:1E07:1D6C:1D80:0180:0183","c":"0107:010D:00E7:0109:0255:010B:0188:023C","d":"010F:1E11:1E13:0221:1E0B:1E0D:0257:1E0F:1D6D:1D81:0111:0256:018C","e":"00E9:0115:011B:0229:00EA:1E19:00EB:0117:1EB9:0205:00E8:1EBB:0207:0113:2C78:0119:1D92:0247:1EBD:1E1B","f":"1E1F:0192:1D6E:1D82","g":"01F5:011F:01E7:0123:011D:0121:0260:1E21:1D83:01E5","h":"1E2B:021F:1E29:0125:2C68:1E27:1E23:1E25:0266:1E96:0127","i":"0131:00ED:012D:01D0:00EE:00EF:1ECB:0209:00EC:1EC9:020B:012B:012F:1D96:0268:0129:1E2D","j":"01F0:0135:029D:0249","k":"1E31:01E9:0137:2C6A:A743:1E33:0199:1E35:1D84:A741","l":"013A:019A:026C:013E:013C:1E3D:0234:1E37:2C61:A749:1E3B:0140:026B:1D85:026D:0142:0269:1D7C","m":"1E3F:1E41:1E43:0271:1D6F:1D86","n":"0144:0148:0146:1E4B:0235:1E45:1E47:01F9:0272:1E49:019E:1D70:1D87:0273:00F1","o":"00F3:014F:01D2:00F4:00F6:022F:1ECD:0151:020D:00F2:1ECF:01A1:020F:A74B:A74D:2C7A:014D:01EB:00F8:00F5","p":"1E55:1E57:A753:01A5:1D71:1D88:A755:1D7D:A751","q":"A759:02A0:024B:A757","r":"0155:0159:0157:1E59:1E5B:0211:027E:0213:1E5F:027C:1D72:1D89:024D:027D","s":"015B:0161:015F:015D:0219:1E61:1E63:0282:1D74:1D8A:023F","t":"0165:0163:1E71:021B:0236:1E97:2C66:1E6B:1E6D:01AD:1E6F:1D75:01AB:0288:0167","u":"00FA:016D:01D4:00FB:1E77:00FC:1E73:1EE5:0171:0215:00F9:1EE7:01B0:0217:016B:0173:1D99:016F:0169:1E75:1D1C:1D7E","v":"2C74:A75F:1E7F:028B:1D8C:2C71:1E7D","w":"1E83:0175:1E85:1E87:1E89:1E81:2C73:1E98","x":"1E8D:1E8B:1D8D","y":"00FD:0177:00FF:1E8F:1EF5:1EF3:01B4:1EF7:1EFF:0233:1E99:024F:1EF9","z":"017A:017E:1E91:0291:2C6C:017C:1E93:0225:1E95:1D76:1D8E:0290:01B6:0240","ae":"00E6:01FD:01E3","dz":"01F3:01C6","3":"0292:01EF:0293:1D9A:01BA:01B7:01EE"};
        var upperCase={"A":"00C1:0102:01CD:00C2:00C4:0226:1EA0:0200:00C0:1EA2:0202:0100:0104:00C5:1E00:023A:00C3","B":"1E02:1E04:0181:1E06:0243:0182","C":"0106:010C:00C7:0108:010A:0187:023B","D":"010E:1E10:1E12:1E0A:1E0C:018A:1E0E:0110:018B","E":"00C9:0114:011A:0228:00CA:1E18:00CB:0116:1EB8:0204:00C8:1EBA:0206:0112:0118:0246:1EBC:1E1A","F":"1E1E:0191","G":"01F4:011E:01E6:0122:011C:0120:0193:1E20:01E4:0262:029B","H":"1E2A:021E:1E28:0124:2C67:1E26:1E22:1E24:0126","I":"00CD:012C:01CF:00CE:00CF:0130:1ECA:0208:00CC:1EC8:020A:012A:012E:0197:0128:1E2C:026A:1D7B","J":"0134:0248","K":"1E30:01E8:0136:2C69:A742:1E32:0198:1E34:A740","L":"0139:023D:013D:013B:1E3C:1E36:2C60:A748:1E3A:013F:2C62:0141:029F:1D0C","M":"1E3E:1E40:1E42:2C6E","N":"0143:0147:0145:1E4A:1E44:1E46:01F8:019D:1E48:0220:00D1","O":"00D3:014E:01D1:00D4:00D6:022E:1ECC:0150:020C:00D2:1ECE:01A0:020E:A74A:A74C:014C:019F:01EA:00D8:00D5","P":"1E54:1E56:A752:01A4:A754:2C63:A750","Q":"A758:A756","R":"0154:0158:0156:1E58:1E5A:0210:0212:1E5E:024C:2C64","S":"015A:0160:015E:015C:0218:1E60:1E62","T":"0164:0162:1E70:021A:023E:1E6A:1E6C:01AC:1E6E:01AE:0166","U":"00DA:016C:01D3:00DB:1E76:00DC:1E72:1EE4:0170:0214:00D9:1EE6:01AF:0216:016A:0172:016E:0168:1E74","V":"A75E:1E7E:01B2:1E7C","W":"1E82:0174:1E84:1E86:1E88:1E80:2C72","X":"1E8C:1E8A","Y":"00DD:0176:0178:1E8E:1EF4:1EF2:01B3:1EF6:1EFE:0232:024E:1EF8","Z":"0179:017D:1E90:2C6B:017B:1E92:0224:1E94:01B5","AE":"00C6:01FC:01E2","DZ":"01F1:01C4"};
        var str = this.toString();
        
        for(var lk in lowerCase){
            var lvalue = '\\u'+lowerCase[lk].split(':').join('|\\u');
            str = str.replace(new RegExp(lvalue, 'gm'), lk);
        }
        
        for(var uk in upperCase){
            var uvalue = '\\u'+upperCase[uk].split(':').join('|\\u');
            str = str.replace(new RegExp(uvalue, 'gm'), uk);
        }
        
        return str;
    },
    /**
     * Makes the first letter of a word uppercase
     */
    ucFirst: function(){
        return this.charAt(0).toUpperCase() + this.substr(1, this.length + 1);
    }
    
});

/**
 * php's $_GET equivalent 
 * @example "http://www.example.com?name=serkan" to document.get.name => "serkan"
 */
var __result = document.URL.toQueryParams();

/**
 * @extends document
 */
Object.extend(document, {
    createCSS: function (selector, declaration) {
        var id = "style-"+selector.replace(/\W/gim, '');
        if($(id)){
           $(id).remove();
        }
        // test for IE
        var ua = navigator.userAgent.toLowerCase();
        var isIE = (/msie/.test(ua)) && !(/opera/.test(ua)) && (/win/.test(ua));
    
        // create the style node for all browsers
        var style_node = document.createElement("style");
        style_node.id = id;
        style_node.setAttribute("type", "text/css");
        style_node.setAttribute("media", "screen");
    
        // append a rule for good browsers
        if (!isIE) {
            style_node.appendChild(document.createTextNode(selector + " {" + declaration + "}"));
        }
    
        // append the style node
        document.getElementsByTagName("head")[0].appendChild(style_node);
    
        // use alternative methods for IE
        if (isIE && document.styleSheets && document.styleSheets.length > 0) {
            var last_style_node = document.styleSheets[document.styleSheets.length - 1];
            if (typeof(last_style_node.addRule) == "object") {
                last_style_node.addRule(selector, declaration);
            }
        }
    },
    selectRadioOption: function (options, value){
        options.each(function(ele){
           if( ele.value === value )
           {
               ele.checked = true;
           }
        });
    },
    
    preloadImages: function(images){
        var args = arguments;
        if(Object.isArray(images)){
            args = images;
        }
        var i=0; // Stupid lint :(
        for(i=0, images=[]; (src=args[i]); i++){
            images.push(new Image());
            images.last().src = src;
        }
    },

    readRadioOption: function (options){
        for (var i=0; i<options.length; i++){
            var ele = options[i];
            if( ele.checked === true )
            {
                return ele.value;
            }
        }
        return false;
    },
    getEvent: function(ev){
        
        if(!ev){ ev = window.event; }
        
        if(!ev.keyCode && ev.keyCode !== 0){
            ev.keyCode = ev.which;
        }
        
        return ev;
    },
    
    parameters: __result,
    get: __result,
    /**
     * Short hand for dom:loaded.
     * @param {Object} func
     */
    ready: function(func){
        document.observe("dom:loaded", func);
    },
    /**
     * Returns the element underneath the mouse, should have the event object
     * @param {Event} e 
     */
    getUnderneathElement: function(e){
        var pointX = (Prototype.Browser.WebKit)? Event.pointerX(e) : e.clientX;
        var pointY = (Prototype.Browser.WebKit)? Event.pointerY(e) : e.clientY;
        return document.elementFromPoint(pointX, pointY);
    },
    /**
     * Creates Cookie
     * @param {Object} name
     * @param {Object} value
     * @param {Object} days
     * @param {Object} path
     */
    createCookie: function(name, value, days, path){
        path = path? path : "/";
        path = path === "/" ? "/; SameSite=None; Secure" : path;
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = ";expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expires + ";path="+path;
    },
    /**
     * Reads the cookie
     * @param {Object} name
     */
    readCookie: function(name){
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    },
    /**
     * Removes cookie
     * @param {String} name
     */
    eraseCookie: function(name){
        document.createCookie(name, "", -1);
    },
    /**
     * Converts value to a json string and stores in the cookie.
     * @param {String} name
     * @param {Object} value
     * @param {Number} days
     */
    storeJsonCookie:function(name, value, days){
        var val = Object.toJSON(value).cleanJSON();
        document.createCookie(name, val, days);
    },
    /**
     * Reads and parses Jsoncookie.
     * @param {String} name
     * @return {Object} Hash
     */
    readJsonCookie:function(name){
        if(document.readCookie(name)){
            return document.readCookie(name).toString().evalJSON();
        }else{
            return {};
        }
    },
    /**
     * simple mesarument for window size
     */
    getClientDimensions: function(){
        var head = document.body.parentNode;
        return { height: head.scrollHeight, width: head.scrollWidth };
    },
    /**
     * Wrapper for keyboard shortcut script of OpenJS
     * @link http://www.openjs.com/scripts/events/keyboard_shortcuts/
     * @param {Object} map
     */
    keyboardMap: function(map){ document.keyMap = map; var shortcut = { 'all_shortcuts': {}, 'add': function(shortcut_combination, callback, opt){ var default_options = { 'type': 'keydown', 'propagate': false, 'disable_in_input': false, 'target': document, 'keycode': false }; if (!opt) { opt = default_options; } else { for (var dfo in default_options) { if (typeof opt[dfo] == 'undefined') { opt[dfo] = default_options[dfo]; } } } var ele = opt.target; if (typeof opt.target == 'string') { ele = document.getElementById(opt.target);  } var ths = this; shortcut_combination = shortcut_combination.toLowerCase(); var func = function(e){ e = e || window.event; if (opt.disable_in_input) { var element; if (e.target) { element = e.target;  } else if (e.srcElement) { element = e.srcElement;  } if (element.nodeType == 3) { element = element.parentNode;  } if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA' || element.readAttribute('contenteditable') || document._onedit) { return;  } } if (e.keyCode) { code = e.keyCode;  } else if (e.which) { code = e.which;  } var character = String.fromCharCode(code).toLowerCase(); if (code == 188) { character = ",";  } if (code == 190) { character = ".";  } var keys = shortcut_combination.split("+"); var kp = 0; var shift_nums = { "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ":", "'": "\"", ",": "<", ".": ">", "/": "?", "\\": "|" }; var special_keys = { 'esc': 27, 'escape': 27, 'tab': 9, 'space': 32, 'return': 13, 'enter': 13, 'backspace': 8, 'scrolllock': 145, 'scroll_lock': 145, 'scroll': 145, 'capslock': 20, 'caps_lock': 20, 'caps': 20, 'numlock': 144, 'num_lock': 144, 'num': 144, 'pause': 19, 'break': 19, 'insert': 45, 'home': 36, 'delete': 46, 'end': 35, 'pageup': 33, 'page_up': 33, 'pu': 33, 'pagedown': 34, 'page_down': 34, 'pd': 34, 'left': 37, 'up': 38, 'right': 39, 'down': 40, 'f1': 112, 'f2': 113, 'f3': 114, 'f4': 115, 'f5': 116, 'f6': 117, 'f7': 118, 'f8': 119, 'f9': 120, 'f10': 121, 'f11': 122, 'f12': 123 }; var modifiers = { shift: { wanted: false, pressed: false }, ctrl: { wanted: false, pressed: false }, alt: { wanted: false, pressed: false }, meta: { wanted: false, pressed: false } }; if (e.ctrlKey) { modifiers.ctrl.pressed = true;  } if (e.shiftKey) { modifiers.shift.pressed = true;  } if (e.altKey) { modifiers.alt.pressed = true;  } if (e.metaKey) { modifiers.meta.pressed = true;  } for (var i = 0; i < keys.length; i++) { k = keys[i]; if (k == 'ctrl' || k == 'control') { kp++; modifiers.ctrl.wanted = true; } else if (k == 'shift') { kp++; modifiers.shift.wanted = true; } else if (k == 'alt') { kp++; modifiers.alt.wanted = true; } else if (k == 'meta') { kp++; modifiers.meta.wanted = true; } else if (k.length > 1) { if (special_keys[k] == code) { kp++;  } } else if (opt.keycode) { if (opt.keycode == code) { kp++;  } } else { if (character == k) { kp++;  } else { if (shift_nums[character] && e.shiftKey) { character = shift_nums[character]; if (character == k) { kp++;  } } } } } if (kp == keys.length && modifiers.ctrl.pressed == modifiers.ctrl.wanted && modifiers.shift.pressed == modifiers.shift.wanted && modifiers.alt.pressed == modifiers.alt.wanted && modifiers.meta.pressed == modifiers.meta.wanted) { callback(e); if (!opt.propagate) { e.cancelBubble = true; e.returnValue = false; if (e.stopPropagation) { e.stopPropagation(); e.preventDefault(); } return false; } } }; this.all_shortcuts[shortcut_combination] = { 'callback': func, 'target': ele, 'event': opt.type }; if (ele.addEventListener) { ele.addEventListener(opt.type, func, false);  } else if (ele.attachEvent) { ele.attachEvent('on' + opt.type, func);  } else { ele['on' + opt.type] = func;  } }, 'remove': function(shortcut_combination){ shortcut_combination = shortcut_combination.toLowerCase(); var binding = this.all_shortcuts[shortcut_combination]; delete (this.all_shortcuts[shortcut_combination]); if (!binding) { return; } var type = binding.event; var ele = binding.target; var callback = binding.callback; if (ele.detachEvent) { ele.detachEvent('on' + type, callback);  } else if (ele.removeEventListener) { ele.removeEventListener(type, callback, false);  } else { ele['on' + type] = false;  } } }; $H(map).each(function(pair){ var key = pair.key; var opts = pair.value; shortcut.add(key, opts.handler, { disable_in_input: opts.disableOnInputs }); }); },
    checkDocType: function (){
        if (document.doctype === null){ return false; }
        var publicId = document.doctype.publicId.toLowerCase();
        return (publicId.indexOf("html 4") > 0) || (publicId.indexOf("xhtml") > 0);
    }
});

/**
 * @link http://adomas.org/javascript-mouse-wheel/ prototype extension by "Frank Monnerjahn" themonnie @gmail.com
 * @link http://www.ogonek.net/mousewheel/demo.html
 * @usage $('wheel-div').observe(Event.mousewheel, function(e){ Event.wheel(e); });
 */
Object.extend(Event, {
    mousewheel: Prototype.Browser.Gecko? 'DOMMouseScroll' : 'mousewheel',
    wheel:function (event){
        var delta = 0;
        if (!event) { event = window.event; }
        if (event.wheelDelta) {
            delta = event.wheelDelta/120;
            if (window.opera) { delta = -delta; }
        } else if (event.detail) { delta = -event.detail/3; }
        return Math.round(delta); //Safari Round
    },
    isInput: function(e){
        var element;
        if (e.target) {
            element = e.target;
        } else if (e.srcElement) {
            element = e.srcElement;
        }
        if (element.nodeType == 3) {
            element = element.parentNode;
        }
        
        if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') { return true; }
        return false;
    },
    isRightClick: function(event){
        
        var _isButton;
        if (Prototype.Browser.IE) {
          var buttonMap = { 0: 1, 1: 4, 2: 2 };
          _isButton = function(event, code) {
            return event.button === buttonMap[code];
          };
        } else if (Prototype.Browser.WebKit) {
          _isButton = function(event, code) {
            switch (code) {
              case 0: return event.which == 1 && !event.metaKey;
              case 1: return event.which == 1 && event.metaKey;
              case 2: return event.which == 3 && !event.metaKey; // Safari and chrome right click fix
              default: return false;
            }
          };
        } else {
          _isButton = function(event, code) {
            return event.which ? (event.which === code + 1) : (event.button === code);
          };
        }
        
        return _isButton(event, 2);
    }
});

Protoplus.utils = {
    
    cloneElem: function(element){
        if(Prototype.Browser.IE){
            var div = document.createElement('div');
            div.innerHTML = element.outerHTML;
            return $(div.firstChild);
        }
        return element.cloneNode(true);
    },
    
    /**
     * Simulates the link effect on any HTML element. and defeats the pop up blockers
     * @param {Object} element
     * @param {Object} link
     */
    openInNewTab: function(element, link){
        element.observe('mouseover', function(e){
            if(!element.tabLink){
                var a = new Element('a', {href:link, target:'_blank'}).insert('&nbsp;&nbsp;');
                a.setStyle('opacity:0; z-index:100000; height:5px; width:5px; position:absolute; top:'+(Event.pointerY(e)-2.5)+'px;left:'+(Event.pointerX(e)-2.5)+'px');
                a.observe('click', function(){ element.tabLinked = false; a.remove(); });
                $(document.body).insert(a);
                element.tabLink = a;
                element.observe('mousemove', function(e){
                    element.tabLink.setStyle('top:'+(Event.pointerY(e)-2.5)+'px;left:'+(Event.pointerX(e)-2.5)+'px');
                });
            }
        });
        return element;
    },
    
    /**
     * Checks if the element has a fixed container or not
     * @param {Object} element
     */
    hasFixedContainer: function(element){
        var result = false;
        element.ancestors().each(function(el){
            if(result){ return; }
            if(el.style.position == "fixed"){
                result = true;
            }
        });
        return result;
    },
    
    getCurrentStyle: function(element, name){
        if (element.style[name]) {
            return element.style[name];
        } else if (element.currentStyle) {
            return element.currentStyle[name];
        }
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            name = name.replace(/([A-Z])/g, "-$1");
            name = name.toLowerCase();
            s = document.defaultView.getComputedStyle(element, "");
            return s && s.getPropertyValue(name);
        } else {
            return null;
        }
    },
    /**
     * Determines if the passed element is overflowing its bounds,
     * either vertically or horizontally.
     * Will temporarily modify the "overflow" style to detect this
     * if necessary.
     * @param {Object} element
     */
    isOverflow: function(element){
        if(element.resized){
            element.hideHandlers();
        }
        var curOverflow = element.style.overflow;
        if (!curOverflow || curOverflow === "visible"){
            element.style.overflow = "hidden";
        }
        
        var leftOverflowing = element.clientWidth < element.scrollWidth;
        var topOverflowing = element.clientHeight < element.scrollHeight;
        var isOverflowing = leftOverflowing || topOverflowing;
        
        element.style.overflow = curOverflow;
        
        if(element.resized){
            element.showHandlers();
        }
                
        return isOverflowing? {
            top: topOverflowing? element.scrollHeight: false ,
            left: leftOverflowing? element.scrollWidth: false,
            both: leftOverflowing && topOverflowing
        } : false;
    },
    /**
     * Makes element unselectable. Disable cursor select
     * @param {Object} target
     */
    setUnselectable: function(target){
        
        //Emre: to prevent cursor not to move except when you use the arrow keys under "form-section" (46518)
        if (typeof target.style.MozUserSelect != "undefined" && target.className == "form-section-closed") {target.style.MozUserSelect = "normal";}
        else if (typeof target.onselectstart != "undefined") {target.onselectstart = function(){return false;};}
        else if (typeof target.style.MozUserSelect != "undefined") { target.style.MozUserSelect = "none";}
        else {target.onmousedown = function(){ return false;}; }
        target.__oldCursor = target.style.cursor;
        target.style.cursor = 'default';
        return target;
    },
    /**
     * Reverts unselectable effect, enables cursor select
     * @param {Object} target
     */
    setSelectable: function(target){
        if (typeof target.onselectstart != "undefined") { target.onselectstart = document.createElement("div").onselectstart; }
        else if (typeof target.style.MozUserSelect != "undefined") { target.style.MozUserSelect = document.createElement("div").style.MozUserSelect; }
        else { target.onmousedown = ""; }
        if(target.__oldCursor){
            target.style.cursor = target.__oldCursor;
        }else{
            target.style.cursor = '';
        }
        return target;
    },
    /**
     * Selects all text in any element
     * @param {Object} element
     */
    selectText: function(element){
        var r1 = "";
        if (document.selection) {
            r1 = document.body.createTextRange();
            r1.moveToElementText(element);
            r1.setEndPoint("EndToEnd", r1);
            r1.moveStart('character', 4);
            r1.moveEnd('character', 8);
            r1.select();
        }
        else {
            s = window.getSelection();
            r1 = document.createRange();
            r1.setStartBefore(element);
            r1.setEndAfter(element);
            s.addRange(r1);
        }
        
        return element;
    },
    
    /**
     * Mimics the mouseenter, mouseleave effect on browsers.
     * @param {Object} elem
     * @param {Object} over
     * @param {Object} out
     */
    hover: function(elem, over, out){
        $(elem).observe("mouseover", function(evt){
            if(typeof over == "function"){
                if(elem.innerHTML){
                    if(elem.descendants().include(evt.relatedTarget)){ return true; } // Mimic the mouseenter event
                }
                over(elem, evt);
            }else if(typeof over == "string"){
                $(elem).addClassName(over);
            }
        });
        $(elem).observe("mouseout", function(evt){
            if (typeof out == "function") {
                if(elem.innerHTML){
                    if(elem.descendants().include(evt.relatedTarget)){ return true; } // Mimic the mouseleave event
                }
                out(elem, evt);
            }else if(typeof over == "string"){
                $(elem).removeClassName(over);
            }
        });
        return elem;
    },
    
    mouseEnter: function(elem, over, out){
        $(elem).observe("mouseenter", function(evt){
            if(typeof over == "function"){
                over(elem, evt);
            }else if(typeof over == "string"){
                $(elem).addClassName(over);
            }
        });
        $(elem).observe("mouseleave", function(evt){
            if (typeof out == "function") {
                
                out(elem, evt);
            }else if(typeof over == "string"){
                $(elem).removeClassName(over);
            }
        });
        return elem;
    },

    /**
     * Sets the scroll amount for an element
     * @param {Object} element
     * @param {Object} amounts
     */
    setScroll: function(element, amounts){
        if(amounts.x !== undefined){
            element.scrollLeft = amounts.x;
        }
        if(amounts.y !== undefined){
            element.scrollTop = amounts.y;
        }
    },
    /**
     * Scroll window to keep element in viewport
     * @param {Object} element
     * @param {Object} options
     */
    scrollInto: function(element, options) {
        options = Object.extend({
            offset:[100, 100],
            direction:'bottom' // top, left, right
        }, options || {});
        
        element = $(element);
        var pos = Element.cumulativeOffset(element);
        var vp  = document.viewport.getDimensions();
        var ed  = Element.getDimensions(element);
        
        switch(options.direction){
            case 'bottom':
                if(pos[1]+options.offset[1] >= vp.height + window.scrollY){
                    window.scrollTo(window.scrollX, (pos[1]+options.offset[1]) - vp.height);
                }else if(window.scrollY !== 0 && (pos[1]+options.offset[1] <= Math.abs(vp.height - window.scrollY))){
                    window.scrollTo(window.scrollX, (pos[1]+options.offset[1]) - vp.height);
                }
            break;
            
            case "top":
                var height = element.getHeight();
                if(window.scrollY !== 0 && pos[1] <= window.scrollY + options.offset[1]){
                    window.scrollTo(window.scrollX, pos[1] - options.offset[1]);
                }else if(window.scrollY !== 0 && (pos[1]+options.offset[1] <= Math.abs(vp.height - window.scrollY))){
                    window.scrollTo(window.scrollX, pos[1] - options.offset[1]);
                }
            break;
        }
        
        return element;
    },
    /**
     * Returns the scroll offset of an element
     * @param {Object} element
     */
    getScroll: function(element){
        return {x: parseFloat(element.scrollLeft), y:parseFloat(element.scrollTop) };
    },
    /**
     * Sets the innerHTML of an element;
     * @param {Object} element
     * @param {Object} value
     */
    setText: function(element, value){
        element.innerHTML = value;
        return element;
    },
    /**
     * Sets value and returns the element for chaining
     * @param {Object} element
     * @param {Object} value
     */
    putValue: function(element, value){
        if(element.clearHint){
            element.clearHint();
        }
        element.value = value;
        return element;
    },
    /**
     * Resets the value of an upload field
     * @todo find a way to clone events attached by javascript jquery is doing it
     * @param {Object} element
     */
    resetUpload: function(element){
        // Only IE needs a hack to do this
        if(Prototype.Browser.IE){
            var p = element.parentNode;
            var c = element.cloneNode(true);
            p.replaceChild(c, element);
            return c;
        }
        // All new browsers can set empty value to file input
        element.value='';
        return element;
    },
    /**
     * Fires native events oberseved by element
     * @param {Object} element
     * @param {Object} event
     */
    run: function(element, event){
        
        if(event.include(':')){
            element.fire(event);
        }else{
            var evt;

            var disabled = element.hasClassName('form-dropdown') && element.disabled ? !!(element.enable()) : false;

            if (document.createEventObject && !Prototype.Browser.IE9 && !Prototype.Browser.IE10){ // dispatch for IE
                evt = document.createEventObject();
                element.fireEvent('on'+event,evt);
            }else{ // dispatch for firefox + others
                evt = document.createEvent("HTMLEvents");
                evt.initEvent(event, true, true ); // event type,bubbling,cancelable
                
                if(disabled) {
                    setTimeout(function() {
                        element.dispatchEvent(evt);
                        element.disable();
                    }, 0);
                } else {
                    element.dispatchEvent(evt);
                }
            }
        }
        
        return element;
    },
    /**
     * Sett CSS border radius for all supported browsers
     * @param {Object} element
     * @param {Object} value
     */
    setCSSBorderRadius: function(element, value){
        return element.setStyle({MozBorderRadius: value, borderRadius: value, '-webkit-border-radius': value});
    },
    /**
     * Returns the selected value of the element
     * @param {Object} element
     */
    getSelected: function(element){
        if(!element.options){
            if(element.innerHTML){ return element.innerHTML; }
            else{ return element.value; }
        }
            var selected =  element.selectedIndex >= 0? element.options[element.selectedIndex] : element;
            return selected;
    },
    /**
     * Selects the option of an element
     * @param {Object} element
     * @param {Object} val
     */
    selectOption: function(element, val){
        if(!val){ return element; }
        

        /*
          bug fix:161160 if option.text is numerical, it could be detected later checks, 
          so I duplicated this check, first one always check in values, if not found then check texts

        */

        var match_found =false;

      
        $A(element.options).each(function(option){
            // Regular expression Check
            if(Object.isRegExp(val) && (val.test(option.value) )){ option.selected = true;throw $break; }
            if(val == option.value){ option.selected = true; match_found = true; }
        });
        
        if(match_found == false){
          $A(element.options).each(function(option){
              // Regular expression Check
              if(Object.isRegExp(val) && ( val.test(option.text))){ option.selected = true; throw $break; }
              if(val == option.text){  option.selected = true;  }
          });  
        }
        
        


        /* old code
        $A(element.options).each(function(option){
            // Regular expression Check
            if(Object.isRegExp(val) && (val.test(option.value) || val.test(option.text))){ option.selected = true; throw $break; }
            if(val == option.value || val == option.text){ option.selected = true;  }
        });
        */
        element.run('change');
        return element;
    },
    /**
     * İmmediatelly stops shift animation without calling an event
     * @param {Object} element
     */
    stopAnimation: function(element){
        element.__stopAnimation = true;
        return element;
    },
    
    /**
     * Makes animation for given attribute. This function can animate every attribute with the numeric values it can also animate color values and scroll amounts.
     * @param {Object} element
     * @param {Object} options
     * Profile (51.4ms, 3576 calls)
     * Profile (43.127ms, 3604 calls)
     * Profile (42.651ms, 3568 calls)
     */
    shift: function(element, options){
        options = Object.extend({
            duration: 1,
            onEnd: Prototype.K,
            onStart: Prototype.K,
            onStep: Prototype.K,
            onCreate: Prototype.K,
            delay: 0,
            link:'cancel',
            transparentColor:'#ffffff',
            remove: false,
            easingCustom:false,
            propertyEasings:{},
            easing: Protoplus.Transitions.sineOut
        }, options || {});

        // Queuing the animation
        if(!element.queue){
            element.queue = [];
        }
        options.onCreate(element, options);
        // Linking the animations like mootools.
        if(options.link == "ignore" && element.timer){
            return element;
        }else if((options.link == "chain" || options.link == "queue") && element.timer){
            element.queue.push(options);
            return element;
        }

        if (element.timer){ // cancel the old animation
            clearInterval(element.timer); 
        }
        if (element.delayTime){
            clearTimeout(element.delayTime);
        }

        if(typeof options.easing == 'string'){
            if(options.easing in Protoplus.Transitions){
                options.easing = Protoplus.Transitions[options.easing];
            }else{
                options.easing = Protoplus.Transitions.sineOut;
            }
        } else if(typeof options.easing == 'object'){
            options.propertyEasings = options.easing; 
            options.easing = Protoplus.Transitions.sineOut;
        }else if(typeof options.easing != 'function'){
            options.easing = Protoplus.Transitions.sineOut;
        }

        options.duration *= 1000; // convert to milliseconds
        options.delay *= 1000; // convert to milliseconds
        element.timer = false;
        
        var properties = {}, begin, end, 
        
        /*
         * initiates the duration and call on start event
         */
        init = function(){
            begin = new Date().getTime();
            end = begin + options.duration;
            options.onStart(element);
        };
        
        /*
         * Remove the default options 
         */
        for(var x in options){
            if (!["duration", "onStart", "onStep", "transparentColor", "onEnd", "onCreate", "remove", "easing", "link", "delay", "easingCustom", "propertyEasings"].include(x) && options[x] !== false) {
                properties[x] = options[x];
            }            
        }
        // Get the unit value
        var unitRex=/\d+([a-zA-Z%]+)$/;
        
        // Prepare and define values for animation.
        for(var i in properties){
            var okey = i, oval=properties[i];
            var to, from, key, unit, s = [], easing=options.easing;
            
            if (["scrollX", "scrollLeft", "scrollY", "scrollTop"].include(okey)) {
                to = parseFloat(oval);
                key = (okey == "scrollX")? "scrollLeft" : (okey == "scrollY")? "scrollTop" : okey;
                if(element.tagName == "BODY"){
                    from = (okey == "scrollX" || okey == "scrollLeft")? window.scrollX : window.scrollY; // Read the window scroll
                }else{
                    from = (okey == "scrollX" || okey == "scrollLeft")? element.scrollLeft : element.scrollTop;
                }
                unit = '';
            } else if (okey == "rotate"){
                to = parseFloat(oval);
                key = "-webkit-transform";
                from = Element.getStyle(element, '-webkit-transform')? parseInt(Element.getStyle(element, '-webkit-transform').replace(/rotate\(|\)/gim, ""), 10) : 0;
                unit = 'deg';
            } else if (["background", "color", "borderColor", "backgroundColor"].include(okey)) {
                if(oval == 'transparent'){
                    oval = options.transparentColor;
                }
                to = Protoplus.Colors.hexToRgb(oval);
                key = okey == "background" ? "backgroundColor" : okey;
                var bgcolor = Element.getStyle(element, key);
                if(!bgcolor || bgcolor == 'transparent'){
                    bgcolor = options.transparentColor;
                }
                
                from = Protoplus.Colors.getRGBarray(bgcolor);
                unit = '';
            } else if(okey == "opacity"){
                to = (typeof oval == "string") ? parseInt(oval, 10) : oval;
                key = okey;
                from = Element.getStyle(element, okey);
                unit = '';
                from = parseFloat(from);
            
            } else {
                to = (typeof oval == "string") ? parseInt(oval, 10) : oval;
                key = okey;
                from = Element.getStyle(element, okey.replace("-webkit-", "").replace("-moz-", "")) || "0px";
                unit = okey == 'opacity' ? '' : (unitRex.test(from))? from.match(unitRex)[1] : 'px';
                from = parseFloat(from);
            }
            
            // If there is a different easing for this item
            if(okey in options.propertyEasings){
                easing = Protoplus.Transitions[options.propertyEasings[okey]];
            }
            
            if(!to && to !== 0){
                try {
                    s[key] = oval;
                    element.style[key] = oval;
                }catch(e){  }
            }else{
                properties[okey] = { key: key, to: to, from: from, unit: unit, easing: easing };
            }
        }
        
        /**
         * Calculate animation amount
         * @param {Object} ease
         * @param {Object} option
         * @param {Object} arr
         */
        var fn = function(ease, option, arr){
            var val = 0;
            if(arr !== false){ 
                return Math.round(option.from[arr] + ease * (option.to[arr] - option.from[arr]));
                
            }
            // begin + ease * change
            // console.log("%s + %s * (%s - %s) = %s", option.from, ease, option.to, option.from, (option.from + ease * (option.to - option.from)))
            return (option.from + ease * (option.to - option.from));
        };
        
        element.__stopAnimation = false;
        
        var step = function(){
            var time = new Date().getTime(), okey, oval, rgb;
            
            if(element.__stopAnimation === true){
                clearInterval(element.timer);
                element.timer = false;
                element.__stopAnimation = false;
                return;
            }
            
            if (time >= end) { // If duration is done. Complete the animation
                clearInterval(element.timer);
                element.timer = false;
                
                var valTo = (options.easing == "pulse" || options.easing == Protoplus.Transitions.pulse)? "from" : "to";
                // This will end the animation with the correct values.
                // if easing is pulse then set values to from.
                for(okey in properties){
                    oval=properties[okey];
                    
                    if(["scrollX", "scrollLeft", "scrollY", "scrollTop"].include(okey)){
                        if (element.tagName.toUpperCase() == "BODY") { // In order to scroll the document
                            if (oval.key == "scrollLeft") {
                                window.scrollTo(oval[valTo], window.scrollY);
                            }else {
                                window.scrollTo(window.scrollX, oval[valTo]);
                            }
                        }else {
                            element[oval.key] = oval[valTo] + oval.unit;
                        }
                    }else if (["background", "color", "borderColor", "backgroundColor"].include(okey)) {
                        element.style[oval.key] = 'rgb('+oval[valTo].join(', ')+")";
                    }else if(okey == "opacity"){
                        Element.setOpacity(element, oval[valTo]);
                    }else if(okey == "rotate"){
                        element.style[okey] = "rotate("+oval[valTo] + oval.unit+")";
                    }else{
                        element.style[okey] = oval[valTo] + oval.unit;
                    }
                }
                
                if(options.onEnd){ options.onEnd(element); }
                if(options.remove){
                    element.remove();
                }
                if(element.queue.length > 0){
                    var que = element.queue.splice(0, 1);
                    element.shift(que[0]);
                }

                return element;
            }
            
            if(options.onStep){ options.onStep(element); }
            
            for(okey in properties){
                oval = properties[okey];
                if(oval.key == "scrollLeft" || oval.key == "scrollTop"){
                    if (element.tagName.toUpperCase() == "BODY") { // In order to scroll the document
                        var scroll = parseInt(fn(oval.easing((time - begin) / options.duration, options.easingCustom), oval, false), 10) + oval.unit;
                        if(oval.key == "scrollLeft"){
                            window.scrollTo(scroll, window.scrollY);
                        }else{
                            window.scrollTo(window.scrollX, scroll);
                        }
                    }else{
                        element[oval.key] = parseInt(fn(oval.easing((time - begin) / options.duration, options.easingCustom), oval, false), 10) + oval.unit;
                    }
                }else if (okey == "background" || okey == "color" || okey == "borderColor" || okey == "backgroundColor") {
                    rgb = [];
                    for (var x = 0; x < 3; x++) {
                         
                         rgb[x] = fn(oval.easing((time - begin) / options.duration, options.easingCustom), oval, x);
                    }
                    
                    element.style[oval.key] = 'rgb('+rgb.join(', ')+')';
                }else if(okey == "opacity"){
                    Element.setOpacity(element, fn(oval.easing((time - begin) / options.duration, options.easingCustom), oval, false));
                }else if(okey == "rotate"){
                    element.style[oval.key] = "rotate("+fn(oval.easing((time - begin) / options.duration, options.easingCustom), oval, false) + oval.unit+")";
                } else {
                    element.style[okey] = fn(oval.easing((time - begin) / options.duration, options.easingCustom), oval, false) + oval.unit;
                }
            }
        };
        
        if(options.delay){
            element.delayTime = setTimeout(function(){
                init();
                element.timer = setInterval(step, 10);
            }, options.delay);
        }else{
            init();
            element.timer = setInterval(step, 10);
        }
        
        return element;
    },
    /**
     * Makes fade out effect for given element
     * @param {Object} element
     * @param {Object} options
     */
    fade: function(element, options){
        options = Object.extend({
            duration: 0.5,
            onEnd: function(e){ e.setStyle({display:"none"}); },
            onStart: Prototype.K,
            opacity: 0
        }, options || {});

        element.shift(options);
    },
    /**
     * Makes faded element appear again
     * @param {Object} element
     * @param {Object} options
     */
    appear: function(element, options){
        options = Object.extend({
            duration: 0.5,
            onEnd: Prototype.K,
            onStart: Prototype.K,
            opacity: 1
        }, options || {});
        element.setStyle({opacity:0, display:"block"});
        element.shift(options);
    },
    /**
     * Enable / Disable for all elements
     * @param {Object} element
     */
    disable: function(element) {
        element = $(element);
        element.disabled = true;
        return element;
    },
    enable: function(element) {
        element = $(element);
        element.disabled = false;
        return element;
    },    
    /**
     * Solution for circular reference problem. Hopefully it will solve memorry leaks
     * Sets an element with the with the given name as a reference
     * @param {Object} element
     * @param {Object} name
     * @param {Object} reference
     */
    setReference: function(element, name, reference){
        if(!element.REFID){ element.REFID = Protoplus.REFIDCOUNT++; }
        
        if(!Protoplus.references[element.REFID]){
            Protoplus.references[element.REFID] = {};
        }
        Protoplus.references[element.REFID][name] = $(reference);
        return element;
    },
    /**
     * Returns the given name
     * @param {Object} element
     * @param {Object} name
     */
    getReference: function(element, name){
        if(!element.REFID){
            return false;
        }
        return Protoplus.references[element.REFID][name];
    },
    /**
     * Safe remove function, Also removes the references 
     * @param {Object} element
     */
    remove: function(element){
        if(element.REFID){ // Clean unnecessary garbage
            delete Protoplus.references[element.REFID];
        }
        if(element.parentNode){            
            element.parentNode.removeChild(element);
        }
        return element;
    }
};
// emile.js (c) 2009 Thomas Fuchs
// Licensed under the terms of the MIT license.

(function(emile, container){
  var parseEl = document.createElement('div'),
    props = ('backgroundColor borderBottomColor borderBottomWidth borderLeftColor borderLeftWidth '+
    'borderRightColor borderRightWidth borderSpacing borderTopColor borderTopWidth bottom color fontSize '+
    'fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight '+
    'maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft '+
    'paddingRight paddingTop right textIndent top width wordSpacing zIndex').split(' ');

  function interpolate(source,target,pos){ return (source+(target-source)*pos).toFixed(3); }
  function s(str, p, c){ return str.substr(p,c||1); }
  function color(source,target,pos){
    var i = 2, j = 3, c, tmp, v = [], r = [];
    j=3; c=arguments[i-1];
    while(i--){
      if(s(c,0)=='r') { 
          c = c.match(/\d+/g);
          while(j--){ v.push(~~c[j]); }
      } else {
        if(c.length==4){ c='#'+s(c,1)+s(c,1)+s(c,2)+s(c,2)+s(c,3)+s(c,3); }
        while(j--){ v.push(parseInt(s(c,1+j*2,2), 16)); }
      }
      j=3;
      c=arguments[i-1]; 
    }
    
    while(j--) { tmp = ~~(v[j+3]+(v[j]-v[j+3])*pos); r.push(tmp<0?0:tmp>255?255:tmp); }
    return 'rgb('+r.join(',')+')';
  }
  
  function parse(prop){
    var p = parseFloat(prop), q = prop.replace(/^[\-\d\.]+/,'');
    return isNaN(p) ? { v: q, f: color, u: ''} : { v: p, f: interpolate, u: q };
  }
  
  function normalize(style){
    var css, rules = {}, i = props.length, v;
    parseEl.innerHTML = '<div style="'+style+'"></div>';
    css = parseEl.childNodes[0].style;
    while(i--){ v = css[props[i]]; if(v){ rules[props[i]] = parse(v); } }
    return rules;
  }  
  
  container[emile] = function(el, style, opts){
    el = typeof el == 'string' ? document.getElementById(el) : el;
    opts = opts || {};
    var target = normalize(style), comp = el.currentStyle ? el.currentStyle : getComputedStyle(el, null),
      prop, current = {}, start = +new Date(), dur = opts.duration||200, finish = start+dur, interval,
      easing = opts.easing || function(pos){ return (-Math.cos(pos*Math.PI)/2) + 0.5; };
      
    for(prop in target){ current[prop] = parse(comp[prop]); }
    interval = setInterval(function(){
      var time = +new Date(), pos = time>finish ? 1 : (time-start)/dur;
      for(var prop in target){
        el.style[prop] = target[prop].f(current[prop].v,target[prop].v,easing(pos)) + target[prop].u;
      }
      if(time>finish) { clearInterval(interval); if(opts.after){ opts.after(); } }
    },10);
  };
})('emile', Protoplus.utils);

/**
 * @extends DOM
 */
Element.addMethods(Protoplus.utils);

/**
 * Memmory leak prevention
 */
Event.observe(window, 'unload', function(){
    Protoplus = null;
});

/**
 * JSONP implementation
 * @param {Object} transport
 */
Ajax = Object.extend(Ajax, {
    /**
     * JsonP implementation.
     * This is basically the same as Ajax.Request, If url is on same domain then switches to regular Ajax.Request
     * @param {Object} url
     * @param {Object} options
     */
    Jsonp: function(url, options){
        /**
         * Extend the options
         */
        this.options = Object.extend({
            method: 'post',
            timeout: 60, // seconds
            parameters:'',
            force:false,
            onComplete: Prototype.K,
            onSuccess: Prototype.K,
            onFail: Prototype.K
        }, options || {});
        
        var parameterString = url.match(/\?/)? '&' : '?';
        
        this.response = false;

        var callback_id = new Date().getTime();
        Ajax["callback_"+callback_id] = function(response){
            this.response = response;
        }.bind(this);
        
        this.callback = Ajax.callback;
        
        
        if(typeof this.options.parameters == "string"){
            parameterString += this.options.parameters;
        }else{
            $H(this.options.parameters).each(function(p){
                parameterString += p.key+'='+ encodeURIComponent(p.value) +'&';
            });
        }
        
        // Get request domain
            var matches = /^(\w+:)?\/\/([^\/?#]+)/.exec(url);   
            var sameDomain = (matches && ( matches[1] && matches[1] != location.protocol || matches[2] != location.host ));
        
        if(!sameDomain && this.options.force === false){ // If url is not external then convert it to Ajax.Request
            return new Ajax.Request(url, this.options);
        }
        
        this.url = url + parameterString + 'callbackName=Ajax.callback_'+callback_id+'&nocache=' + new Date().getTime(); // In order to prevent cacheing
        this.script = new Element('script', { type:'text/javascript', src: this.url });
        
        var errored = false;
        
        /**
         * Catch script load errors
         * @param {Object} e
         * @param {Object} b
         * @param {Object} c
         */
        this.onError = function(e, b, c){
            errored = true;
            this.options.onComplete({success:false, error: e || "Not Found"});
            this.options.onFail({success:false, error: e || "Not Found", args: [e, b, c]});
            this.script.remove();
            window.onerror = null;
            this.response = false;
            
        }.bind(this);
        
        /**
         * Run when script loaded
         * @param {Object} e
         */
        this.onLoad = function(e){
            if(errored){ return; }
            clearTimeout(timer);
            this.script.onreadystatechange = null;
            this.script.onload = null;
            var res = this.script;
            this.script.remove();
            window.onerror = null;
            
            if(this.response){
                setTimeout(function(){
                    this.options.onComplete({responseJSON: this.response});
                    this.options.onSuccess({responseJSON: this.response});
                }.bind(this), 20);
            }else{
                this.onError({error:'Callback error'});
            }
        }.bind(this);
        
        /**
         * Check ready state for internet explorer.
         * @param {Object} e
         */ 
        this.readyState = function(e){
            var rs = this.script.readyState;
            if (rs == 'loaded' || rs == 'complete') {
                this.onLoad();
            }
        }.bind(this);
        
        // If nothing happens then timeout
        var timer = setTimeout(this.onError, this.options.timeout * 1000);
        
        // set events
        this.script.onreadystatechange = this.readyState;
        this.script.onload = this.onLoad;
        window.onerror = function(e, b, c){
            clearTimeout(timer);
            this.onError(e, b, c);
            return true;
        }.bind(this);
        
        // Append script
        $$('head')[0].appendChild(this.script);
        return this;
    }
});

var _alert = window.alert;
/**
 * Super Alert.
 * Usage: alert("Hello %s, welcome to %s", name, location); -> Hello serkan welcome to Ankara
 */
if(!location.pathname.match(/^\/answers\/.+/)){
  window.alert = function(){
      var args = arguments;
      var i = 1;
      var first = args[0];
      if(typeof first == "object"){
          $H(first).debug();
          return first;
      }else if(typeof first == "string"){
          var msg = first.replace(/(\%s)/gim, function(e){
              return args[i++] || "";
          });
          _alert(msg);
          return true;
      }
      _alert(first);
  };
}

var rand = function (min, max){
    return Math.floor(Math.random()*(max-min))+min;
};

/**
 * With protoinit you can define functions before loading protoplus.
 * USAGE: 
 * var __protoinit = [];
 * __protoinit.push(function(){ alert("here"); })
 */
if("__protoinit" in window){
    document.ready(function(e){
        $A(__protoinit).each(function(f){
            f(e);
        });
    });
}

/**
 * In WebKit, focus is not fired with some inputs such as radio and checkbox.
 */
(function() {
    if( Prototype.Browser.WebKit ) {
        var FIX_WEBKIT_FOCUS = function(e) { if (e.target && e.target.focus) { e.target.focus({ preventScroll: true }); } };
        document.addEventListener('DOMNodeInserted', function(e) { // Fix appended element...
            if( e.target.tagName === 'BUTTON' ||
                ( e.target.tagName === 'INPUT' && e.target.type !== 'text' ) ) {
                e.target.observe('click', FIX_WEBKIT_FOCUS);
            }
        }, false);
        document.observe('dom:loaded', function(){ // ...and actuals
            $$('button, input:not([type="text"])').invoke('observe', 'click', FIX_WEBKIT_FOCUS);
        });
    }
})();
// The End... Thank you for listening
