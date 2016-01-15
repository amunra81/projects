'use strict';

var React = require('react-native');
var SlideList = require('../Real/Controls/slide-list');
var Linq = require('linq');
//coanst UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({

  _currentOrderUrl: function() {
      return `http://excuse.ro:8000/restaurants/1/tables/1/orders/current`;
  },

  getInitialState: function() {
      return  {
          dataSource:null,
          loaded:false,
          currentPage:0,
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
      var currentPage = this.state.currentPage
      var props = 
          { dataSource      : this.state.dataSource
          , renderItem      : this.renderMenuItem 
          , getItemKey      :  x => x.id
          , renderPrevPage      : () => this.renderPage(currentPage - 1,{})
          , renderCurrentPage   : () => this.renderPage(currentPage,{})
          , renderNextPage      : () => this.renderPage(currentPage+1,{})
          };
      return (<SlideList {...props} />);
  },

  renderPage: function(pageNo,props)
  {
    var extraProps = {pageNo:pageNo,...props};

    var text = `Page: ${pageNo}`;
    var pageSize = 5;
    var dataSource = this.state.dataSource;

    var some = (pageNo>=0?
                    Linq.from(dataSource).zip(Linq.range(0,dataSource.length-1),(a,b) => {return {item:a,pos:b};})
                    .skip(pageNo*pageSize)
                    .take(pageSize)
               :    Linq.empty()).toArray();

    return (
        <View {...extraProps}>
            <Text key="ss">{text}</Text>
            { some.map(this.renderMenuItem)}
        </View>
    );
  },

  renderMenuItem: function (item) {
      return <Text key={item.item.id}>{item.item.name}</Text>;
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


