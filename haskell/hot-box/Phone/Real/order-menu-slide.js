'use strict';

var React = require('react-native');


var Linq = require('linq');
var {merge} = require('./common');
var SlideList = require('./Controls/slide-list');
var SlideButton = require('./Controls/slide-button');

var BlurView = require('react-native-blur').BlurView;
var VibrancyView = require('react-native-blur').VibrancyView;

var {
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
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
        return merge(this.state,this.props.state);
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
            renderPrevPage      : ( ) => this.renderPage(currentPage - 1,{})
          , renderCurrentPage   : ( ) => this.renderPage(currentPage,{})
          , renderNextPage      : ( ) => this.renderPage(currentPage+1,{})
          , onScrolled          :  x  => {
              if(x!=0)
                setTimeout(()=> this.setState({currentPage: x < 0? currentPage -1:currentPage+1}))
                //this.setState({currentPage: x < 0? currentPage -1:currentPage+1});
            }
          };

          return (
            <View source={imgs.bgDomolitComplet} style={styles.container}>
                <SlideList {...props} />
            </View>);
  },

  renderPage: function(pageNo,props) {
    var pageSize = 12;
    var dataSource = this.getState().dataSource.menu;
    var text = `Page: ${pageNo}/${dataSource.length/pageSize}`;

    var some = (pageNo>=0?
                    Linq.from(dataSource).zip(Linq.range(0,dataSource.length-1),(a,b) => {return {item:a,pos:b};})
                    .skip(pageNo*pageSize)
                    .take(pageSize)
               :    Linq.empty()).toArray();
    if(some.length>0)
        return (
            <View style={styles.container} {...props}>
                {
                    this.mapInPairs(some,(x,y) => this.renderProduct(x.item,y && y.item))
                }
            </View>
        );
    else
        return null;
  },

  mapInPairs: function(ar,render) {
      if(ar.length == 0)
          return [];
      else {
          var head = [render(ar[0],ar.length>1 && ar[1])];
          var tail = ar.length<=2?[]:this.mapInPairs(ar.slice(2,ar.length),render);

          return head.concat(tail); 
      }
  },

  renderProduct: function(p1,p2){
          //<BlurView blurType="xlight" style={styles.containerBlur}>
        //</BlurView>
      var renderMainItem  = () => {
        return (
            <TouchableOpacity onPress={() => { 
            console.log(`s-a clickuit pe ${product.name}!`); 
            this.props.productClicked(p1);
            }}>
                <View style={styles.containerBlur}>
                    <Text style={{color:'black'}}>
                        {p1.name + " - " }
                    </Text>
                    <Text>
                        {p2 && p2.name}
                    </Text>
                </View>
            </TouchableOpacity>
      );};

      var props = {
          key        : p1.id,
          style      : [styles.listItem,styles.center],
          renderMain : renderMainItem
      };

      return (
            <SlideButton {...props}/>
      );
  },

  renderProductClassic: function(product){
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

var imgs = {
    bg : require("../img/design/Bottom/bg.png"),
    bgDomolit : require("../img/design/Bottom/bg-domolit.png"),
    bgComplet : require("../img/design/Bottom/bg-complet.png"),
    //bgDomolitComplet : require("../img/design/Bottom/bg-domolit-complet.png"),
}

var styles = StyleSheet.create({
  center: {
    justifyContent:'center',
    alignItems:'center',
  },
  container: {
    flex: 1,
    //marginTop:-10,
    //height:400,
    //width:320,
    //flexDirection: 'row',
    justifyContent: 'space-around',
    //alignItems: 'center',
    //backgroundColor: '#dcffe7',
    //flexWrap:'nowrap',
    backgroundColor:'transparent'
  },
  containerBlur: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    //backgroundColor: 'transparent',
    height:75,
    width:320,
    backgroundColor: '#EFF9F9'
  },
  listItem: {
    //marginTop:5,
    //marginBottom:15,
    //backgroundColor: '##EFF9F9'
  }
});
//dcffe7
module.exports = OrderMenu;
