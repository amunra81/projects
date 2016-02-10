'use strict';

var React = require('react-native');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  Animated,
} = React;


var OrderLine = React.createClass({

  render: function() {
    return this.renderView();
  },

  renderView:function () {
    return (<View  style={[styles.center,styles.container]}>
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

      return (
          <View style={[styles.containerBlur]}>
                {this.renderProduct(p1,this.isClosed(p1),onPressed)}
                {this.renderProduct(p2,this.isClosed(p2),onPressed)}
          </View>
      );
  },

  isClosed : function (p) {
     return !this.props.openedProdId || this.props.openedProdId != p.product.id;
  },

  renderProduct: function(p,closed,onPressed) {
    var placeHolder = `https://unsplash.it/640/240?image=${p.product.id}1`;
    var detailView = [styles.detailView,closed?styles.closedDetailView:styles.openedDetailView];
    var wraperStyle = closed?styles.closedView:styles.openedView; 
    //⍝⊖…⇱⇲  ⨁ ⨂ ⊕
    return (
        <TouchableHighlight style={wraperStyle} onPress={ ()=> onPressed(p.product)}>
            <Image  style={[styles.listItem,{height:this.props.height}]} 
                source={{uri:placeHolder}}>
                <View style={styles.emptyDetailView}/>
                <View style={detailView}>
                    {this.renderCircle(p.count)}
                    <Text style={styles.captionText} > {p.product.name} </Text>
                    
                    <Text style={styles.signText}> {'⨁ ⨂'} </Text>

                </View>
            </Image>
        </TouchableHighlight>
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
    alignItems:'stretch',
  },
  containerBlur: {
    flexDirection: 'row',
    width: 320,
  },
  listItem: {
      backgroundColor: '#EFF9F9',
      //pentru text
      justifyContent:'flex-end',
      overflow:'hidden',
  },
  singleItem: {

  },
  emptyDetailView: {
      flex:2,
      backgroundColor:'transparent',
  },
  closedView: {
      flex:0.00001,
  },
  openedView: {
      flex:1,
  },
  openedDetailView: {
    flex:2.2,
    //marginBottom:10,
  },
  closedDetailView: {
    flex:0.8,
    marginBottom:10,
    //justifyContent: 'center',
    //alignItems:'center',
  },
  detailView: {
    flexDirection: 'row',
    borderColor:'black',
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    backgroundColor: 'rgba(21,21,23,0.70)',
  },

  captionText: {
    color: 'rgba(256,256,256,1)',
    fontFamily:'Nexa Bold',
    fontSize:15,
    paddingRight:10,
    paddingLeft: 10,
  },
  signText: {
      //flex:1,
    fontFamily: 'Apple Symbols',
    color: 'rgba(256,256,256,1)',
    //fontFamily:'Nexa Bold',
    fontSize:28,
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
