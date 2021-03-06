'use strict';

var React = require('react-native');
var Enumerable = require('linq');
var SlideList = require('./Controls/slide-list');

var {
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var HeadContainer = View;

var OrderMenu = React.createClass({
  //mandatory
  getInitialState: function() {
    var ls = this._toListDataSource();
    return { 
        restId : this.props.restId,
        tableId : this.props.tableId,
        dataSource : ls,
        loaded: false
        };
  },

  getState: function() {
      if(this.props.state){
        var ls = this._toListDataSource();
        var {dataSource,...other} = this.props.state;
        return {dataSource : ls.cloneWithRows(dataSource.menu),...other};
      }
      else
          return this.state;
  },

  componentDidMount: function() {
    if (!this.getState().loaded) {
        this.fetchData();
    }
  },

  _requestUrl : function () {
      return `http://localhost:8000/restaurants/${this.getState().restId}/tables/${this.getState().tableId}/orders/current`
  },

  fetchData: function() {
    fetch(this._requestUrl())
    .then((response) => {
        console.log(response)
        return response.json();
    })
    .then((responseData) => {
        this.setState({
            dataSource: this.getState().dataSource.cloneWithRows(responseData.menu)
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
      var i = 5;
      return (
            <ListView style={[styles.container]} 
                dataSource={this.getState().dataSource}
                renderRow={this.renderProduct}>
            </ListView>
    );
  },

  renderProduct: function(product){
      return (
          <TouchableHighlight key={product.id} onPress={() => { 
            console.log(`s-a clickuit pe ${product.name}!`); 
            this.props.productClicked(product);
          }}>
          <View  style={[styles.listItem,styles.center]}>
                <Text>
                    {product.name}
                </Text>
            </View>
        </TouchableHighlight>
      );
  },

  _toListDataSource: function() {
     return  new ListView.DataSource({
                        rowHasChanged: function (row1, row2) { 
                            return row1 !== row2 
                        },
      });
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
    height:468,
    //flexDirection: 'row',
    //justifyContent: 'space-around',
    //alignItems: 'center',
    backgroundColor: '#dcffe7',
    //flexWrap:'nowrap',
    position:'relative',
  },
  listItem: {
    marginTop:10,
    marginBottom:10,
    backgroundColor: '#a9ffc4'
  }
});
//dcffe7
module.exports = OrderMenu;
