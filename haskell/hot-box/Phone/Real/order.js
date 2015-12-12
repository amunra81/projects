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

var OrderView = React.createClass({
  //mandatory
  getInitialState: function() {
      return { 
                restId : this.props.restId,
                tableId : this.props.tableId,
                dataSource : null,
                loaded: false
             };
  },

  componentDidMount: function() {
    this.fetchData();
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
          <View style={styles.border}>
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
      <View >
        <Text>
          Loading order...
        </Text>
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
  border: {
    flex: 1,
    backgroundColor: '#ffe7dc',
  },
  products: {
      paddingLeft: 20,
      paddingBottom:10
  }
});

module.exports = OrderView;
