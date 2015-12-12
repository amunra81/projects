'use strict';

var React = require('react-native');
var Enumerable = require('linq');
var Comments = require('./comment');

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
       if(this.props.state)
            return this.props.state
        else
            return { 
                restId : this.props.restId,
                tableId : this.props.tableId,
                dataSource : null,
                loaded: false
             };
  },

  componentWillMount: function() {
      //this.fetchData();
  },
  componentDidMount: function() {
    if (!this.state.loaded) {
        this.fetchData();
    }
  },

  _requestUrl : function () {
      return `http://localhost:8000/restaurants/${this.state.restId}/tables/${this.state.tableId}/orders`
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
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    else return this.renderLoadedView();
  },

  renderLoadedView: function() {
    return (
        <View style={styles.container}>
            {this.renderHead()}
            {this.renderActions()}
            {this.renderBody()}
        </View>
    );
  },

  _firstOrder: function() {
      return this.state.dataSource[0];
  },

  renderHead: function() {
      return (
          <View style={[styles.head,styles.center]}>
              <Text>
                  HEAD
              </Text>
          </View>
      );
  },

  renderActions: function() {
      return (
          <View style={[styles.actions,styles.center]}>
              <Text>ACTIONS</Text>
          </View>
      );
  },

  renderBody: function() {
      var data = this._firstOrder().userOrders;
      var i = 2;
      return (
          <View style={styles.order}>
            {data.map(x => this.renderUserOrder(x))}
          </View>
      );
  },

  renderUserOrder: function(userOrder){
      return (
          <View>
            <View name="laba">
                <Text>User {userOrder.user.id}</Text>
            </View>
            <View testID="products" style={styles.products}>
                {userOrder.products.map(x => this.renderProduct(x))}
            </View>
          </View>
      );
  },

  renderProduct: function(product){
      return (
          <Text> - {product.name}</Text>
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
    flex: 0.7,
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
