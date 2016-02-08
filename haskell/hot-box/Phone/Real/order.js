
'use strict';

var React = require('react-native');

var OrderDetails = require('./order-details');
var OrderHead = require('./order-head');
var OrderMenu = require('./order-menu-slide');

var {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  PanResponder,
  StatusBarIOS,
  Animated,
  Image,
  TouchableOpacity,
} = React;

var {transformDataSource
    ,snapshot
    } = require('./common');

//var ServerAddress = "localhost";
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
                contentOffset : new Animated.Value(0),
             };
    },

    //FIELDS
    _topView: (null : ?{ setNativeProps(props: Object): void }),
    _topOpened: false,
    _oldGestureY: 0,
    _moveDirection : 0,
    _highlightWidth: 100,

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
        var fetchStart = new Date().getTime();
        var url = action[0];
        var args = {method:action[1]};
        console.log(`calling API: url: [${url}] , args: [${JSON.stringify(args)}]`);
        fetch(url,args)
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            //calculate fetching time
            var fetchEnd = new Date().getTime();
            var fetchingTime = fetchEnd - fetchStart;
            console.log('Fetching time ' + fetchingTime);

            //transform ds
            var start = new Date().getTime();
            var transformedDs = transformDataSource(responseData,this.state.userId);
            var end = new Date().getTime();
            var time = end - start;
            console.log('Ds transformation time' + time);

            //set state
            this.setState({
                dataSource: responseData
                ,ds:transformedDs
                ,loaded: true
                ,refreshed: this.state.refreshed+1
            });
        })
        .done();
  },

  _orderItemClicked: function(item,userId){
    console.log(`a sarit pana sus cu ${item.itemId} si ${userId}`);
    //this.setState({refreshed:this.state.refreshed-1});
    this.fetchData(this._withAction().removeItem(item.itemId,userId));
  },

  _onProductSelected: function(prod){
    console.log(`a sarit pana sus cu ${prod.name}`);
    //setTimeout(()=>this.setState({refreshed:this.state.refreshed+1}));
    this.fetchData(this._withAction().addItem(prod.id));
  },
  
  _onDetailsExpand: function(){
      LayoutAnimation.spring();
      this._topOpened = true;
      this._ensureContentPosition();
  },

  _onDetailsColapse: function(){
      LayoutAnimation.spring();
      this._topOpened = false;
      this._ensureContentPosition();
  },

  _onDetailsColapseToogle: function(x) {
      LayoutAnimation.spring();
      this._topOpened = !this._topOpened;
      this._ensureContentPosition();
  },

  _onApprove : function() {
    this.fetchData(this._withAction().approveItems());
    console.log('Approved');
  },

  _onWaiterRequest : function() {
    this.fetchData(this._withAction().addRequest(this.state.userId,UserRequests.WaiterRequest));
    console.log('_onWaiterRequest');
  },

  _onCheckRequest : function() {
    this.fetchData(this._withAction().addRequest(this.state.userId,UserRequests.CheckRequest));
    console.log('_onWaiterRequest');
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
    var orderMenuProps = {
          productClicked    : this._onProductSelected  
        , ds                : this.state.ds.menu
        , style             : {backgroundColor:'transparent',top:this.state.headHeight}
        , containerHeight   : this.state.containerHeight
        , headHeight        : this.state.headHeight
    };

                //containerHeight:-1,
                //headHeight:-1,
    var orderDetailsProps = {
          orderItemClicked  : this._orderItemClicked  
        , ds                : this.state.ds.details
        , userId            : this.state.userId
        , onApprove         : this._onApprove
        , onWaiterRequest   : this._onWaiterRequest
        , onCheckRequest    : this._onCheckRequest
        , style             : {height:this._getContentHeight(),overflow:'hidden'}   
    };

    var orderHeadProps = {
          onLayout          : this._onHeadLayout 
        , style             : [{top:-this._getContentHeight()}]
        , total             : this.state.ds.total
        , userId            : this.state.userId
        , refreshed         : this.state.refreshed
        ,...this._topResponder.panHandlers
    };

    return (
        <Animated.View ref={x => this._topView = x} style={{top:this.state.contentOffset}}>
            <OrderDetails   {...orderDetailsProps } />
            <Image source={imgs.bgDomolitComplet} style={{overflow:'visible'}}>
               <OrderMenu      {...orderMenuProps    } />
                <OrderHead      {...orderHeadProps    } />
            </Image>
        </Animated.View>
    );
  },

                //<View style={orderDetailsProps.style}>
                    //<TouchableOpacity style={{width:100,height:200,backgroundColor:'red'}} 
                        //onPress={()=>orderMenuProps.productClicked(1)}/>
                //</View>
  _getContentHeight: function () {
      return this.state.containerHeight-this.state.headHeight;
  },

  _layoutInitialized: function() {
      var ret =  this.state && this.state.containerHeight > -1 && this.state.headHeight > -1;
      if(!ret)
          console.log("WARNING! : layout not initialized");
      return ret;
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

  componentDidUpdate: function(arg) {
      console.log('DID UPDATE ' + arg );
  },
  componentWillUpdate: function(arg) {
      console.log('WILL UPDATE ' + arg );
      this._ensureContentPosition();
  },

  _onHeadLayout: function(event) {
      var newHeight = event.nativeEvent.layout.height;
      var oldHeight = this.state.headHeight
      console.log(`_onHeadLayout (new height:${newHeight}) (old height:${oldHeight})`);
      if(oldHeight != newHeight) {
          this.setState({headHeight:newHeight});
      }
  },

  _ensureContentPosition() {
      if(this._layoutInitialized()) {
          var value = this._topOpened?0:-this._getContentHeight();
          //var statusBarContentStyle = this._topOpened?'light-content':'default';
          StatusBarIOS.setStyle('light-content',true);
          //StatusBarIOS.setHidden(!this._topOpened,false);
          this.state.contentOffset.setValue(value);
      }
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
      }
  },

  _getHighlightOffset : function() {
     return (this._topOpened?-1:1)*this._highlightWidth;
  },

  _highlightBottom: function() {
    LayoutAnimation.easeInEaseOut();
    var offsetVal = this.state.contentOffset;
    offsetVal.setValue( offsetVal._value + this._getHighlightOffset());
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
            return  true;
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
            this._prevOffset = this.state.contentOffset._value;
            this._highlightBottom();

        },
        onPanResponderMove                  : (evt, gestureState) => {
            // The most recent move distance is gestureState.move{X,Y}

            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
            //var offset = this.state.contentOffset._value + gestureState.dy
            var offset = this._prevOffset + gestureState.dy + this._getHighlightOffset();

            this.state.contentOffset.setValue(offset);
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

      , addRequest : (userId,action) =>
        [ this._currentOrderUrl() + `/users/${userId}/requests/${action}` , "POST"]

      , approveItems : () =>
        [ this._currentOrderUrl() + `/users/${this.state.userId}/items/approved` , "POST"] };
  },

});

var UserRequests = {
      WaiterRequest : 'WaiterRequest'
    , CheckRequest : 'CheckRequest'
    };

var styles = StyleSheet.create({
  center: {
    justifyContent:'center',
    alignItems:'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#4b4c54',
    //justifyContent: 'space-around',
    //alignItems: 'center',
    //backgroundColor: '#dcf4ff',
    backgroundColor: '#343539',
    //flexWrap:'nowrap',
    //paddingTop:20,
    //position:'relative',
  },
});

var imgs = {
    bg : require("../img/design/Bottom/bg.png"),
    bgDomolit : require("../img/design/Bottom/bg-domolit.png"),
    bgComplet : require("../img/design/Bottom/bg-complet.png"),
    bgDomolitComplet : require("../img/design/Bottom/bg-domolit-complet.png"),
};

//dcffe7
module.exports = Order;
