'use strict';

var React = require('react-native');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} = React;


var BlurView = require('react-native-blur').BlurView;
var VibrancyView = require('react-native-blur').VibrancyView;

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

      var pla
      var renderProduct = (p,buttonStyle,justifyText) => { 
          var placeHolder = `https://unsplash.it/640/240?image=${p.id}1`
          var width = 160;
          var itemStyle =[styles.listItem,{width:width,height:this.props.height},buttonStyle];
          var textColor ='rgba(256,256,256,1)'; 
          var bkgColor = 'rgba(21,21,23,0.70)';
          var borderWidth = 0;
          var paddingText = 10;
          return (
                <Image  style={itemStyle} source={{uri:placeHolder}}>
                    <View 
                        style={{
                            width:width,
                            height:this.props.height/4,backgroundColor:bkgColor,
                            alignItems:justifyText,
                            justifyContent: 'center',
                            marginBottom:10,
                            borderColor:'black',
                            borderTopWidth:borderWidth,
                            borderBottomWidth:borderWidth,
                            
                        }}>
                            {this.renderCircle(p)}
                            <Text style={{
                            color: textColor,
                            fontFamily:'Nexa Bold',
                            fontSize:15,
                            paddingRight:paddingText,
                            paddingLeft: paddingText}}
                            >
                            {p.name}
                        </Text>
                    </View>
                </Image>
          );
                //<Text style={styles.itemText}>
                    //{p.name}
                //</Text>
      };
      return (
          <View style={styles.containerBlur}>
                {renderProduct(p1,styles.leftItem,'center')}
                {renderProduct(p2,styles.rightItem,'center')}
            </View>
      );
  },
  renderCircle : function(product) {
    if(product.count && product.count > 0)
        return (
                <View name="cerc" style={styles.circle}>
                    <Text name="quantity" style={styles.quantity}>
                        {product.count}
                    </Text>
                </View>
        );
    else 
        return null;

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
      backgroundColor: '#EFF9F9',
      //pentru text
      justifyContent:'flex-end',
      //alignItems:'flex-end',
      //height:120,
      overflow:'hidden',
  },
  singleItem: {
  },
  leftItem: {
      //flex:1,
      width:160,
      //marginRight: 1,
  },
  rightItem: {
      flex:1
      //marginLeft: 0.3,
  },
  itemText: {
      //flex:1,
      fontFamily: 'Nexa Light'
  },
  circle: {
      width:20,
      height:20,
      backgroundColor:'rgba(240,64,59,0.9)',
      borderRadius:10,
      marginLeft:140,
      marginTop:-15,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'rgba(21,21,23,0.5)',
      //borderWidth: 1,
      //borderBottomWidth: 0,
  },
  quantity: {
      marginTop:4,
      flex:1,
      backgroundColor:'transparent',
      fontFamily:'Nexa Bold',
      fontSize:14,
      color:'white',
      textAlign: 'center',
  },
  });

module.exports = OrderLine;
