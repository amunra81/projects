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

var Stretch = React.createClass({
    getInitialState: function(){
        var offset = 35
        return {
            topOffset : new Animated.Value(-offset),
            bottomOffset : new Animated.Value(offset),
        };
    },

    WIDTH : 100,
    HEIGHT : 50,
    CIRCLE_LEFT : 10,
    CIRCLE_TOP : 85,

  _panResponder: {},

  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder  : this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder   : this._handleMoveShouldSetPanResponder,
      onPanResponderGrant           : this._handlePanResponderGrant,
      onPanResponderMove            : this._handlePanResponderMove,
      onPanResponderRelease         : this._handlePanResponderEnd,
      onPanResponderTerminate       : this._handlePanResponderEnd,
    });
    this.styles = this.createStyles();
  },

  createStyles : function() { 
      return StyleSheet.create({
        container: {
            flex:1,
            backgroundColor:'#dcf4ff'
        },
        box: {
            width:this.WIDTH,
            height:this.HEIGHT,
            top:200,
            left:100,
            backgroundColor:'#f9dcff'
        },
        circleBox: {
            width:this.WIDTH,
            height:this.HEIGHT,
            left:-this.CIRCLE_LEFT,
            borderRadius:50,
            backgroundColor:'#dcf4ff'
        },
        top: {
            //top:-35,
            position:'absolute',
            //backgroundColor:'green'
        },
        bottom: {
            //top:this.state.OFFSET,
            //backgroundColor:'blue',
            position:'absolute'
        }
      });
  },

  componentDidMount: function() {
  },

  render: function() {
      return (<View style={this.styles.container}>
                <View style={[this.styles.box]}>
                    <Animated.View name="up" style={[this.styles.circleBox,this.styles.top,
                        {top:this.state.topOffset}]}/>
                    <Animated.View name="up" style={[this.styles.circleBox,this.styles.bottom,
                        {top:this.state.bottomOffset}]} />
                </View>
              </View>);
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return true;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return true;
  },

  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    this._oldGestureY = gestureState.dy;
    this._highlight(this.pager);
  },

  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    //this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    //console.log(gestureState);
    this._updatePosition();
    this._updateMove(gestureState);
  },
});

// #dcf4ff #f9dcff #fff9dc #ffe7dc

module.exports = Stretch;

