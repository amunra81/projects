'use strict';

var React = require('react-native');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight,
  Easing,
  TouchableWithoutFeedback,
} = React;

var CountDown = React.createClass({
    TEXT_SIZE : 36,
    getInitialState : function() {
        return {
            textSize : new Animated.Value(this.TEXT_SIZE),
            animationStarted : false,
            initialValue: 100,
        };
    },
    render: function() {
        return (
                <View style={styles.container}>
                    <TouchableWithoutFeedback  onPress={this._startAnimation}>
                        <Animated.Text style={[styles.text,{fontSize:this.state.textSize}]}>
                            {this.state.initialValue}
                        </Animated.Text>
                    </TouchableWithoutFeedback>
                </View>);
    },

    _startAnimation: function() {
        this._animate(this.state.textSize,4,()=> {
            this.setState({initialValue: this.state.initialValue -1});
            this._animate(this.state.textSize,this.TEXT_SIZE,()=>{
                setTimeout(() => this._startAnimation(),700)
            }).timing();
        }).timing();
    },

    _animate: function(value,toValue,callback) {
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
});

var styles = {
    text: {
        fontFamily: 'Nexa Bold',
    },
    container: {
        alignItems:'center',
        paddingTop: 120,
    }
}

// #dcf4ff #f9dcff #fff9dc #ffe7dc
//var styles = {
    
//};

module.exports = CountDown;
