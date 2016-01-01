
'use strict';

var React = require('react-native');
var Enumerable = require('linq');
var OrderDetails = require('./order-details');
var OrderMenu = require('./order-menu');

var {
  StyleSheet,
  Text,
  View,
} = React;

var HeadContainer = View;

var Order = React.createClass({
    getInitialState: function() {
        if(this.props.state)
            return this.props.state
        else
            return { 
                restId : this.props.restId,
                tableId : this.props.tableId,
                userId : this.props.userId,
                refreshed: 0,
                dataSource : null,
                loaded: false
             };
  },

  componentDidMount: function() {
      this.fetchData();
  },

  _requestUrl : function (id,userId) {
    var _userId = userId?userId:this.state.userId;
    if(!id)
        return `http://localhost:8000/restaurants/${this.state.restId}/tables/${this.state.tableId}/orders/current`
    else
        return `http://localhost:8000/restaurants/${this.state.restId}/tables/${this.state.tableId}/orders/current/users/${_userId}/items/${id}`;
  },

  fetchData: function(id,userId) {
        var url = this._requestUrl(id,userId);
        var args = {method:!id?'GET':!userId?'POST':'DELETE'};
        console.log(`calling API: url: [${url}] , args: [${JSON.stringify(args)}]`);
        fetch(url,args)
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((responseData) => {
            this.setState({
                dataSource: responseData
                ,loaded: true
                ,refreshed: this.state.refreshed+1
            });
        })
        .then(() => {
            console.log(this.state.refreshed);
        })
        .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    else return this.renderLoadedView();
  },

  orderItemClicked: function(orderItem,user){
    console.log(`a sarit pana sus cu ${orderItem.id} si ${user.id}`);
    this.fetchData(orderItem.id,user.id);
  },

  productSelected: function(prod){
    console.log(`a sarit pana sus cu ${prod.name}`);
    this.fetchData(prod.id);
  },

  renderLoadedView: function() {
    var { dataSource, ...otherState } = this.state;
    var { menu,restId,tableId,...orderDetails} = dataSource
    
    return (
        <View style={styles.container}>
            <View style={{paddingLeft:this.state.refreshed}}><Text>{this.state.refreshed}</Text></View>
            <OrderDetails state={this.state} orderItemClicked={ this.orderItemClicked } />
            <OrderMenu state={this.state} productClicked={ this.productSelected }/>
        </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={[styles.container,{justifyContent:'center',alignItems:'stretch'}]}>
        <View style={[styles.head,styles.center]}>
            <Text>
                Loading order...
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
    flexDirection: 'column',
    //justifyContent: 'space-around',
    //alignItems: 'center',
    backgroundColor: '#dcf4ff',
    //flexWrap:'nowrap',
    //paddingTop:20,
    position:'relative',
  },
});

//dcffe7
module.exports = Order;
