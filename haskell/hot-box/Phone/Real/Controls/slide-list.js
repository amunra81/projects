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

  renderPage: function(pageNo,props) {
      var extraProps = {pageNo:pageNo,...props};
      var text = `Page: ${pageNo}`;
      return  (
          <View {...extraProps}>
              <Text>{  text }</Text>
          </View>
      );
  },

  renderItem: function(item) {
      return  (
          <View key={this.props.getItemKey(item)} >
              {this.props.renderItem(item)}
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

