
'use strict';

var React = require('react-native');
var Enumerable = require('linq');
var OrderDetails = require('./order-details');
var OrderMenu = require('./order-menu-classic');
var OrderMenuSlide = require('./order-menu-slide');
var OrderHead = require('./order-head');
//var Display = require('react-native-device-display');

var {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  PanResponder,
  Animated,
} = React;

var ServerAddress = "excuse.ro";

var Order = React.createClass({
    getInitialState: function() {
        if(this.props.state)
            return this.props.state;
        else
            return { 
                restId : this.props.restId,
                tableId : this.props.tableId,
                userId : this.props.userId,
                refreshed: 0,
                dataSource : null,
                loaded: false,
                containerHeight:-1,
                headHeight:-1,
                contentTop : new Animated.Value(0),
             };
    },

    //FIELDS
    _topViewStyle: {style: {height:100}},
    _topView: (null : ?{ setNativeProps(props: Object): void }),
    _topOpened: false,
    _oldGestureY: 0,
    _moveDirection : 0,
    _expanedWidth: 500,
    _colapsedWidth: 100,
    _highlightWidth: 50,

    componentWillMount: function() {
        this._bottomResponder = this._getResponder(()=>this._topOpened);
        this._topResponder = this._getResponder((()=>!this._topOpened));
    },

    componentDidMount: function() {
        //LayoutAnimation.linear();
        this.fetchData(this._withAction().currentOrder());
    },

    _currentOrderUrl: function() {
        return `http://${ServerAddress}:8000/restaurants/${this.state.restId}/tables/${this.state.tableId}/orders/current`;
    },

  fetchData: function(action) {
        var url = action[0];
        var args = {method:action[1]};
        console.log(`calling API: url: [${url}] , args: [${JSON.stringify(args)}]`);
        fetch(url,args)
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((responseData) => {
            this.setState({
                dataSource: responseData
                ,loaded: true
                ,refreshed: this.state.refreshed+1
            });
        })
        .done();
  },

  _orderItemClicked: function(item,user){
    console.log(`a sarit pana sus cu ${item.itemId} si ${user.id}`);
    this.fetchData(this._withAction().removeItem(item.itemId,user.id));
  },

  _onProductSelected: function(prod){
    console.log(`a sarit pana sus cu ${prod.name}`);
    this.fetchData(this._withAction().addItem(prod.id));
  },
  
  _onDetailsExpand: function(){
      LayoutAnimation.spring();
      this._topViewStyle.style.height = this._expanedWidth;
      this._topView.setNativeProps(this._topViewStyle);
      this._topOpened = true;
  },

  _onDetailsColapse: function(){
      LayoutAnimation.spring();
      this._topViewStyle.style.height = this._colapsedWidth;
      this._topView.setNativeProps(this._topViewStyle);
      this._topOpened = false;
  },

  _onDetailsColapseToogle: function(x) {
      LayoutAnimation.spring();
      var opened = this._topOpened;

      this._topViewStyle.style.height = opened?this._colapsedWidth-x:this._expanedWidth;
      this._topView.setNativeProps(this._topViewStyle);
      this._topOpened = !opened
  },

  _onApprove : function() {
    this.fetchData(this._withAction().approveItems());
    console.log('Approved');
  },

  _onPay : function() {
      console.log('Payed');
  },

  render: function() {
      var properView = !this.state.loaded?this.renderLoadingView():this.renderView();
      return (
        <View style={styles.container} onLayout={this._onContainerLayout}>
            {properView}
        </View>
      );
  },

  renderView: function() {
    // Props for inner children
    var contentHeight = this.state.containerHeight-this.state.headHeight;

    var orderMenuProps = {
          productClicked    : this._onProductSelected  
        , state             : this.state
    };

    var orderDetailsProps = {
          orderItemClicked  : this._orderItemClicked  
        , state             : this.state
        , onApprove         : this._onApprove
        , onPay             : this._onPay
        , style             : {height:contentHeight}
    };

    var orderHeadProps = {
          state             : this.state
        , onExpand          : () => this._onDetailsColapseToogle(0)
        , onColapse         : () => this._onDetailsColapseToogle(0)
        , onLayout           : this._onHeadLayout 
        , style             : [{height:this.state.containerHeight-this.state.headHeight}]
        ,...this._topResponder.panHandlers
    };

            //<View name="top" ref={x=>this._topView = x} {...this._topViewStyle} 
                //{...this._topResponder.panHandlers} >
            //</View>
            //<View name="bottom" style={{flex:1}} {...this._bottomResponder.panHandlers}>
            //</View>
    //render children
    return (
        <View ref={x => this._topView = x} >
            <OrderDetails   {...orderDetailsProps } />
            <OrderHead      {...orderHeadProps    } />
            <OrderMenuSlide {...orderMenuProps    } />
        </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View>
          <OrderHead state={this.state} onLayout={this._onHeadLayout}/>
          <View style={{flex:1}} >
              <Text>
                  Loading order...
              </Text>
          </View>
      </View>
    );
  }, 

  _onHeadLayout: function(event) {
      var newHeight = event.nativeEvent.layout.height;
      var oldHeight = this.state.containerHeight
      console.log(`_onHeadLayout (new height:${newHeight}) (old height:${oldHeight})`);
      if(oldHeight != newHeight)
          this.setState({headHeight:newHeight});
  },

  _onContainerLayout: function(event) {
      var newHeight = event.nativeEvent.layout.height;
      var oldHeight = this.state.containerHeight
      console.log(`_onContainerLayout (new height:${newHeight}) (old height:${oldHeight})`);
      if(oldHeight != newHeight)
          this.setState({containerHeight:newHeight});
      
  },

  _updateMove: function(newGesture:Object) {
      var dif = newGesture.dy - this._oldGestureY;
      if(dif!=0) {
        this._moveDirection = dif;
        this._oldGestureY = newGesture.dy;
        //var s = this._moveDirection>=0?'DOWN':'UP';
        //console.log(s);
      }
  },

  _highlightBottom: function() {
    LayoutAnimation.easeInEaseOut();
    this._topViewStyle.style.height += (this._topOpened?-1:1)*this._highlightWidth; 
    this._topView.setNativeProps(this._topViewStyle);
  },

  // RESPONDER
  _getResponder : function(shouldRespond) {
    return PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder        : (evt, gestureState) => {
            //console.log("startShouldSet*");
            return  false
        },
        onStartShouldSetPanResponderCapture : (evt, gestureState) => {
            //console.log("startShouldSet*Capture");
            return  shouldRespond();
        },
        onMoveShouldSetPanResponder         : (evt, gestureState) => {
            //console.log("moveShouldSet*");
            return  false
        },
        onMoveShouldSetPanResponderCapture  : (evt, gestureState) => {
            //console.log("moveShouldSet*Capture");
            return  false
        },
        onPanResponderGrant                 : (evt, gestureState) => {
            // The guesture has started. Show visual feedback so the user knows
            // what is happening!

            // gestureState.{x,y}0 will be set to zero now
            console.log("onPanResponderGrant"); 
            this._oldGestureY = gestureState.dy;
            this._highlightBottom();
            //this._highlight(this.pager);

        },
        onPanResponderMove                  : (evt, gestureState) => {
            // The most recent move distance is gestureState.move{X,Y}

            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
            var offset = this._topViewStyle.style.height + gestureState.dy
            this._topView.setNativeProps({style:{height:offset}});
            this._updateMove(gestureState);
            //console.log("onPanResponderMove");  
        },
        onPanResponderTerminationRequest    : (evt, gestureState) => {
            //console.log("onPanResponderTerminationRequest");
            return  true;
        },
        onPanResponderRelease               : (evt, gestureState) => {
            this._updateMove(gestureState);
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
            if(this._moveDirection>=0)
                this._onDetailsExpand();
            else
                this._onDetailsColapse();
            //console.log("onPanResponderRelease");
        },
        onPanResponderTerminate             : (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
            //console.log("onPanResponderTerminate");
        },
        onShouldBlockNativeResponder        : (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            //console.log("onShouldBlockNativeResponder");
            return true;
        },
    });
  },
//END OF COMPONENT
  _withAction : function() { return { 
      currentOrder : () => 
        [ this._currentOrderUrl() , "GET"]
      
      , addItem :  (prodId) => 
        [ this._currentOrderUrl() + `/users/${this.state.userId}/items/${prodId}` , "POST"]

      , removeItem : (itemId,userId) =>
        [ this._currentOrderUrl() + `/users/${userId}/items/${itemId}` , "DELETE"]

      , approveItems : () =>
        [ this._currentOrderUrl() + `/users/${this.state.userId}/items/approved` , "POST"] };
  },

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
    backgroundColor: '#dcf4ff',
    //flexWrap:'nowrap',
    //paddingTop:20,
    //position:'relative',
  },
});

//dcffe7
module.exports = Order;
