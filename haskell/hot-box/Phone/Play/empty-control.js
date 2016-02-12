'use strict';

var React = require('react-native');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
  Animated,
} = React;

var Empty = React.createClass({
    getInitialState: function(){
        return {

        };
    },

  render: function() {
    return (
        <View > </View>);
  },

});

// #dcf4ff #f9dcff #fff9dc #ffe7dc

module.exports = Empty;
