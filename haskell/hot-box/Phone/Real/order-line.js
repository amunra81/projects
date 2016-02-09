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
  Animated,
} = React;


var OrderLine = React.createClass({

  render: function() {
    return this.renderView();
  },

  renderView:function () {
    return (<View {...this.props} style={[styles.center,styles.container]}>
                {this.props.p2?this.renderPairs():this.renderSingle()}
              </View>);
  },

  renderSingle: function() {
    return 
    <View style={styles.containerBlur}>
        <View style={[styles.listItem,styles.singleItem]}>
            <Text style={styles.itemText}>
                {this.props.p1.name }
            </Text>
        </View>
    </View>
  },


  renderPairs: function() {
      var p1 = this.props.p1;
      var p2 = this.props.p2;

      var onPressed = (p) => { 
          this.props.toogleProductId && this.props.toogleProductId(p.id);
      };

      var closedStyle = { flex : 0.0001 };
      var openedStyle = { flex : 1 };

      return (
          <View style={[styles.containerBlur]}>
                {this.renderProduct(p1,this.isClosed(p1)?closedStyle:openedStyle,onPressed)}
                {this.renderProduct(p2,this.isClosed(p2)?closedStyle:openedStyle,onPressed)}
          </View>
      );
  },

  isClosed : function (p) {
     return !this.props.openedProdId || this.props.openedProdId != p.product.id;
  },

  renderProduct: function(p,customStyle,onPressed) {
    var placeHolder = `https://unsplash.it/640/240?image=${p.product.id}1`

    return (
        <TouchableOpacity style={customStyle} onPress={ ()=> onPressed(p.product)}>
            <Image  style={[styles.listItem,{height:this.props.height}]} 
                    source={{uri:placeHolder}}>
                <View style={[{ height:this.props.height/4},styles.detailView]}>
                    {this.renderCircle(p.count)}

                    <Text style={styles.captionText} >
                        {p.product.name}
                    </Text>
                </View>
            </Image>
        </TouchableOpacity>
    );
  },
  renderCircle : function(count) {
    if(count && count > 0)
        return (
                <View name="cerc" style={styles.circle}>
                    <Text name="quantity" style={styles.quantity}>
                        {count}
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
    width: 320,
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
  detailView: {
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:10,
    borderColor:'black',
    borderTopWidth:0,
    borderBottomWidth:0,
    backgroundColor: 'rgba(21,21,23,0.70)'
  },
  paddingText: 10,
  captionText: {
    color: 'rgba(256,256,256,1)',
    fontFamily:'Nexa Bold',
    fontSize:15,
    paddingRight:10,
    paddingLeft: 10,
  },
  leftItem: {
      flex:1,
      //width:160,
      //marginRight: 1,
  },
  rightItem: {
      flex:1,
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
