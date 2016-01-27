/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
   AppRegistry
   ,StyleSheet
   ,Text
   ,View
   ,ListView
   ,NavigatorIOS
   ,Animated
   ,Button
} = React;

var Navigation      = require('./Play/navigation'       );
var {Playground}    = require('./Play/some-animation'   );
var Responder       = require('./Play/responder'        );
var LongView        = require('./Play/longview'         );
var OrderDetails    = require('./Real/order-details'    );
var Order           = require('./Real/order'            );
var SlideListPlay   = require('./Play/slide-list-play'  );
var StretchPlay     = require('./Play/stretch'          );
var Blur            = require('./Play/blur'             );

var HTOP = 20;

var Phone = React.createClass({
  render: function() {
              //<View style={{backgroundColor:'#c0afc4',height:HTOP}}/>
      return (
          <View style={{flex:1,overflow:'hidden'}}>
              <View style={{flex:1,overflow:'hidden'}}>
                  { this.renderApp() }
              </View>
          </View>
      );
  },
  renderApp: function() {
      return <Order restId={1} tableId={1} userId={2}/>;
      //return <LongView />;
      //return <Playground />;
      //return <Responder />;
      //return <SlideListPlay/>;
      //return <StretchPlay />;
      //return <Blur />;
  }

//end React.createClas
});

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('Phone', () => Phone);
