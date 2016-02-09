
'use strict';

var React = require('react-native');
var {merge,without} = require('./common');
var Linq = require('linq');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} = React;

var OrderHead = React.createClass({

  render: function() {
      return (
        <View {...this.props} style={[styles.container,this.props.style]}>
            { this.renderView() }
            <View style={styles.footer}>
                <Image source={require("../img/design/Roz.png")} style={{top:-1.5}}/>
            </View>
        </View>
      );
  },

  renderLoading:function () {
      return (<Text> Loading .... {this.getState().containerHeight} </Text>);
  },

  renderView: function() {
      var total =  this.props.total?this.props.total.toFixed(2):0.00;
      return (
        <View style={styles.subcontainer}>
            <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                <Text style={styles.titleBold}>
                    ZVON 
                </Text>
                <Text style={styles.titleLight}>
                    {' Coffee ' } 
                </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{alignItems:'flex-end',paddingRight:3,paddingBottom:2}}>
                        <Text style={styles.amount}> TOTAL </Text>
                        <Text style={styles.amount}> DE PLATA </Text>
                    </View>
                <Text style={styles.titleLight}>
                    {total}
                </Text>
            </View>
        </View>
    );
  },

});

var styles = StyleSheet.create({

    container: {
        borderTopColor:"#4b4c54",
        borderTopWidth:1,
        flexDirection:'column',
        height:85, // THIS IS FIXED!!!!
        //backgroundColor: '#f9dcff',
        //backgroundColor: '#35363a',
        backgroundColor: 'rgba(52, 53, 57,1.9)',
        //backgroundColor: 'transparent',
        //opacity:0.79,
        
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        height: 0,
        width: 0,
        }
    },
    footer: {
        height:1,
        backgroundColor:'transparent',
        backgroundColor:'#4b4c54',
        overflow:'visible',
        alignItems:'flex-end',
        paddingRight:16,
    },
    subcontainer: {
        flex:1,
        flexDirection:'row',
        paddingTop:15,
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'space-between',
        alignItems:'center'
    },
    titleBold:{
        fontFamily: 'Nexa Bold',
        color: '#fcfbfe',
        fontSize:19
    },
    titleLight:{
        fontFamily: 'Nexa Light',
        color: '#fcfbfe',
        fontSize:19,
    },
    amount : {
        fontFamily: 'Nexa Light',
        //color: '#fcfbfe',
        color:  '#fcfbfe',
        fontSize:6,
    },
    center: {
        justifyContent:'center',
        alignItems:'center',
    },
});

var imgs = {
    statusBar : require('../img/design/statusBar.png'),
    //background : require('../img/design/ceva.png'),
    background : require('../img/design/gradient-warmer.png'),
    actionsBar : require('../img/design/actions-bg.png'),
    lightRow : require('../img/design/light-row-bg.png'),
    darkRow : require('../img/design/dark-row-bg.png'),
};

module.exports = OrderHead;

