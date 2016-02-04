'use strict';

var React = require('react-native');


var Linq = require('linq');
var {merge,mapInPairs} = require('./common');
var SlideList = require('./Controls/slide-list');
var SlideButton = require('./Controls/slide-button');

var BlurView = require('react-native-blur').BlurView;
var VibrancyView = require('react-native-blur').VibrancyView;
var OrderLine = require('./order-line');
var Swiper = require('react-native-swiper')

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
        pageSize: 8,
        };
  },

  _productCounts : [],
  currentIndex: 0,
  
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
    //else return this.renderLoadedView();
    else return this.renderWithSwipe();
  },

  renderWithSwipe : function () {
      this.productCounts = this._countProducts();
      var currentPage = this.getState().currentPage
      var len = this.getState().dataSource.menu.length;
      var swiperHeight = this.getState().containerHeight - this.getState().headHeight;

      return (
          <View style={this.props.style}>
            <Swiper horizontal={false} loop={false} pagingEnabled={true} bounces={true} 
                scrollsToTop={true}  index={this.currentIndex} height={swiperHeight}
                renderPagination={(i,t,ctx) => {
                    //this.setState({currentPage:i});
                    //console.log(i + " " + a + " " + b  );
                    //console.log(b.state.index);
                    var index = ctx.state.index;
                    if(index != this.currentIndex)
                        {
                            console.log("am schimbat" + this.currentIndex + " cu " +  index);
                            this.currentIndex = index;
                        }
                }}
                >
                { 
                    Linq.range(0,(len/8-1) + (len%8>0?1:0)).select( x => {

                    return (
                        <View syle={styles.container} key={x}>
                            {this.renderPage(x,{style:[styles.pageContainer,{height:swiperHeight}]})}
                        </View>
                    );}).toArray()
                }
            </Swiper>
        </View>
      );
  },

  _countProducts : function() {
      var segment = Linq.from(this.getState().dataSource.segments).first(x => x.user.id == this.getState().userId);

      var ret = Linq.from(segment.items).groupBy(x => x.product.id).select(x=>{return {id:x.key(),count:x.count()}});
      return ret.toArray();
  },

  renderLoadedView: function() {
      var currentPage = this.getState().currentPage
      var props = 
          { 
            renderPrevPage      : ( ) => this.renderPage(currentPage - 1,{})
          , renderCurrentPage   : ( ) => this.renderPage(currentPage,{})
          , renderNextPage      : ( ) => this.renderPage(currentPage+1,{})
          , onScrolled          :  x  => {
            if(x!=0){
                setTimeout(()=> this.setState({currentPage: x < 0? currentPage -1 : currentPage+1}))
            }
            else {
                setTimeout(()=> this.setState({currentPage: currentPage}))
            }
                //this.setState({currentPage: x < 0? currentPage -1:currentPage+1});
            }
          };

          return (
            <View source={imgs.bgDomolitComplet} style={styles.container}>
                <SlideList {...props} />
            </View>
          );
  },

  renderPage: function(pageNo,props) {
    var pageSize = this.state.pageSize;
    var dataSource = this.getState().dataSource.menu;
    var text = `Page: ${pageNo}/${dataSource.length/pageSize}`;

    var some = (pageNo>=0?
                    Linq.from(dataSource).zip(Linq.range(0,dataSource.length-1),(a,b) => {return {item:a,pos:b};})
                    .skip(pageNo*pageSize)
                    .take(pageSize)
               :    Linq.empty()).toArray();
    if(some.length>0)
        return (
            <View {...props}>
                {
                    mapInPairs(some,(x,y,i) => this.renderProduct(x.item,y && y.item,i))
                }
            </View>
        );
    else
        return null;
  },

  renderProduct: function(p1,p2,i){

      var getCount = p => {
          console.log(this.productCounts);
          var pcount = Linq.from(this.productCounts).firstOrDefault( x => x.id == p.id);
          return pcount?pcount.count:0;
      };
      var props = {
          key        : i,
          //style      : [styles.listItem,styles.center],
          //renderMain : renderMainItem
          p1         : merge({count:getCount(p1)},p1),
          p2         : merge({count:getCount(p2)},p2),
          productClicked : this.props.productClicked,

          height     : -1.5 + (this.getState().containerHeight - this.getState().headHeight) / (this.state.pageSize/2)
      };

      return (
            <OrderLine {...props}/>
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
   container: {
       //flex: 1,
    //marginTop:-10,
    //height:400,
    //width:320,
    //flexDirection: 'row',
    //justifyContent: 'space-around',
    //alignItems: 'center',
    //backgroundColor: '#dcffe7',
    //flexWrap:'nowrap',
       backgroundColor:'green',
   },
   pageContainer: {
       //flex:1,
       //height:100,
       //flexDirection:'column',
       justifyContent: 'space-around',
       //backgroundColor:'',
       //paddingTop:2,
       overflow:'hidden'
   }
 });
//dcffe7
module.exports = OrderMenu;
