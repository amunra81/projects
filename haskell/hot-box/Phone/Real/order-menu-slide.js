'use strict';

var React = require('react-native');
var Linq = require('linq');
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
    return { 
        restId : this.props.restId,
        tableId : this.props.tableId,
        dataSource : null,
        loaded: false ,
        //only on state
        currentPage: 0,
        };
  },

  getState: function() {
      if(this.props.state){
        var ls = this._toListDataSource();
        return this._merge(this.state,this.props.state);
      }
      else
          return this.state;
  },

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param fromObj
 * @param finalObj
 * @returns obj3 a new object based on fromObj and finalObj 
 */
  _merge: function (fromObj,finalObj){
    var obj3 = {};
    for (var attrname in fromObj) { obj3[attrname] = fromObj[attrname]; }
    for (var attrname in finalObj) { obj3[attrname] = finalObj[attrname]; }
    return obj3;
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
    .done();
  },

  render: function() {
    if (!this.getState().loaded) {
      return this.renderLoadingView();
    }
    else return this.renderLoadedView();
  },

  renderLoadedView: function() {
      var currentPage = this.getState().currentPage
      var props = 
          { 
            renderPrevPage      : () => this.renderPage(currentPage - 1,{})
          , renderCurrentPage   : () => this.renderPage(currentPage,{})
          , renderNextPage      : () => this.renderPage(currentPage+1,{})
          , onScrolled          : x =>  {
              if(x!=0)
                //setTimeout(()=> this.setState({currentPage: x < 0? currentPage -1:currentPage+1}))
                this.setState({currentPage: x < 0? currentPage -1:currentPage+1});
          }
          };
      return (<SlideList {...props} />);
  },

  renderPage: function(pageNo,props) {
    var pageSize = 10;
    var dataSource = this.getState().dataSource.menu;
    var text = `Page: ${pageNo}/${dataSource.length/pageSize}`;

    var some = (pageNo>=0?
                    Linq.from(dataSource).zip(Linq.range(0,dataSource.length-1),(a,b) => {return {item:a,pos:b};})
                    .skip(pageNo*pageSize)
                    .take(pageSize)
               :    Linq.empty()).toArray();
    if(some.length>0)
        //<Text key="ss">{text}</Text>
        return (
            <View style={styles.container} {...props}>
                { some.map(x => this.renderProduct(x.item))}
            </View>
        );
    else
        return null;
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
    marginTop:15,
    marginBottom:15,
    backgroundColor: '#a9ffc4'
  }
});
//dcffe7
module.exports = OrderMenu;
