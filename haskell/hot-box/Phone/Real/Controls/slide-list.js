'use strict';

var React = require('react-native');
var Linq = require('linq');
const UIManager = require('NativeModules').UIManager;
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  LayoutAnimation,
  Animated,
  Easing,
} = React;


module.exports = React.createClass({

  _panResponder: {},
  container: null,  
  movingPart: null,  
  prevPage: null,
  currentPage: null,
  nextPage: null,
  offse:0,
  _moveDirection: 0,

  getInitialState: function() {
      return { 
                currentPage: 0,
                top:new Animated.Value(0),
             };
  },

  componentDidUpdate: function() {
    if(this.dims)
        {
        //LayoutAnimation.spring();
        this.state.top.setValue(-this.dims.height);
        }
  },

  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder  : this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder   : this._handleMoveShouldSetPanResponder,
      onPanResponderGrant           : this._handlePanResponderGrant,
      onPanResponderMove            : this._handlePanResponderMove,
      onPanResponderRelease         : this._handlePanResponderEnd,
      onPanResponderTerminate       : this._handlePanResponderEnd,
    });
  },

  render: function() {
      return (<View ref={x=>this.container = x} style={styles.container} onLayout={ this._setHeghts }>
          <Animated.View ref={ x=>this.movingPart = x } name='moving-part' style={{top:this.state.top}}
              {...this._panResponder.panHandlers}>
                    {this.renderPage(0,{style:{}}
                                    ,x=>this.prevPage = x,this.props.renderPrevPage)}
                    {this.renderPage(1,{style:{}}
                                    ,x=>this.currentPage = x,this.props.renderCurrentPage)}
                    {this.renderPage(2,{style:{}}
                                    ,x=>this.nextPage = x,this.props.renderNextPage)}

                </Animated.View>
            </View>
    );
  },

  renderPage: function(pageNo,props,refHandler,render) {
    //var props = this._withCommonStyle(propsP);
    var extraProps = {pageNo:pageNo,...props};

    var {pageSize,dataSource} = this.props;
    var rendered = render();
    return (
        <View ref={refHandler} {...extraProps}>
            {rendered}
        </View>
    );
  },


  _setHeghts : function (nativEvent)
  {
      this.dims = nativEvent.nativeEvent.layout;
      console.log(`OnLayout Changed: ${JSON.stringify(this.dims)}`);

      var pagesHeight = {style:{height:this.dims.height}};

      this.prevPage.setNativeProps(pagesHeight);
      this.currentPage.setNativeProps(pagesHeight);
      this.nextPage.setNativeProps(pagesHeight);

      this.state.top.setValue(-this.dims.height);
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

  _setMovingTop:function(offset,scrollCallBack) {
      this.offset   = offset;
      var top       = (-this.dims.height) + offset;

      //this.movingPart.setNativeProps({style: {top:top}});
      if(scrollCallBack)
          this._animate(this.state.top,top,scrollCallBack).timing();
      else
          this.state.top.setValue(top);
  },

  _animate: function(value,toValue,callback) {
      return {
          timing : () => {
            Animated.timing(                          
                value,                 
                {
                    toValue: toValue,                         
                    duration: 150,                          // default 500 ms
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

  _handlePanResponderMove: function(e: Object, gestureState: Object) {
      //console.log(gestureState);
      this._setMovingTop(gestureState.dy);
      this._updateMoveDirection(gestureState);
  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
      if(this.offset==0) 
          return ;
      //LayoutAnimation.easeInEaseOut();
      var top = 0;
      if(this._moveDirection>=0 && this.offset >=0) {
          //finger DOWN
          top = this.dims.height;
      } 
      else if(this._moveDirection<0 && this.offset <= 0 ){
          //finger UP
          top = - this.dims.height;
      }

      this._setMovingTop(top,x => {
          this.props.onScrolled(-top);
      });
  },
  _updateMoveDirection: function(newGesture:Object) {
      var dif = newGesture.dy - this._oldGestureY;
      if(dif!=0) {
        this._moveDirection     = dif;
        this._oldGestureY       = newGesture.dy;
        var s                   = this._moveDirection>=0?'DOWN':'UP';

        //console.log(s + " : offset: " + this.offset );
      }
  },
});

var styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        justifyContent: 'flex-start',
        flex:1,
        alignItems:'stretch',
        backgroundColor: '#dcffe7',
        //marginTop: 20,
        overflow:'hidden',
    }
});

