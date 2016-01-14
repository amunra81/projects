'use strict';

var React = require('react-native');
var Linq = require('linq');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
} = React;


module.exports = React.createClass({

  _panResponder: {},

  getInitialState: function() {
    return { currentPage: 0 };
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

  render: function() {
    //{this.props.dataSource.map( x => this.renderItem(x))} 
    return (<View style={styles.container} >
                <View><Text>{this.props.pageSize}</Text></View>
                {this.renderPage(0,{name:"pula"})}
                {this.renderPage(1,{...this._panResponder.panHandlers})}
                {this.renderPage(2)}
            </View>
    );
  },
  //Enumerable.From(['a','b','c','d','e','f']).Zip(Enumerable.Range(0,10),"a,b=>a+':'+b")
  renderPage: function(pageNo,props) {
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
        justifyContent: 'center',
        flex:1,
        alignItems:'center'
    }
});

