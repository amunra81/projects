'use strict';

var React = require('react-native');
const UIManager = require('NativeModules').UIManager;
var {
  PanResponder,
  StyleSheet,
  Text,
  View,
  processColor,
} = React;

var CIRCLE_SIZE = 80;
var CIRCLE_COLOR = 'green';
var CONTAINER_COLOR = 'white';
var TEXTVIEW_COLOR = 'red';
var CIRCLE_HIGHLIGHT_COLOR = 'magenta';

var LongView = React.createClass({

  getInitialState: function() {
    return {
        direction: "1",
    };
  },

  statics: {
    title: 'PanResponder Sample',
    description: 'Shows the use of PanResponder to provide basic gesture handling.',
  },

  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,
  _circleStyles: {},
  circle: (null : ?{ setNativeProps(props: Object): void }),
  circle2: (null : ?{ setNativeProps(props: Object): void }),

  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = 0;
    this._previousTop = 0;
    this._moveDirection = 0;
    this._oldGestureY = 0;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop
      }
    };
  },

  componentDidMount: function() {
    this._updatePosition();
  },

  getDims: function(handle) {
  UIManager.measureLayoutRelativeToParent(
      handle, 
      (e) => {console.error(e)}, 
      (x, y, w, h) => {
          console.log('offset', x, y, w, h);
      });
  },

  render: function() {
    return (
      <View
          style={styles.container}>
        <View style={styles.circle}
            {...this._panResponder.panHandlers} >
          <View ref={(item) => { this.circle = item; }}
                style={styles.textView} >
                <Text ref={(item) => { this.circle2 = item; }}>{' 1 \n\n---'}</Text> 
                <Text>{' '+ this.state.direction +' \n---'}</Text>
                <Text>{' 3 \n\n---'}</Text>
                <Text>{' 4 \n---'}</Text>
                <Text>{' 5 \n\n---'}</Text>
                <Text>{' 6 \n\n---'}</Text>
                <Text>{' 7 \n---'}</Text>
                <Text>{' 8 \n\n---'}</Text>
                <Text>{' 9 \n\n---'}</Text>
                <Text>{' 10 \n\n---'}</Text>
                <Text>{' 11 \n\n---'}</Text>
                <Text>{' 12 \n\n---'}</Text>
                <Text>{' 12 \n\n---'}</Text>
                <Text>{' 13 \n\n---'}</Text>
                <Text>{' 14 \n\n---'}</Text>
                <Text>{' 1 \n\n---'}</Text>
                <Text>{' 2 \n\n---'}</Text>
                <Text>{' 3 \n\n---'}</Text>
                <Text>{' 4 \n\n---'}</Text>
                <Text>{' 5 \n\n---'}</Text>
                <Text>{' 6 \n\n---'}</Text>
                <Text>{' 7 \n\n---'}</Text>
                <Text>{' 8 \n\n---'}</Text>
                <Text>{' 9 \n\n---'}</Text>
                <Text>{' 10 \n\n---'}</Text>
                <Text>{' 11 \n\n---'}</Text>
                <Text>{' 12 \n\n---'}</Text>
                <Text>{' 12 \n\n---'}</Text>
                <Text>{' 13 \n\n---'}</Text>
                <Text>{' 14 \n\n---'}</Text>
            </View>
        </View>
      </View>
    );
  },

  _highlight: function(obj: Object) {
    obj && obj.setNativeProps({
      style: {
        backgroundColor: processColor(CIRCLE_HIGHLIGHT_COLOR)
      }
    });
  },

  _unHighlight: function() {
    this.circle && this.circle.setNativeProps({
      style: {
        backgroundColor: processColor(TEXTVIEW_COLOR)
      }
    });
  },

  _updatePosition: function() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
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
    this._highlight(this.circle);
  },

  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    //this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    console.log(gestureState);
    this._updatePosition();
    this._updateMove(gestureState);
  },
  
  _updateMove: function(newGesture:Object) {
      var dif = newGesture.dy - this._oldGestureY;
      if(dif!=0) {
        this._moveDirection = dif;
        this._oldGestureY = newGesture.dy;
        var s = this._moveDirection>=0?'DOWN':'UP';
        console.log(s);
        this.setState({direction: s});
      }
      else
      console.log("NOTHING");
  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    this._unHighlight();
    //this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    this._oldGestureY = 0;
    this._updatePosition(); 
    //this.measureMe(this.circle,"container ",
        //() => this.measureMe(this.circle2,"item1 "));
    
    },
    measureMe: function(obj,prefix,callback) {
        obj.measure( (fx, fy, width, height, px, py) => {
                console.log(prefix + 'Component width is: ' + width)
                console.log(prefix + 'Component height is: ' + height)
                console.log(prefix + 'X offset to frame: ' + fx)
                console.log(prefix + 'Y offset to frame: ' + fy)
                console.log(prefix + 'X offset to page: ' + px)
                console.log(prefix + 'Y offset to page: ' + py)
                if(callback)
                {
                    console.log("TRUE");
                    callback();
                }
                else
                {
                    console.log("FALSE");
                }
            });     
    }

});

var styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE*3,
    //borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_COLOR,
    //position: 'absolute',
    overflow: 'hidden',
    left: 20,
    top: 80,
  },

  textView: {
    backgroundColor: TEXTVIEW_COLOR,
    //position: 'relative',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: CONTAINER_COLOR,
  },
});

module.exports = LongView;
