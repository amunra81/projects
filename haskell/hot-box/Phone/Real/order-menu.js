
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

var OrderMenu = React.createClass({
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
        </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={[styles.container,{justifyContent:'center',alignItems:'stretch'}]}>
        <View style={[styles.head,styles.center]}>
            <Text>
                Loading menu...
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
    backgroundColor: '#dcffe7',
    //flexWrap:'nowrap',
    position:'relative',
  },
});
//dcffe7
module.exports = OrderMenu;
