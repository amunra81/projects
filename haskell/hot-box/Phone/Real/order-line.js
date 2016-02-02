'use strict';

var React = require('react-native');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;


var OrderLine = React.createClass({

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
  },

  render: function() {
    return this.renderView();
  },

  renderView:function () {
      return (<View {...this.props} style={[styles.center,styles.container]}>
                {this.props.p2?this.renderTwoProducts():this.renderOneProduct()}
              </View>);
  },

  renderOneProduct: function() {
      return (
                <View style={styles.containerBlur}>
                    <View style={[styles.listItem,styles.singleItem]}>
                        <Text style={styles.itemText}>
                            {this.props.p1.name }
                        </Text>
                    </View>
                </View>
      );
  },

  renderTwoProducts: function() {
      var p1 = this.props.p1;
      var p2 = this.props.p2;
      var onPressed = (p) => { 
                    console.log(`s-a clickuit pe ${p.name}!`); 
                    this.props.productClicked(p);
      };
      var renderProduct = (p,buttonStyle) => { 
          return (
            <TouchableOpacity style={buttonStyle} 
                onPress={()=>onPressed(p)} >
                    <Text style={styles.itemText}>
                        {p.name + " " + p.price}
                    </Text>
            </TouchableOpacity>
          );
      };
      return (
          <View style={styles.containerBlur}>
                {renderProduct(p1,[styles.listItem,styles.leftItem])}
                {renderProduct(p2,[styles.listItem,styles.rightItem])}
            </View>
      );
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

var styles = StyleSheet.create({
  center: {
    justifyContent:'center',
    alignItems:'center',
  },
  container: {
    //flex: 1,
    alignItems:'stretch',
    //justifyContent:'center'
    //backgroundColor:'green',
  },
  containerBlur: {
    //flex: 1,
    flexDirection: 'row',
    //backgroundColor:'red',
    //marginBottom:10,
  },
  listItem: {
      flex:1,
      backgroundColor: '#EFF9F9',
      //pentru text
      justifyContent:'center',
      alignItems:'center',
      height:120.5,
      overflow:'hidden',
  },
  singleItem: {
  },
  leftItem: {
      marginRight: 0.5,
  },
  rightItem: {
      //marginLeft: 0.3,
  },
  itemText: {
      fontFamily: 'Nexa Light'
  },
});

module.exports = OrderLine;
