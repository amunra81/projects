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
} = React;


module.exports = React.createClass({

  _panResponder: {},
  container: null,  

  getInitialState: function() {
      return { 
                currentPage: 0,
                containerDims: null,
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

  componentDidMount: function() {
      console.log("did");
       if(!this.state.containerDims) 
        setTimeout(this.measureContainer);
  },

  measureContainer: function() {
      this.container.measure((fx, fy, width, height, px, py) => {
          var str =  `measured: (fx:${fx} fy:${fy} width:${width} height:${height} px:${px} py:${py})`;
          console.log(str);
          this.setState({containerDims:{width:width,height:height}});
      });
  },

  render: function() {
    return this.state.containerDims?this.renderPages():this.renderMeasuring();
  },

  renderMeasuring: function() {
    console.log("measuring...");
    return (
        <View ref={x=>this.container = x} style={styles.container} >
            <Text style={{top:-10}}> Measuring ... </Text>       
            <Text> Measuring ... </Text>       
        </View>
    );
  },

  renderPages: function() {
    //{this.props.dataSource.map( x => this.renderItem(x))} 
    //<View><Text >{this.props.pageSize} + {this.state.containerDims.height}</Text></View>
    return (<View ref={x=>this.container = x} style={styles.container} >
                {this.renderPage(0,{name:"pula",style:{backgroundColor:'red'}})}
                {this.renderPage(1,{style:{backgroundColor:'green'},...this._panResponder.panHandlers})}
                {this.renderPage(2,{style:{backgroundColor:'yellow'}})}
            </View>
    );
  },

  _withCommonStyle: function(propsP) {
    var {style,props} = propsP;
    var commonStyle = {
            top:-this.state.containerDims.height,
            height:this.state.containerDims.height,
            width:this.state.containerDims.width,
    }

    return {style: [commonStyle,style],...props};
  },
  //Enumerable.From(['a','b','c','d','e','f']).Zip(Enumerable.Range(0,10),"a,b=>a+':'+b")
  renderPage: function(pageNo,propsP) {
    var props = this._withCommonStyle(propsP);
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
        <View {...extraProps}>
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
  },

  _handlePanResponderMove: function(e: Object, gestureState: Object) {
      console.log('grnd');
  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {

  },
});

var styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        justifyContent: 'flex-start',
        flex:1,
        alignItems:'center',
        backgroundColor: '#dcf4ff',
        marginTop: 20,
        overflow:'hidden',
    }
});

