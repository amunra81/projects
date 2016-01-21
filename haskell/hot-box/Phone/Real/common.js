'use strict';

var Common = {
  merge: function (fromObj,finalObj){
    var obj3 = {};
    for (var attrname in fromObj) { obj3[attrname] = fromObj[attrname]; }
    for (var attrname in finalObj) { obj3[attrname] = finalObj[attrname]; }
    return obj3;
  },

  without: function (propName,fromObj) {
      var ret = {};
      for (var attrname in fromObj) 
      { 
          if(propName!=attrname)
            ret[attrname] = fromObj[attrname]; 
      }
      return ret;
  },
  
};

module.exports = Common;
