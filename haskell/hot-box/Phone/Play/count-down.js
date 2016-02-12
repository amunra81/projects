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

var CountDown = React.createClass({
    getInitialState : function() {
        return {
            textSize : new Animated.Value(36),
        };
    },
    render: function() {
        return (<View style={styles.container}>
                    <Animated.Text style={[styles.text,{fontSize:this.state.textSize}]}>Pula</Animated.Text>
                </View>);
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
