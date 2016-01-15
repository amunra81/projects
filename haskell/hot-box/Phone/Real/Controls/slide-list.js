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
             };
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
                <View ref={x=>this.movingPart = x} name='moving-part' >
                    {this.renderPage(0,{name:"pula",style:{backgroundColor:'red'}}
                                    ,x=>this.prevPage = x,this.props.renderPrevPage)}
                    {this.renderPage(1,{style:{backgroundColor:'green'},...this._panResponder.panHandlers}
                                    ,x=>this.currentPage = x,this.props.renderCurrentPage)}
                    {this.renderPage(2,{style:{backgroundColor:'yellow'}}
                                    ,x=>this.nextPage = x,this.props.renderNextPage)}

                </View>
            </View>
    );
  },

  renderPage: function(pageNo,props,refHandler,render) {
    //var props = this._withCommonStyle(propsP);
    var extraProps = {pageNo:pageNo,...props};

    var {pageSize,dataSource} = this.props;

    return (
        <View ref={refHandler} {...extraProps}>
            { render() /*some.map(this.renderItem)*/}
        </View>
    );
  },


  _setHeghts : function (nativEvent)
  {
      this.dims = nativEvent.nativeEvent.layout;
      console.log(`OnLayout: ${JSON.stringify(this.dims)}`);

      var pagesHeight = {style:{height:this.dims.height}};
      var movingPartTop = {style:{top:-this.dims.height}};

      this.prevPage.setNativeProps(pagesHeight);
      this.currentPage.setNativeProps(pagesHeight);
      this.nextPage.setNativeProps(pagesHeight);
      this.movingPart.setNativeProps(movingPartTop);
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
      console.log('grnd');
      //this should be removed
      //this._setMovingTop(0);
  },

  _setMovingTop:function(offset) {
      this.offset   = offset;
      var top       = (-this.dims.height) + offset;

      this.movingPart.setNativeProps({style: {top:top}});
  },
  _handlePanResponderMove: function(e: Object, gestureState: Object) {
      //console.log(gestureState);
      this._setMovingTop(gestureState.dy);
      this._updateMoveDirection(gestureState);
  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
      LayoutAnimation.easeInEaseOut();
      var top = 0;
      if(this._moveDirection>=0 && this.offset >=0) {
          //finger DOWN
          top = this.dims.height;
      } 
      else if(this._moveDirection<0 && this.offset <= 0 ){
          //finger UP
          top = - this.dims.height;
      }

      this._setMovingTop(top);
  },
  _updateMoveDirection: function(newGesture:Object) {
      var dif = newGesture.dy - this._oldGestureY;
      if(dif!=0) {
        this._moveDirection     = dif;
        this._oldGestureY       = newGesture.dy;
        var s                   = this._moveDirection>=0?'DOWN':'UP';

        console.log(s + " : offset: " + this.offset );
      }
  },
});

var styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        justifyContent: 'flex-start',
        flex:1,
        alignItems:'stretch',
        backgroundColor: '#dcf4ff',
        marginTop: 20,
        overflow:'hidden',
    }
});

