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
  pager: (null : ?{ setNativeProps(props: Object): void }),
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

  setItemRef : function (item)
  {
      if(item){
          item.i = 4;
          console.log(item);
      }
  },

  render: function() {
    return (
      <View
          style={styles.container}>
        <View style={styles.circle}
            {...this._panResponder.panHandlers} >
          <View ref={(item) => { this.pager = item; }}
                style={styles.textView} >
                <Text ref="c0">{' 1 \n\n---'}</Text> 
                <Text ref="c1">{' '+ this.state.direction +' \n---'}</Text>
                <Text ref="c2">{' 3 \n\n---'}</Text>
                <Text ref="c3">{' 4 \n---'}</Text>
                <Text ref="c4">{' 5 \n\n---'}</Text>
                <Text ref="c5">{' 6 \n\n---'}</Text>
                <Text ref="c6">{' 7 \n---'}</Text>
                <Text ref="c7">{' 8 \n\n---'}</Text>
                <Text ref="c8">{' 9 \n\n---'}</Text>
                <Text ref="c9">{' 10 \n\n---'}</Text>
                <Text ref="c10">{' 11 \n\n---'}</Text>
                <Text ref="c11">{' 12 \n\n---'}</Text>
                <Text ref="c12">{' 12 \n\n---'}</Text>
                <Text ref="c13">{' 13 \n\n---'}</Text>
                <Text ref="c14">{' 14 \n\n---'}</Text>
                <Text ref="c15">{' 1 \n\n---'}</Text>
                <Text ref="c16">{' 2 \n\n---'}</Text>
                <Text ref="c17">{' 3 \n\n---'}</Text>
                <Text ref="c18">{' 4 \n\n---'}</Text>
                <Text ref="c19">{' 5 \n\n---'}</Text>
                <Text ref="c20">{' 6 \n\n---'}</Text>
                <Text ref="c21">{' 7 \n\n---'}</Text>
                <Text ref="c22">{' 8 \n\n---'}</Text>
                <Text ref="c23">{' 9 \n\n---'}</Text>
                <Text ref="c24">{' 10 \n\n---'}</Text>
                <Text ref="c25">{' 11 \n\n---'}</Text>
                <Text ref="c26">{' 12 \n\n---'}</Text>
                <Text ref="c27">{' 12 \n\n---'}</Text>
                <Text ref="c28">{' 13 \n\n---'}</Text>
                <Text ref="c29">{' 14 \n\n---'}</Text>
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

  _unHighlight: function(obj: Object) {
    obj && obj.setNativeProps({
      style: {
        backgroundColor: processColor(TEXTVIEW_COLOR)
      }
    });
  },

  _updatePosition: function() {
    this.pager && this.pager.setNativeProps(this._circleStyles);
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
  
  _updateMove: function(newGesture:Object) {
      var dif = newGesture.dy - this._oldGestureY;
      if(dif!=0) {
        this._moveDirection = dif;
        this._oldGestureY = newGesture.dy;
        var s = this._moveDirection>=0?'DOWN':'UP';
        //console.log(s);
        this.setState({direction: s});
      }
      //else
        //console.log("NOTHING");
  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    this._unHighlight(this.pager);
    //this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    this._oldGestureY = 0;
    this._updatePosition(); 
    //this.measureMe(this.pager,"container ",
    //() => this.measureMe(this.circle2,"item1 "));
    this._findTheGuy((str) => {console.log(str);});
    
  },

  _findTheGuy: function(callback) {
      var pager = this.pager;
      var children = pager.props.children;

      this.pager.measure((fx, fy, width, height, px, py) => {
          var fire = (i) => { callback(children[i]);}

          var func = (acc,i) => {
              if(i>=children.length)
                  fire(i-1);
              else if(acc <= 0)
                  fire(i);
              else {
                  var element = children[i];
                  var item = this.refs[element.ref];
                  item.measure((efx,efy,ewidth,eheight,epx,epy)=>{
                       func(acc-eheight,i+1);
                  });
              }
          }
          //call the func
          func(fy*(-1),0);
      });
  },

    _measureMe: function(obj,prefix,callback) {
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
