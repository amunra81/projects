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
        var value = new Animated.Value(this.OFFSET);
        return {
            topOffset : value.interpolate({
                            inputRange: [-100,0,100],
                            outputRange: [100,0,-100]
                        }),
            bottomOffset : value,
            width: new Animated.Value(this.WIDTH),

        };
    },

    OFFSET : 100,
    WIDTH : 100,
    HEIGHT : 50,

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
            //backgroundColor:'#dcf4ff'
        },
        visibleBox: {
            //width:this.WIDTH,
            height:this.HEIGHT,
            top:200,
            left:100,
            backgroundColor:'#f9dcff',
        },
        box:{
            //width:this.WIDTH,
            height:this.HEIGHT,
            backgroundColor:'#dcf4ff',
            position:'absolute',
        },
        circleBox: {
            //width:this.WIDTH,
            height:this.HEIGHT*2,
            //left:-this.CIRCLE_LEFT,
            borderRadius:this.HEIGHT,
        },
        top: {
            //top:this.HEIGHT,
            //backgroundColor:'green'
        },
        bottom: {
            top:-this.HEIGHT,
            //backgroundColor:'blue',
        }
      });
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
    <View style={this.styles.container} {...this._panResponder.panHandlers}>
        <Animated.View style={[this.styles.visibleBox,{width:this.state.width}]}>
            <Animated.View name="upBox" style={[this.styles.box,
                {top:this.state.topOffset},{width:this.state.width}]}>
                <Animated.View style={[this.styles.circleBox,this.styles.top,{width:this.state.width}]}/>
            </Animated.View>
            <Animated.View name="downBox" style={[this.styles.box,
                {top:this.state.bottomOffset},{width:this.state.width}]} >
                <Animated.View style={[this.styles.circleBox,this.styles.bottom,{width:this.state.width}]}/>
            </Animated.View>
        </Animated.View>
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
  },

   _handlePanResponderEnd: function(e: Object, gestureState: Object) {
       console.log(`width:${this.state.width._value} offset:{this.state.bottomOffset._value}`);
       return;
        Animated.spring(                          // Base: spring, decay, timing
        this.state.bottomOffset,                 // Animate `bounceValue`
        {
            toValue: this.OFFSET,                         // Animate to smaller size
            friction: 3,                          // Bouncier spring
            tension: 100
        }
        ).start();                                // Start the animation
  },
  _handlePanResponderMove: function(e: Object, gestureState: Object) {
      console.log("pi;aa");
      this.state.bottomOffset.setValue(this.OFFSET+gestureState.dy);
      //this.state.width.setValue(this.WIDTH+gestureState.dx);
  },
  
});

// #dcf4ff #f9dcff #fff9dc #ffe7dc

module.exports = Stretch;

