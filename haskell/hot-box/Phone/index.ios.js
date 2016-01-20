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




var Phone = React.createClass({
  render: function() {
      return <Order restId={1} tableId={1} userId={2}/>;
      //return <LongView />;
      //return <Playground />;
      //return <Responder />;
      //return <SlideListPlay/>;
      //return <StretchPlay />;
    }
//end React.createClas
});

var styles = StyleSheet.create({
  wraper: {
    flex:1
    ,justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Phone', () => Phone);
