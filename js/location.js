function setLocationEvents(country, state, city){
    var server = "http://jotfor.ms/server.php";
    country = $(country);
    state = $(state);
    city = $(city);
    
    var countryChange = function(){
        
        var sel = country.getSelected();
        
        if(sel.value == "other"){
            var inp = new Element('input', {size:'10'});
            country.parentNode.replaceChild(inp, country);
            country = inp;
            country.hint('Country');
            var inp1 = new Element('input', {size:'10'});
            state.parentNode.replaceChild(inp1, state);
            state = inp1;
            state.hint('State');
            var inp2 = new Element('input', {size:'10'});
            city.parentNode.replaceChild(inp2, city);
            city = inp2;
            city.hint('City');
            return;
        }
        
        var load = new Element('img', {src:'images/loader.gif', align:'absmiddle'}).setStyle({marginLeft:'3px',display:'none'});
        country.insert({after:load});
        setTimeout(function(){ load.setStyle({display:'inline'}); }, 400);

        new Ajax.Jsonp(server, {
            parameters:{
                action:'getStates',
                countryId: sel.value
            },
            onComplete:function(t){
                load.remove();
                var states = t.responseText? t.responseText.evalJSON().states : t.states;
                console.log(states);
                
                if(t.success === false){
                    return;
                }
                
                if(states.length <= 0){
                    var inp = new Element('input', {size:'10'});
                    state.parentNode.replaceChild(inp, state);
                    state = inp;
                }else{
                    var sel = "";
                    if(state.tagName == "INPUT"){
                        sel = new Element('select');
                        state.parentNode.replaceChild(sel, state);
                        state = sel;
                        state.observe('change', stateChange);
                    }
                    if(city.tagName == "INPUT"){
                        sel = new Element('select');
                        city.parentNode.replaceChild(sel, city);
                        city = sel;
                        city.observe('change', cityChange);
                    }
                    state.update($(new Option()).insert('<option>Any</option>'));
                    city.update($(new Option()).insert('<option>Any</option>'));
                    states.each(function(item){
                        var op = new Option();
                        op.value = item.id;
                        op.innerHTML = item.state;
                        state.appendChild(op);
                    });
                    state.insert("<option value='other'>Other</option>");
                    state.selectOption('Any');
                }
            }
        });
    };
                
    var stateChange = function(){
        
        var sel = state.getSelected();
        
        if(sel.value == "other"){
            var inp = new Element('input', {size:'10'});
            state.parentNode.replaceChild(inp, state);
            state = inp;
            state.hint('State');
            var inp2 = new Element('input', {size:'10'});
            city.parentNode.replaceChild(inp2, city);
            city = inp2;
            city.hint('City');
            return;
        }
        
        var load = new Element('img', {src:'images/loader.gif', align:'absmiddle'}).setStyle({marginLeft:'3px',display:'none'});
        state.insert({after:load});
        setTimeout(function(){ load.setStyle({display:'inline'}); }, 400);
        
        new Ajax.Jsonp(server,{
            parameters:{
                action:'getCities',
                stateId: sel.value
            },
            onComplete:function(t){
                load.remove();
                
                var cities = (t.responseText)? t.responseText.evalJSON().cities : t.cities;
                console.log(t, cities);
                if(t.success === false){
                    return;
                }
                
                if(cities.length <= 0){
                    var inp = new Element('input', {size:'10'});
                    city.parentNode.replaceChild(inp, city);
                    city = inp;
                }else{
                    if(city.tagName == "INPUT"){
                        var sel = new Element('select');
                        city.parentNode.replaceChild(sel, city);
                        city = sel;
                        city.observe('change', cityChange);
                    }
                    city.update($(new Option()).insert('<option>Any</option>'));
                    cities.each(function(item, i){
                        var op = new Option();
                        op.value = ++i;
                        op.innerHTML = item;
                        city.appendChild(op);
                    });
                    city.insert('<option value="other">Other</option>');
                    city.selectOption('Any');
                }
            }
        });
    };
    
    var cityChange = function(){
        var sel = city.getSelected();
        if(sel.value == "other"){
            var inp = new Element('input', {size:'10'});
            city.parentNode.replaceChild(inp, city);
            city = inp;
            city.hint('City');
        }
    };
    
    country.observe('change', countryChange);
    state.observe('change', stateChange);
    city.observe('change', cityChange);
}
