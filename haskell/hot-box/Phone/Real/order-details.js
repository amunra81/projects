'use strict';

var React = require('react-native');
var Enumerable = require('linq');
var {merge,without} = require('./common');
var numeral = require('numeral');
//var Display = require('react-native-device-display');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
} = React;

var HeadContainer = View;

var OrderDetails = React.createClass({
  //mandatory
  getInitialState: function() {
    return { 
        restId : this.props.restId,
        tableId : this.props.tableId,
        dataSource : null,
        loaded: false,
        inAction: false,
        };
  },

  render: function() {
      return (
          <View {...this.props}>
              <Image 
                  source={imgs.background} 
                  style={{width:320,height:548}}>
                  <Image
                      source={imgs.statusBar}
                      style={{height:20,backgroundColor:'transparent'}}
                  />
               {this.renderView()}
             </Image>
         </View>
      );
  },

  renderView: function() {
            //{this.renderActions()}
    return (
        <View style={styles.container}>
            {this.renderTop()}
            {this.renderBody()}
        </View>
    );
  },
  
  renderTop: function() {
      return (
        <View>
        <View style={styles.user} >
            {this.state.inAction?this.renderInAction():this.renderTopBar()}
        </View>
        <Image style={[styles.actions]} source={imgs.actionsBar}>
            {this.renderCallTheWaiter()}
            {this.renderCheckPlease()}
        </Image>
        </View>
      );
  },

  renderTopBar: function() {
     return  <Text style={styles.userCaption}> {this._getProperSegment().user.fullName} </Text>;
  },

  renderInAction: function() {

  },

  renderCheckPlease:function() {
      return this.renderGeneralAction("Check please");
  },
  renderCallTheWaiter:function() {
      return this.renderGeneralAction("Call the waiter");
  },

  renderGeneralAction: function (text,onPress){
      return ( <Text style={styles.actionItem}>{`> ${text} <`}</Text> );
  },


  _getProperSegment: function() {
      //TODO: nasol
      return this.props.ds.filter( x => x.userId == this.props.userId)[0];
  },

  renderBody: function() {
      var data = this._getProperSegment();
      return (
          <View style={styles.order}>
              {this.renderSegment(data)}
          </View>
      );
  },

  renderSegment: function(segment){
      return (
          <View key={segment.userId}>
                {segment.items.map((x,i) => this.renderProduct(x,segment.userId,i))}
          </View>
      );
  },

  renderProduct: function(item,userId,i){
     var imgSource = i%2!=0?imgs.darkRow:imgs.lightRow;
     return (
          <TouchableHighlight key={item.itemId} onPress={() => { 
            console.log(`s-a clickuit pe ${item.pname} + ${userId}!`); 
            this.props.orderItemClicked(item,userId);
          }}>
            <Image source={imgSource} style={styles.row}>
                <Text style={styles.itemText}>
                    {item.count} x {item.pname} 
                </Text>
                <Text style={styles.itemText}>
                    {item.pprice} RON
                </Text>
            </Image>
        </TouchableHighlight>
      );
  },

//END OF COMPONENT
});
var imgs = {
    statusBar : require('../img/design/statusBar.png'),
    //background : require('../img/design/ceva.png'),
    background : require('../img/design/gradient-warmer.png'),
    actionsBar : require('../img/design/actions-bg.png'),
    lightRow : require('../img/design/light-row-bg.png'),
    darkRow : require('../img/design/dark-row-bg.png'),
};

var L_OFFSET = 5;
var ROW_WIDTH = 315; //TODO dynamic this

var styles = StyleSheet.create({
  center: {
    justifyContent:'center',
    alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor:'transparent'
  },
  order: {
    flex: 1,
  },
  products: {
      paddingLeft: 20,
      paddingBottom:10
  },
  actionItem : {
      fontSize: 16,
      color: 'white',
      fontFamily : 'Dosis-Book',
      //fontStyle: 'Bold'
  },
  actions : {
      height:40,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginLeft:L_OFFSET,
      paddingLeft:10,
      paddingRight:10,
      width:ROW_WIDTH,
  },
  itemText : {
      fontSize: 16,
      fontFamily: 'Dosis-Light',
      color:'#debdc2',
  },
  itemText : {
      fontSize: 16,
      fontFamily: 'Dosis-Light',
      color:'#debdc2',
  },
  row : {
      height:40,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginLeft:L_OFFSET,
      paddingLeft:10, 
      paddingRight:10, 
      width:ROW_WIDTH,
  },
  user : {
      height:80,
      alignItems:'center',
      justifyContent:'center'
  },
  userCaption :{
      fontSize:20,
      color:'#debdc2',
      fontFamily:'Dosis-light',
      textShadowColor: 'black',
      textShadowOffset:{width:0,height:1},
      textShadowRadius:3
  }
});
//dcffe7
module.exports = OrderDetails;
