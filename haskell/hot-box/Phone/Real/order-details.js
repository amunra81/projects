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
        loaded: false
        };
  },

  render: function() {
      return (
          <View {...without("state",this.props)}>
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
            <Text style={styles.userCaption}>Bogdan Manole</Text>
        </View>
        <Image style={[styles.actions]} source={imgs.actionsBar}>
            <Text style={styles.actionItem}> { '> Call the Waiter <' } </Text>
            <Text style={styles.actionItem}> { '> Check please <' } </Text>
        </Image>
        </View>
      );
  },

  renderGeneralAction: function (text,name,onPress){
      return (
            <View name={name} style={{flex:1,alignItems:'center'}}>
                <TouchableOpacity onPress={onPress}>
                    <Text> {text} </Text>
                </TouchableOpacity>
            </View>
      );
  },

  renderActions: function() {
      return (
          <View style={[styles.actions,styles.center]}>
              {this.renderGeneralAction('[Approve]','approve',this.props.onApprove)}
              {this.renderGeneralAction('[Waiter]','approve',this.props.onWaiterRequest)}
              {this.renderGeneralAction('[Check please]','approve',this.props.onCheckRequest)}
          </View>
      );
  },

  renderBody: function() {
      var data = this.props.ds.filter( x => x.userId == this.props.userId);
      return (
          <View style={styles.order}>
              {this.renderSegment(data[0])}
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
          <TouchableOpacity key={item.itemId} onPress={() => { 
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
        </TouchableOpacity>
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
    //flexDirection: 'column',
    //justifyContent: 'space-around',
    //alignItems: 'center',
    //flexWrap:'nowrap',
    //paddingTop:20,
    //position:'relative',
    backgroundColor:'transparent'
  },
  order: {
    flex: 1,
    //backgroundColor: '#ffe7dc',
    //backgroundColor: '#eeeeef',
    //backgroundColor: '#ebebf2',
    //backgroundColor: '#eaeaf3',
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
