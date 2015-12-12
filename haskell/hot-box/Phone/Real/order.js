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
          <View style={styles.head}>
              <Text>
                  RestId: {this._firstOrder().restId}
              </Text>
              <Text>
                  TableId: {this._firstOrder().tableId}
              </Text>
              <Text>
                  OrderId: {this._firstOrder().id}
              </Text>
          </View>
      );
  },

  renderActions: function() {
      return (
          <View style={styles.actions}>
              <Text>ACTIONS</Text>
          </View>
      );
  },
  renderBody: function() {
      var a = Enumerable.from(this._firstOrder().userOrders);
      var i = 2;
      return (
          <View style={styles.border}>
            <Text>Comanda</Text>
            {a.select(x => this.renderUserOrder(x)).toArray()}
          </View>
      );
  },

  renderUserOrder: function(userOrder){
      return (
          <View >
            <Text>User {userOrder.user.id}</Text>
          </View>
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
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    //alignItems: 'flex-end',
    backgroundColor: '#dcf4ff',
    //flexWrap:'nowrap',
    padding:20,
  },
  head: {
    backgroundColor: '#f9dcff',
  },
  actions: {
    backgroundColor: '#fff9dc',
  },
  border: {
    backgroundColor: '#ffe7dc',
  },
});

module.exports = OrderView;
