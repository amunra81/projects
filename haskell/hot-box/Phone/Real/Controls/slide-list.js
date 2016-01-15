'use strict';

var React = require('react-native');
var Linq = require('linq');
const UIManager = require('NativeModules').UIManager;
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  LayoutAnimation,
} = React;


module.exports = React.createClass({

  _panResponder: {},
  container: null,  
  movingPart: null,  
  prevPage: null,
  currentPage: null,
  nextPage: null,
  offse:0,
  _moveDirection: 0,

  getInitialState: function() {
      return { 
                currentPage: 0,
                //containerDims: null,
             };
  },
  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder  : this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder   : this._handleMoveShouldSetPanResponder,
      onPanResponderGrant           : this._handlePanResponderGrant,
      onPanResponderMove            : this._handlePanResponderMove,
      onPanResponderRelease         : this._handlePanResponderEnd,
      onPanResponderTerminate       : this._handlePanResponderEnd,
    });
  },

  //componentDidMount: function() {
      //console.log("did");
       ////if(!this.state.containerDims) 
        ////setTimeout(this.measureContainer);
  //},

  //measureContainer: function() {
      //this.container.measure((fx, fy, width, height, px, py) => {
          //var str =  `measured: (fx:${fx} fy:${fy} width:${width} height:${height} px:${px} py:${py})`;
          //console.log(str);
          //this.setState({containerDims:{width:width,height:height}});
      //});
  //},

  //render: function() {
    //return this.state.containerDims?this.renderPages():this.renderMeasuring();
  //},

  //renderMeasuring: function() {
    //console.log("measuring...");
    //return (
        //<View ref={x=>this.container = x} style={styles.container} onLayout={this._onLayout}>
            //<Text > Measuring ... </Text>       
            //<View ref={x=> this.tt = x} style={{backgroundColor:'green',height:100}}>
                //<Text> Measuring ... </Text>       
            //</View>
        //</View>
    //);
  //},

  render: function() {
    //{this.props.dataSource.map( x => this.renderItem(x))} 
    //<View><Text >{this.props.pageSize} + {this.state.containerDims.height}</Text></View>
      return (<View ref={x=>this.container = x} style={styles.container} onLayout={ this._setHeghts }>
                <View ref={x=>this.movingPart = x} name='moving-part' >
                    {this.renderPage(0,{name:"pula",style:{backgroundColor:'red'}}
                                    ,x=>this.prevPage = x)}
                    {this.renderPage(1,{style:{backgroundColor:'green'},...this._panResponder.panHandlers}
                                    ,x=>this.currentPage = x)}
                    {this.renderPage(2,{style:{backgroundColor:'yellow'}}
                                    ,x=>this.nextPage = x)}

                </View>
            </View>
    );
  },

  //_withCommonStyle: function(propsP) {
    //var {style,props} = propsP;
    //var commonStyle = {
            ////top:-this.state.containerDims.height,
            //height:this.state.containerDims.height,
            //width:this.state.containerDims.width,
    //}

    //return {style: [commonStyle,style],...props};
  //},

  _setHeghts : function (nativEvent)
  {
      this.dims = nativEvent.nativeEvent.layout;
      console.log(`OnLayout: ${JSON.stringify(this.dims)}`);

      var pagesHeight = {style:{height:this.dims.height}};
      var movingPartTop = {style:{top:-this.dims.height}};

      this.prevPage.setNativeProps(pagesHeight);
      this.currentPage.setNativeProps(pagesHeight);
      this.nextPage.setNativeProps(pagesHeight);
      this.movingPart.setNativeProps(movingPartTop);
  },

  //Enumerable.From(['a','b','c','d','e','f']).Zip(Enumerable.Range(0,10),"a,b=>a+':'+b")
  renderPage: function(pageNo,props,refHandler) {
    //var props = this._withCommonStyle(propsP);
    var extraProps = {pageNo:pageNo,...props};

    var text = `Page: ${pageNo}`;
    var {pageSize,dataSource} = this.props;
    var some = (pageNo>=0?
                    Linq.from(dataSource).zip(Linq.range(0,dataSource.length-1),(a,b) => {return {item:a,pos:b};})
                    .skip(pageNo*this.props.pageSize)
                    .take(pageSize)
                :   Linq.empty()).toArray();
    var i = 3;
    return (
        <View ref={refHandler} {...extraProps}>
            <Text key="ss">{text}</Text>
            {some.map(this.renderItem)}
        </View>
    );
  },

  renderItem: function(item) {
      return  (
          <View key={this.props.getItemKey(item.item)} >
              {this.props.renderItem(item.item)}
          </View>
      );
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return true;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return true;
  },

  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
      console.log('grnd');
      //this should be removed
      //this._setMovingTop(0);
  },

  _setMovingTop:function(offset) {
      this.offset = offset;
      var top = (-this.dims.height) + offset;
      this.movingPart.setNativeProps({style: {top:top}});
  },
  _handlePanResponderMove: function(e: Object, gestureState: Object) {
      //console.log(gestureState);
      this._setMovingTop(gestureState.dy);
      this._updateMoveDirection(gestureState);
  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
      LayoutAnimation.easeInEaseOut();
      var top = 0;
      if(this._moveDirection>=0 && this.offset >=0) {
          //finger DOWN
          top = this.dims.height;
      } 
      else if(this._moveDirection<0 && this.offset <= 0 ){
          top = - this.dims.height;
        //finger UP
      }

      this._setMovingTop(top);
  },
  _updateMoveDirection: function(newGesture:Object) {
      var dif = newGesture.dy - this._oldGestureY;
      if(dif!=0) {
        this._moveDirection = dif;
        this._oldGestureY = newGesture.dy;
        var s = this._moveDirection>=0?'DOWN':'UP';
        console.log(s + " : offset: " + this.offset );
      }
  },
});

var styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        justifyContent: 'flex-start',
        flex:1,
        alignItems:'stretch',
        backgroundColor: '#dcf4ff',
        marginTop: 20,
        overflow:'hidden',
    }
});

