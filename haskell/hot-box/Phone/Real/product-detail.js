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
            <VibrancyView blurType="dark" style={styles.wrapper} > 
                <View style={{backgroundColor:'transparent',height:20,opacity:0.5}}/>
                {this.renderTop()}
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
      return (

      <View style={styles.top}>
        <Text style={styles.text}>TOP</Text>
      </View>
      );
  },
  renderDetails: function() {
      return (
      <View style={styles.details}>
          <Text style={styles.text}>TOP</Text>
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
        height:100,
        //backgroundColor: 'rgba(52, 53, 57,1.9)',
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

