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

  getState: function() {
      if(this.props.state)
          return this.props.state;
      else
          return this.state;
  },

  componentDidMount: function() {
    if (!this.getState().loaded) {
        this.fetchData();
    }
  },

  _requestUrl : function () {
      return `http://localhost:8000/restaurants/${this.getState().restId}/tables/${this.getState().tableId}/orders`
  },

  fetchData: function() {
    fetch(this._requestUrl())
    .then((response) => {
        console.log(response)
        return response.json();
    })
    .then((responseData) => {
        this.setState({
            dataSource: responseData
            ,loaded: true
        });
    })
    //.done();
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
               {!this.getState().loaded?this.renderLoadingView():this.renderView()}
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
      var data = this.getState().dataSource.segments.filter( x => x.user.id == this.getState().userId);
      var i = 2;
      return (
          <View style={styles.order}>
            {data.map(x => this.renderSegment(x))}
          </View>
      );
  },

  renderSegment: function(segment){
      var approved = xs => !xs.any(x=>x.status == "InList");
      
      var items = Enumerable
                    .from(segment.items)
                    .groupBy(x => x.product.id)
                    .select(x=>{return { prodId:x.key()
                                       ,count:x.count()
                                       ,pname:x.last().product.name
                                       ,pprice:numeral(x.count() * x.last().product.price.toFixed(4)).format('0.[00]')
                                       ,itemId:x.last().id
                                       ,approved:approved(x)
                                       };
                    }).toArray();
      return (
          <View key={segment.user.id}>
                {items.map((x,i) => this.renderProduct(x,segment.user,i))}
          </View>
      );
  },

  renderProduct: function(item,user,i){
     var imgSource = i%2!=0?imgs.darkRow:imgs.lightRow;
     return (
          <TouchableOpacity key={item.itemId} onPress={() => { 
            console.log(`s-a clickuit pe ${item.pname} + ${user.id}!`); 
            this.props.orderItemClicked(item,user);
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

  renderLoadingView: function() {
    return (
      <View style={[styles.container,{justifyContent:'center',alignItems:'stretch'}]}>
        <View style={[styles.head,styles.center]}>
            <Text>
                Loading order details...
            </Text>
        </View>
      </View>
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
