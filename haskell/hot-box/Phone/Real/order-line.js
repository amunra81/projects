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
    var wraperStyle = closed?styles.closedWrapper:styles.openedWrapper; 
    var textStyle = [styles.captionText,closed?styles.closedText:styles.openedText];
    //⍝⊖…⇱⇲  ⨁ ⨂ ⊕
    return (
    <TouchableHighlight style={wraperStyle} onPress={ ()=> onPressed(p.product)}>
        <Image  style={[styles.image,{height:this.props.height}]} 
            source={{uri:placeHolder}}>
            <View style={styles.emptyDetailView}>
            </View>
            <View style={detailView}>
                {this.renderCircle(p.count)}
                <Text style={textStyle}>{p.product.name}{closed?"":`\r\n~ ${p.product.price} lei ~`} </Text>
                { !closed?this.renderAction('⨁',{paddingTop:10},()=>this.props.productClicked(p.product)):null}
                { !closed?this.renderAction('⨂',{paddingTop:10},()=> this.props.productDelete(p.product.id)):null}
                { !closed?this.renderAction('…',):null}
            </View>
        </Image>
    </TouchableHighlight>
    );
  },

  renderAction: function(caption,style,onPress) {
    return (
    <TouchableHighlight style={[styles.paravan,style,{flex:0.3,flexDirection:'row',justifyContent:'center',alignItems:'center'}]} onPress={onPress}>
        <Text style={styles.signText}> {caption} </Text>
    </TouchableHighlight>
  );},

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
  image: {
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
  closedWrapper: {
      flex:0.00001,
  },
  openedWrapper: {
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
    justifyContent:'space-between',
    //alignItems:'stretch',
    backgroundColor: 'rgba(21,21,23,0.70)',
    borderColor:'black',
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
  },
  captionText: {
    flex:1,
    color: 'rgba(256,256,256,1)',
    fontFamily:'Nexa Bold',
    fontSize:15,
    paddingLeft: 5,
  },
  openedText: {
    alignSelf: 'center',
    //paddingTop: 20,
  },
  closedText: {
    alignSelf: 'center',
    //paddingTop: 10,
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
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'rgba(21,21,23,0.5)',
      alignSelf: 'center',
      marginTop:-2,
      marginLeft: 5,
      //position: 'absolute',
      //top:5,
      //left:2,
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
