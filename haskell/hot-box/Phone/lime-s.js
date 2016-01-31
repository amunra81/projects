'use strict';



var Limes = {

    Real : { OrderDetails       : require('./Real/order-details'        )
           , Common             : require('./Real/common'               ) 
           , OrderMenuClassic   : require('./Real/order-menu-classic'   ) 
           , OrderMenu          : require('./Real/order-menu-slide'     ) 
           , OrderHead          : require('./Real/order-head'           ) 
           , Order              : require('./Real/order'                ) 
           , SlideList          : require('./Real/Controls/slide-list'  ) 
           , SlideButton        : require('./Real/Controls/slide-button') 
    },

    Play : { Navigation         : require('./Play/navigation'           ) 
           , Playground         : require('./Play/some-animation'       ) 
           , Responder          : require('./Play/responder'            ) 
           , LongView           : require('./Play/longview'             ) 
           , SlideListPlay      : require('./Play/slide-list-play'      ) 
           , StretchPlay        : require('./Play/stretch'              ) 
           , Blur               : require('./Play/blur'                 ) 
    },

    Stack: { Linq               : require('linq'                        ) 
    },
 }

 module.exports = Limes;
