'use strict';

var React = require('react-native');
var Enumerable = require('linq');
var Comments = require('./comment');

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
    var ls = this.toListDataSource();
    if(this.props.state){
        var {dataSource,...other} = this.props.state;
        return {dataSource : ls.cloneWithRows(dataSource[0].menu),...other};
    }
    else
        return { 
            restId : this.props.restId,
            tableId : this.props.tableId,
            dataSource : ls,
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
            dataSource: this.state.dataSource.cloneWithRows(responseData[0].menu)
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
      var i = 5;
    return (
        <ListView 
            style={styles.container} 
            dataSource={this.state.dataSource}
            renderRow={this.renderProduct}>
        </ListView>
    );
  },

  renderProduct: function(product){
      return (
        <TouchableHighlight onPress={() => console.log(`s-a clikuit pe ${product.name}!`) }>
          <View style={[styles.listItem,styles.center]}>
              <Text>
                  {product.name}
              </Text>
          </View>
        </TouchableHighlight>
      );
  },

  toListDataSource: function() {
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
    //flexDirection: 'row',
    //justifyContent: 'space-around',
    //alignItems: 'center',
    backgroundColor: '#dcffe7',
    //flexWrap:'nowrap',
    position:'relative',
  },
  listItem: {
    marginTop:10,
    backgroundColor: '#a9ffc4'
  }
});
//dcffe7
module.exports = OrderMenu;
