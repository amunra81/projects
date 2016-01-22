'use strict';

var React = require('react-native');
var Enumerable = require('linq');
var {merge,without} = require('./common');
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
              {!this.getState().loaded?this.renderLoadingView():this.renderView()}
          </View>
      );
  },

  renderView: function() {
    return (
        <View style={styles.container}>
            {this.renderActions()}
            {this.renderBody()}
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
              {this.renderGeneralAction('[Pay]','approve',this.props.onPay)}
          </View>
      );
  },

  renderBody: function() {
      var data = this.getState().dataSource.segments;
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
                                       ,itemId:x.last().id
                                       ,approved:approved(x)
                                       };
                    }).toArray();
      return (
          <View key={segment.user.id}>
            <View name="laba">
                <Text>User {segment.user.id}</Text>
            </View>
            <View testID="products" style={styles.products}>
                {items.map(x => this.renderProduct(x,segment.user))}
            </View>
          </View>
      );
  },

  renderProduct: function(item,user){
      return (
          <TouchableOpacity key={item.itemId} onPress={() => { 
            console.log(`s-a clickuit pe ${item.pname} + ${user.id}!`); 
            this.props.orderItemClicked(item,user);
          }}>
          <Text style={{color:item.approved?'black':'gray'}}>
              {item.count}...... {item.pname} 
          </Text>
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
  },
  actions: {
    justifyContent: 'space-between',
    //alignItems: 'stretch',
    flexDirection: 'row',
    //flex: 1,
    height:30,
    backgroundColor: '#fff9dc',
  },
  order: {
    flex: 1,
    //backgroundColor: '#ffe7dc',
    backgroundColor: '#eeeeef',
    backgroundColor: '#ebebf2',
    backgroundColor: '#eaeaf3',
  },
  products: {
      paddingLeft: 20,
      paddingBottom:10
  }
});
//dcffe7
module.exports = OrderDetails;
