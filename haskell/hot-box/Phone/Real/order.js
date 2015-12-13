
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
    var { dataSource, ...otherState } = this.state;
    var { menu,restId,tableId,...orderDetails} = dataSource
    
    return (
        <View style={styles.container}>
            <OrderDetails state={this.state}/>
            <OrderMenu state={this.state}/>
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
