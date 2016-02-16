'use strict';
var Linq = require('linq');

var {Animated,Easing} = require('react-native');


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

  transformDetails: function(order,userId) {
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
    return { segs : segs,
             reqs: Common.transformRequests(order,userId),
    };
  },

  transformRequests: function(order,userId) {
    var checkRequested  = order.requests.filter( x => x.request == 'CheckRequest' && !x.response).length > 0;
    var userSegment     = order.segments.filter( x => x.user.id == userId)[0];
    var validForSendingRequest = Linq.from(userSegment.items).any(x => x.status == 'InList');
    var hasApprovedItems = () => Linq.from(userSegment.items).any(x => x.status == 'Approved');

    return {
        validForWaiterRequest: true,
        validForSendingRequest:validForSendingRequest,
        validForCheckReq:!checkRequested && hasApprovedItems(),
    }
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
      var details = Common.transformDetails(order,userId);
      var menu = Common.transformMenu(order,details.segs.filter(x=>x.userId == userId)[0]);

      //calculate total
      var userSeg = order.segments.filter(x=> x.user.id == userId)[0];
      var total = userSeg.items.map(x=>x.product.price).reduce((p,c) => p+c,0);
      return {
          details:details,
          total:total,
          menu:menu,
      };
  },

  getMoreInfo: function(ds,prodId,userId) {
      var items = ds.details.segs.filter(x => x.user.id == userId)[0].items;
      var details = items.filter( x => x.prodId == prodId);

      var product = Linq.from(ds.menu).selectMany( x=> x.data).first( x => x.product.id == prodId);

      console.log(product);
      console.log(details);
      return {
          details: details,
          product: product,
      };

  },

  animate: function(value,toValue,callback) {
      return {
          timing : (duration) => {
            Animated.timing(                          
                value,                 
                {
                    toValue: toValue,                         
                    duration: !duration?150:duration,                          // default 500 ms
                    easing: Easing.out(Easing.linear),
                    delay: 0
                }).start(callback);         
          },
          decay : () => {
            Animated.decay(           
                value,                 
                {
                    toValue: toValue,                       
                    velocity: 0.1,                          
                    deceleration: 0.997
                }).start(callback);    
          },
          spring : () => {
            Animated.spring(           
                value,                 
                {
                    toValue: toValue,                       
                    friction: 5,  //default 7                          
                    tension: 40   // default 40
                }).start(callback);    
          }
      }
  },

};

module.exports = Common;
