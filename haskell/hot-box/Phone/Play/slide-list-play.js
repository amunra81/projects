'use strict';

var React = require('react-native');
var SlideList = require('../Real/Controls/slide-list');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({

  _currentOrderUrl: function() {
      return `http://localhost:8000/restaurants/1/tables/1/orders/current`;
  },

  getInitialState: function() {
      return  {
          dataSource:null,
          loaded:false
      };
  },

  fetchData: function() {
        var url = this._currentOrderUrl();
        var args = "GET";
        console.log(`calling API: url: [${url}] , args: [${JSON.stringify(args)}]`);
        fetch(url,args)
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((responseData) => {
            this.setState({
                dataSource: responseData.menu
                ,loaded: true
                ,refreshed: this.state.refreshed+1
            });
        })
        .done();
  },

  componentDidMount: function() {
      this.fetchData();
  },

  render: function() {
      if(!this.state.loaded)
          return this.renderLoading();
      else
          return this.renderLoaded();
  },
  renderLoading:function () {
      return (<View style={styles.container}><Text> Loading .... </Text></View>);
  },
  renderLoaded:function () {
      var props = 
          { dataSource      : this.state.dataSource
          , renderItem      : this.renderMenuItem 
          , getItemKey      :  x => x.id
          , pageSize        :  5
          };
      return (<SlideList {...props} />);
  },

  renderMenuItem: function (menuItem) {
      return <Text>{menuItem.name}</Text>;
  }

});

var styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        justifyContent: 'center',
        flex:1,
        alignItems:'center'
    }
});


