'use strict';
var Linq = require('linq');

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

  transformDetails: function(order) {
    var approved = xs => !xs.any(x=>x.status == "InList");
    var {segments,menu} = ds;
    var segs = segments.map( x => {
        return {
            userId : x.user.id,
            items: Linq.from(x.items)
                .groupBy(x => x.product.id).select(x=>
                { return {prodId:x.key()
                         ,count:x.count()
                         ,pname:x.last().product.name
                         ,pprice:
                            numeral(x.count() * x.last().product.price.toFixed(4)).format('0.[00]')
                         ,itemId:x.last().id
                         ,approved:approved(x)
                         };
                }).toArray(),
        };
    });
    return segs;
  }
};

module.exports = Common;
