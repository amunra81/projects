'use strict';
var Linq = require('linq');

var Common = {

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

  mapInChunks: function(chunkSize){ 
    return function(ar,render,index) {
      var i = index?index:0;
      if(ar.length == 0)
          return [];
      else {
          var head = [render(ar.slice(0,chunkSize),i)];
          var tail = ar.length<=chunkSize?[]:Common.mapInChunks(chunkSize)(ar.slice(chunkSize),render,i+1);

          return head.concat(tail); 
      }
    }
  },

  snapshot: function (source,property)
  {
      var str = `{'${property}:source.${property}}`;
      return eval(str);
  },

  getLastIdFromProductId: function (segments,prodId,userId){
      var items = segments.filter(x => x.userId == userId)[0].items;

      if(!items)
          throw "No items";

      return items
      .filter(x => x.prodId == prodId)
      .reduce((prev,current) => prev.itemId <= current.itemId?current:prev,{itemId:0})
      .itemId;
  },

  transformDetails: function(order) {
    var approved = xs => !xs.any(x=>x.status == "InList");
    var {segments,menu} = order;
    var segs = segments.map( x => {
        return {
            //TODO:replace redundant userId
            userId : x.user.id,
            user: x.user,
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
  },

  transformMenu:function(order,formatedSegment) {
      var itemsMap = new Map();

      for (var item of formatedSegment.items) {
          itemsMap.set(item.prodId,item.count);
      }
              
      return Common.mapInChunks(8)(order.menu,(ar,i)=> {
          return { 
              index : i,
              data: ar.map(x => {return { product:x,count:itemsMap.get(x.id)}}),
          }
      });
  },

  

  transformDataSource: function(order,userId) {
      var segs = Common.transformDetails(order);
      var menu = Common.transformMenu(order,segs.filter(x=>x.userId == userId)[0]);

      //calculate total
      var userSeg = order.segments.filter(x=> x.user.id == userId)[0];
      var total = userSeg.items.map(x=>x.product.price).reduce((p,c) => p+c,0);
      return {
          details:segs,
          total:total,
          menu:menu,
      };
  }
};

module.exports = Common;
