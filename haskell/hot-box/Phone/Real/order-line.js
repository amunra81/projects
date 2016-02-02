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
            <TouchableOpacity onPress={() => { 
            console.log(`s-a clickuit pe ${this.props.p1.name}!`); 
            this.props.productClicked(p1);
            }}>
                <View style={styles.containerBlur}>
                    <Text style={{color:'black'}}>
                        {this.props.p1.name }
                    </Text>
                </View>
            </TouchableOpacity>
      );
  },

  renderTwoProducts: function() {
      return (
            <TouchableOpacity onPress={() => { 
            console.log(`s-a clickuit pe ${this.props.p1.name}!`); 
            this.props.productClicked(p1);
            }}>
                <View style={styles.containerBlur}>
                    <Text style={{color:'black'}}>
                        {this.props.p1.name + " - " }
                    </Text>
                    <Text>
                        { this.props.p2.name}
                    </Text>
                </View>
            </TouchableOpacity>
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
    flex: 1,
    //marginTop:-10,
    //height:400,
    //width:320,
    //flexDirection: 'row',
    justifyContent: 'space-around',
    //alignItems: 'center',
    //backgroundColor: '#dcffe7',
    //flexWrap:'nowrap',
    backgroundColor:'transparent'
  },
  containerBlur: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    //backgroundColor: 'transparent',
    height:75,
    width:320,
    backgroundColor: '#EFF9F9'
  },
  listItem: {
    //marginTop:5,
    //marginBottom:15,
    //backgroundColor: '##EFF9F9'
  }
});

module.exports = OrderLine;
