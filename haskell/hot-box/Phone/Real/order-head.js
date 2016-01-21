
'use strict';

var React = require('react-native');
var {merge,without} = require('./common');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
} = React;

var OrderHead = React.createClass({

  getState: function() {
      if(this.props.state)
        return merge(this.state,this.props.state);
      else
        return this.state;
  },

  getInitialState: function() {
      return  {
          dataSource:null,
          loaded:false
      };
  },

  render: function() {
      var ss = "Asdasa";
      console.log(ss);
      return (
        <View {...without("state",this.props)} style={[styles.container,styles.center]}>
            { !this.getState().loaded?this.renderLoading():this.renderView()}
        </View>
      );
  },

  renderLoading:function () {
      return (<Text> Loading .... {this.getState().containerHeight} </Text>);
  },

  renderView: function() {
    return (
        <Text>
            {this.getState().refreshed + "  "  + this.getState().containerHeight}  
        </Text>
    );
  },

});

var styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        height:50,
        backgroundColor: '#f9dcff',
    },
    center: {
        justifyContent:'center',
        alignItems:'center',
    },
});

module.exports = OrderHead;

