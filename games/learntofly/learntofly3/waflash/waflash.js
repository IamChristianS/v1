if(
  (typeof params.enableFilters != 'undefined'
    && (params.enableFilters.toLowerCase() == 'true'
      || params.enableFilters.toLowerCase() == 'yes'
      || params.enableFilters == '1'))
  || (typeof params.enablefilters != 'undefined'
    && (params.enablefilters.toLowerCase() == 'true'
      || params.enablefilters.toLowerCase() == 'yes'
      || params.enablefilters == '1'))){
      /*
      * Appy to options
      */
      window.wafOptions = {
        enableFilters : true
      };
};
createWaflash(GAME.src, window.wafOptions || {});