/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    NavigatorIOS
} = React;

var Navigation = require('./navigation');
var {Playground} = require('./some-animation');

var Phone = React.createClass({
  render: function() {
    return ( <Playground />);
  }
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
