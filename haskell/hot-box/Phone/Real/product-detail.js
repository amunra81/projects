'use strict';

var React = require('react-native');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
} = React;

var BlurView = require('react-native-blur').BlurView;
var VibrancyView = require('react-native-blur').VibrancyView;

var ProductDetails = React.createClass({
    getInitialState: function(){
        return {

        };
    },

  render: function() {
      return ( 

        <View style={styles.container}>
           {this.renderTop()}
            <VibrancyView blurType="dark" style={styles.wrapper} > 
                <View style={{backgroundColor:'transparent',height:20,opacity:0.5}}/>
                {this.renderDetails()}
                {this.renderActions()}
            </VibrancyView>
        </View>
    );
  },
  renderHorizontalSep() {
    return <View style={styles.horizontalSep}/>;
  },
  renderSeparator() {
    return <View style={styles.separator}/>;
  },
  renderTop: function() {
      var product = this.props.product.product;
      var placeHolder = `https://unsplash.it/640/240?image=${product.id}1`;
      return (
      <View style={styles.top}>
          <Image source={{uri:placeHolder}} style={{flex:1,alignSelf:'stretch'}}/>
      </View>
      );
  },
  renderDetails: function() {
      return (
      <View style={styles.details}>
          <Text style={styles.text}>
         One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.
          </Text>
      </View>
      );
  },
  //⍝⊖…⇱⇲  ⨁ ⨂ ⊕⊖
  renderActions: function() {
      return (
          <View>
              {this.renderSeparator()}
            <View style={styles.quantityActions}>
                <TouchableOpacity style={styles.add}>
                    <Text style={styles.actionText}>⇱</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.minus]}>
                    <Text style={styles.actionText}>⇲</Text>
                </TouchableOpacity>
            </View>
          {this.renderSeparator()}
          <TouchableOpacity style={styles.actions} onPress={()=>this.props.onClose()}>
            <Text style={styles.text}>CLOSE</Text>
          </TouchableOpacity>
          </View>
      );
  },

});

var styles = StyleSheet.create({
    container : {
        //flex:1,
        position:'absolute',
        top:0,
        left:0,
        width:320,
        height:570,
        //borderRadius:10,
        //backgroundColor:'red',
        overflow:'hidden',

    },
    wrapper :{ 
        flex:1,
    },
    top:{
        height:200,
        //backgroundColor: 'rgba(52, 53, 57,1.9)',
        backgroundColor:'red',
    },
    details:{
        flex:1,

    },
    separator: {
        backgroundColor:'white',height:1,alignSelf:'stretch'    
    },
    horizontalSep: {
        flex:1,
        backgroundColor:'black',width:1,alignSelf:'stretch'    
    },
    quantityActions:{
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'stretch',
    },
    add:{
        borderRightColor:'black',
        borderRightWidth:1,
        flex:1,
        height:60,
        justifyContent:'center',
        alignItems:'center',
    },
    minus:{
        borderRightColor:'white',
        //borderRightWidth:1,
        flex:1,
        height:60,
        justifyContent:'center',
        alignItems:'center',
    },
    actions:{
        height:80,
        justifyContent:'space-around',
        alignItems:'center',
        //backgroundColor:'white'
    },
    actionText : {
        color:'black',
        fontFamily:'Nexa Bold',
        fontSize:30,
    },
    text: {
        color:'white',
        fontFamily:'Nexa Bold',
    }
});

// #dcf4ff #f9dcff #fff9dc #ffe7dc

module.exports = ProductDetails;

