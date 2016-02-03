
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
} = React;

var OrderHead = React.createClass({

  getState: function() {
      if(this.props.state)
        return merge(this.state,this.props.state);
      else
        return this.state;
  },

  getInitialState: function() {
      return  {
          dataSource:null,
          loaded:false
      };
  },

  render: function() {
      return (
        <View {...without("state",this.props)} style={[styles.container]}>
            { !this.getState().loaded?this.renderLoading():this.renderView()}
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
      var total = Linq.from(
                            Linq.from(this.getState().dataSource.segments)
                            .first(seg => seg.user.id == this.getState().userId ).items)
                            .sum(item => item.product.price);
                        

                      
      return (
        <View style={styles.subcontainer}>
            <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                <Text style={styles.titleBold}>
                    ZVON 
                </Text>
                <Text style={styles.titleLight}>
                    {' Coffee'}
                </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{alignItems:'flex-end',paddingRight:3,paddingBottom:2}}>
                    <Text style={styles.amount}> TOTAL </Text>
                    <Text style={styles.amount}> DE PLATA </Text>
                </View>
                <Text style={styles.titleLight}>
                    {total.toFixed(2)}
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
        height:85,
        //backgroundColor: '#f9dcff',
        //backgroundColor: '#35363a',
        backgroundColor: '#343539',
        //backgroundColor: 'transparent',
        opacity:0.99,
        
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 1,
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

