'use strict';

var React = require('react-native');
var Enumerable = require('linq');
var Comments = require('./comment');
var Display = require('react-native-device-display');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Comment
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
    if (!this.getState().loaded) {
      return this.renderLoadingView();
    }
    else return this.renderLoadedView();
  },

  renderLoadedView: function() {
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => { 
                this.props.onColapse();
            }}>
                <View>
                {this.renderHead()}
                {this.renderActions()}
                </View>
            </TouchableHighlight>
            {this.renderBody()}
        </View>
    );
  },


  renderHead: function() {
      return (
            <View style={[styles.head,styles.center]}>
                <Text>
                    HEAD + {this.getState().refreshed}
                </Text>
            </View>
      );
  },

  renderActions: function() {
      var width = Display.width;
      var height = Display.height;
      return (
            <View style={[styles.actions,styles.center]}>
                <Text>ACTIONS + W:{width} + H:{height}</Text>
            </View>
      );
  },

  renderBody: function() {
      var data = this.getState().dataSource.userOrders;
      var i = 2;
      return (
          <View style={styles.order}>
            {data.map(x => this.renderUserOrder(x))}
          </View>
      );
  },

  renderUserOrder: function(userOrder){
      var items = Enumerable
                    .from(userOrder.items)
                    .groupBy(x => x.product.id)
                    .select(x=>{return { prodId:x.key()
                                       ,count:x.count()
                                       ,pname:x.last().product.name
                                       ,itemId:x.last().id};
                    }).toArray();
      return (
          <View key={userOrder.user.id}>
            <View name="laba">
                <Text>User {userOrder.user.id}</Text>
            </View>
            <View testID="products" style={styles.products}>
                {items.map(x => this.renderProduct(x,userOrder.user))}
            </View>
          </View>
      );
  },

  renderProduct: function(item,user){
      return (
          <TouchableHighlight key={item.itemId} onPress={() => { 
            console.log(`s-a clickuit pe ${item.pname} + ${user.id}!`); 
            this.props.orderItemClicked(item,user);
          }}>
          <Text>{item.count}...... {item.pname}</Text>
        </TouchableHighlight>
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
    //flex: 1,
    flexDirection: 'column',
    //justifyContent: 'space-around',
    //alignItems: 'center',
    backgroundColor: '#dcf4ff',
    //flexWrap:'nowrap',
    paddingTop:20,
    position:'relative',
  },
  head: {
    //flex:1,
    backgroundColor: '#f9dcff',
    height:50,
    //minHeight:100,
    //maxHeight:100,
  },
  actions: {
    //flex: 1,
    height:30,
    backgroundColor: '#fff9dc',
  },
  order: {
    flex: 1,
    backgroundColor: '#ffe7dc',
  },
  products: {
      paddingLeft: 20,
      paddingBottom:10
  }
});
//dcffe7
module.exports = OrderDetails;
