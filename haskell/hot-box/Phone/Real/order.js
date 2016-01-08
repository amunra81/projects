
'use strict';

var React = require('react-native');
var Enumerable = require('linq');
var OrderDetails = require('./order-details');
var OrderMenu = require('./order-menu');
var Display = require('react-native-device-display');

var {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
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
                loaded: false,
                topHeight:100,
                opened:false,
             };
  },

  componentDidMount: function() {
      LayoutAnimation.linear();
      this.fetchData(this._withAction().currentOrder());
  },

  _currentOrderUrl: function() {
      return `http://localhost:8000/restaurants/${this.state.restId}/tables/${this.state.tableId}/orders/current`;
  },

  _withAction : function() { return { 
      currentOrder : () => 
        [ this._currentOrderUrl() , "GET"]
      
      , addItem :  (prodId) => 
        [ this._currentOrderUrl() + `/users/${this.state.userId}/items/${prodId}` , "POST"]

      , removeItem : (itemId,userId) =>
        [ this._currentOrderUrl() + `/users/${userId}/items/${itemId}` , "DELETE"]

      , approveItems : () =>
        [ this._currentOrderUrl() + `/users/${this.state.userId}/items/approved` , "POST"]
  };},

  fetchData: function(action) {
        var url = action[0];
        var args = {method:action[1]};
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

  _orderItemClicked: function(item,user){
    console.log(`a sarit pana sus cu ${item.itemId} si ${user.id}`);
    this.fetchData(this._withAction().removeItem(item.itemId,user.id));
  },

  productSelected: function(prod){
    console.log(`a sarit pana sus cu ${prod.name}`);
    this.fetchData(this._withAction().addItem(prod.id));
  },

  _onDetailsExpand: function(){
      this._onDetailsColapseToogle(0);
  },

  _onDetailsColapse: function(){
      this._onDetailsColapseToogle(0);
  },

  _onDetailsColapseToogle: function(x)
  {
      LayoutAnimation.spring();
      var opened = this.state.opened;
      this.setState({topHeight:opened?100-x:368
                    ,opened:!opened});
  },

  _onApprove : function()
  {
    this.fetchData(this._withAction().approveItems());
    console.log('Approved');
  },

  _onPay : function()
  {
      console.log('Payed');
  },

  renderLoadedView: function() {
    //var { dataSource, ...otherState } = this.state;
    //var { menu,restId,tableId,...orderDetails} = dataSource
      
    // Props for inner children
    var orderMenuProps = {
          productClicked    : this.productSelected  
        , state             : this.state
    };

    var orderDetailsProps = {
          orderItemClicked  : this._orderItemClicked  
        , onExpand          : this._onDetailsExpand
        , onColapse         : this._onDetailsColapse
        , state             : this.state
        , onApprove         : this._onApprove
        , onPay             : this._onPay
    };

    //render children
    return (
        <View style={styles.container}>
            <View name="top" style={{height:this.state.topHeight}}>
                <OrderDetails {...orderDetailsProps}/>
            </View>
            <View name="bottom" style={{flex:1}}>
                <OrderMenu {...orderMenuProps}/>
            </View>
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
