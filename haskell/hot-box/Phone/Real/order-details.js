'use strict';

var React = require('react-native');
var Enumerable = require('linq');
var {merge,without,animate} = require('./common');
var numeral = require('numeral');
//var Display = require('react-native-device-display');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Animated,
  PanResponder,
} = React;

//var Sound = require('react-native-simple-sound');

var HeadContainer = View;

var SECOND_TEXT_SIZE = 28;
var OrderDetails = React.createClass({
  componentDidMount: function(){
        //Sound.enable(true); // Enable sound
        //Sound.prepare('./sounds/chime_bell_ding.wav'); // Preload the sound file 'tap.aac' in the app bundle
        //Sound.play(); // Play the sound 'tap.aac'
        //Sound.pause(); // Pause the sound
        //Sound.play(); // Resume playing the sound
        //Sound.stop(); // Stop and reset the sound.
  },
  //mandatory
  getInitialState: function() {
    return { 
        restId : this.props.restId,
        tableId : this.props.tableId,
        dataSource : null,
        loaded: false,
        inAction: false,
        actionCaption: null,
        actionSecond:0,
        actionSecondSize:new Animated.Value(SECOND_TEXT_SIZE),
        };
  },

  render: function() {
      return (
          <View {...this.props}>
              <Image 
                  source={imgs.background} 
                  style={{width:320,height:548}}>
                  <Image
                      source={imgs.statusBar}
                      style={{height:20,backgroundColor:'transparent'}}
                  />
               {this.renderView()}
             </Image>
         </View>
      );
  },

  renderView: function() {
            //{this.renderActions()}
    return (
        <View style={styles.container}>
            {this.renderTop()}
            {this.renderBody()}
        </View>
    );
  },
  
  renderTop: function() {
      return (
        <View>
            {this.state.inAction?this.renderInAction():this.renderTopBar()}
            <Image style={[styles.actions]} source={imgs.actionsBar}>
                {this.renderSendOrder()}
                {this.renderCheckPlease()}
            </Image>
        </View>
      );
  },

  renderTopBar: function() {
    return (
    <View style={styles.user} >
        <Text style={styles.userCaption}>{this._getProperSegment().user.fullName}</Text>
    </View>
  );},

  renderInAction: function() {
    var textProps = {
        style : [styles.actionText,{fontSize:this.state.actionSecondSize}]
    };
    return (
    <View style={styles.inAction} >
        <Text style={styles.actionText}>{this.state.actionCaption}</Text>
        <View style={{height:40,justifyContent:'center'}}>
            <Animated.Text {...textProps}>{this.state.actionSecond?this.state.actionSecond:"done"}</Animated.Text>
        </View>
    </View>
  );},

  renderCheckPlease:function() {
      return this.renderGeneralAction("Check please",()=>{
          this.setState({
              inAction:true,
              actionCaption:"Requesting check in", 
              actionSecond:5,
          });
          setTimeout(() => this.startAnimation(()=>console.log("done")));
      },
      ()=>{
          this.state.actionSecondSize.stopAnimation();
          this.setState({ inAction:false });
      },this.props.ds.reqs.validForCheckReq);
  },

  startAnimation: function(callback) {
        if(this.state.actionSecond>0)
            animate(this.state.actionSecondSize,4,(arg)=> {
                if(!arg.finished || !this.state.inAction) return; //exit
                    this.setState({actionSecond: this.state.actionSecond -1});
                    animate(this.state.actionSecondSize,SECOND_TEXT_SIZE,(arg)=>{
                    if(!arg.finished || !this.state.inAction) return;  //exit
                        setTimeout(() => this.startAnimation(callback),this.state.actionSecond?700:0)

                }).timing();
            }).timing();
        else
            this.state.inAction && callback && callback();
  },

  renderSendOrder:function() {
      return this.renderGeneralAction("Send order",()=>{
          this.setState({
              inAction:true,
              actionCaption:"Sending the order in", 
              actionSecond:5,
          });
          setTimeout(() => this.startAnimation(
              ()=> this.props.onApprove()
          ));
      },
      ()=>{
          this.state.actionSecondSize.stopAnimation();
          this.setState({ inAction:false });
      },this.props.ds.reqs.validForSendingRequest);
  },
  renderCallTheWaiter:function() {
      return this.renderGeneralAction("Call the waiter",()=>{
          this.setState({
              inAction:true,
              actionCaption:"Calling the waiter in", 
              actionSecond:5,
          });
          setTimeout(() => this.startAnimation(()=>console.log("done")));
      },
      ()=>{
          this.state.actionSecondSize.stopAnimation();
          this.setState({ inAction:false });
      });
  },

  renderGeneralAction: function (text,onPress,onCancell,enabled){

    var panResponder = PanResponder.create({
    //_handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
        onStartShouldSetPanResponder  : (e: Object,gestureState: Object): boolean => {
            return true;
        },
        //onMoveShouldSetPanResponder   : (e: Object,gestureState: Object): boolean => {
            //return false;
        //},
        onPanResponderGrant           : (e: Object,gestureState: Object): boolean => {
            console.log('grant');
            onPress && onPress();
        },
        //onPanResponderMove            : (e: Object,gestureState: Object): boolean => {
            ////console.log(e);
            //return false;
        //},
        onPanResponderRelease         : (e: Object,gestureState: Object): boolean => {
            console.log('released');
            onCancell && onCancell();
        },
        onPanResponderTerminate       : (e: Object,gestureState: Object): boolean => {
            onCancell && onCancell();
            //alert('terminate');
        },
    });
    //<TouchableOpacity onPress={onPress}>
    //</TouchableOpacity>
    return ( 
            <View style={{alignSelf:'stretch',justifyContent:'center'}}
                {...panResponder.panHandlers}>
            <Text style={[styles.actionItem,enabled?"":styles.actionItemDisabled]}>{`> ${text} <`}</Text> 
        </View>
  );},

  _getProperSegment: function() {
      //TODO: nasol
      return this.props.ds.segs.filter( x => x.userId == this.props.userId)[0];
  },

  renderBody: function() {
      var data = this._getProperSegment();
      return (
          <View style={styles.order}>
              {this.renderSegment(data)}
          </View>
      );
  },

  renderSegment: function(segment){
      return (
          <View key={segment.userId}>
                {segment.items.map((x,i) => this.renderProduct(x,segment.userId,i))}
          </View>
      );
  },

  renderProduct: function(item,userId,i){
      var textStyle = [styles.itemText,item.approved?null:styles.itemTextUnapporved]
      //⧀⧁
     var imgSource = i%2!=0?imgs.darkRow:imgs.lightRow;
     return (
          <TouchableHighlight key={item.itemId} onPress={() => { 
            console.log(`s-a clickuit pe ${item.pname} + ${userId}!`); 
            this.props.orderItemClicked(item,userId);
          }}>
            <Image source={imgSource} style={styles.row}>
                <Text style={textStyle}>{item.count} x {item.pname}</Text>
                <Text style={textStyle}>{item.pprice} RON</Text>
            </Image>
        </TouchableHighlight>
      );
  },

//END OF COMPONENT
});
var imgs = {
    statusBar : require('../img/design/statusBar.png'),
    //background : require('../img/design/ceva.png'),
    background : require('../img/design/gradient-warmer.png'),
    actionsBar : require('../img/design/actions-bg.png'),
    lightRow : require('../img/design/light-row-bg.png'),
    darkRow : require('../img/design/dark-row-bg.png'),
};

var L_OFFSET = 5;
var ROW_WIDTH = 315; //TODO dynamic this

var styles = StyleSheet.create({
  center: {
    justifyContent:'center',
    alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor:'transparent'
  },
  order: {
    flex: 1,
  },
  products: {
      paddingLeft: 20,
      paddingBottom:10
  },
  actionItem : {
      fontSize: 16,
      color: 'white',
      fontFamily : 'Dosis-Book',
      textShadowColor: 'black',
      textShadowOffset:{width:0,height:0.1},
      textShadowRadius:1
  },
  actionItemDisabled : {
      color: '#909090',
  },
  actions : {
      height:40,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginLeft:L_OFFSET,
      paddingLeft:10,
      paddingRight:10,
      width:ROW_WIDTH,
  },
  itemText : {
      fontSize: 16,
      fontFamily: 'Dosis-Light',
      color:'#debdc2',
  },
  itemTextUnapporved : {
      fontFamily: 'Dosis-Book',
      textShadowColor: 'black',
      textShadowOffset:{width:0.5,height:1},
      textShadowRadius:0.5
  },
  row : {
      height:40,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginLeft:L_OFFSET,
      paddingLeft:10, 
      paddingRight:10, 
      width:ROW_WIDTH,
  },
  user : {
      height:80,
      alignItems:'center',
      justifyContent:'center'
  },
  inAction : {
      height:80,
      alignItems:'center',
      justifyContent:'center'
  },
  userCaption :{
      fontSize:20,
      color:'#debdc2',
      fontFamily:'Dosis-light',
      textShadowColor: 'black',
      textShadowOffset:{width:0,height:1},
      textShadowRadius:1
  },
  actionText :{
      fontSize:20,
      color:'#debdc2',
      fontFamily:'Dosis-light',
      textShadowColor: 'black',
      textShadowOffset:{width:0,height:1},
      textShadowRadius:1
  }
});
//dcffe7
module.exports = OrderDetails;
