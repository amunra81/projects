'use strict';

var React = require('react-native');

var {merge,mapInPairs} = require('./common');

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
  _productCounts : [],
  currentIndex: 0,
  
  getInitialState: function() {
      return {
          openedProdId : 0,
      }
  },

  render: function() {
    var props = {
        horizontal        : false,
        loop              : false,
        bounces           : true,
        pagingEnabled     : true,
        scrollsToTop      : true,
        index             : this.currentIndex,
        height            : this.props.containerHeight - this.props.headHeight,
        renderPagination  : this._paginationRender
    };

    return (
    <View style={this.props.style}>
        <Swiper {...props}>
            { this.props.ds.slice(0).map(x => this.renderPage(x)) }
        </Swiper>
    </View>
    )
  },

  _paginationRender: function (i,t,ctx) {
    var index = ctx.state.index;
    if(index != this.currentIndex) {
        console.log("am schimbat" + this.currentIndex + " cu " +  index);
        this.currentIndex = index;
    }
  },


  renderPage: function(page) {
    var swiperHeight = this.props.containerHeight - this.props.headHeight;
    var pageSize = 8;

    if(page && page.data.length>0)
        return (
        <View syle={styles.container} key={page.index}>
            <View style={[styles.pageContainer,{height:swiperHeight}]}>
                {
                    mapInPairs(page.data,(x,y,i) => this.renderProduct(x,y,i))
                }
            </View>
        </View>
        );
    else
        return null;
  },

  renderProduct: function(p1,p2,i){
      var props = {
          key        : i,
          //style      : [styles.listItem,styles.center],
          //renderMain : renderMainItem
          p1         : p1,
          p2         : p2,
          productClicked : this.props.productClicked,

          height     : -1.5 + (this.props.containerHeight - this.props.headHeight) / (8/2),
          openedProdId: this.state.openedProdId,
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
