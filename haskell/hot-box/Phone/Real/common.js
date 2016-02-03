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

  mapInPairs: function(ar,render,index) {
      var i = index?index:0;
      if(ar.length == 0)
          return [];
      else {
          var head = [render(ar[0],ar.length>1 && ar[1],i)];
          var tail = ar.length<=2?[]:Common.mapInPairs(ar.slice(2,ar.length),render,i+1);

          return head.concat(tail); 
      }
  },
};

module.exports = Common;
