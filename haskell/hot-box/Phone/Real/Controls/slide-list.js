'use strict';

var React = require('react-native');
//const UIManager = require('NativeModules').UIManager;

var {
  PanResponder,
  StyleSheet,
  Text,
  View,
} = React;


module.exports = React.createClass({

  _currentOrderUrl: function() {
      return `http://localhost:8000/restaurants/1/tables/1/orders/current`;
  },

  getInitialState: function() {
      return  {
          dataSource:null,
          loaded:false
      };
  },

  fetchData: function() {
        var url = this._currentOrderUrl();
        var args = "GET";
        console.log(`calling API: url: [${url}] , args: [${JSON.stringify(args)}]`);
        fetch(url,args)
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((responseData) => {
            this.setState({
                dataSource: responseData.menu
                ,loaded: true
                ,refreshed: this.state.refreshed+1
            });
        })
        .done();
  },
  _panResponder: {},

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
      this.fetchData();
  },

  render: function() {
      if(!this.state.loaded)
          return this.renderLoading();
      else
          return this.renderLoaded();
  },
  renderLoading:function () {
      return (<View style={styles.container}><Text> Loading .... </Text></View>);
  },
  renderLoaded:function () {
      return (<View style={styles.container}><Text> Loaded !!!!! </Text></View>);
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
    this._oldGestureY = gestureState.dy;
    this._highlight(this.pager);
  },

  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    //this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    //console.log(gestureState);
    this._updatePosition();
    this._updateMove(gestureState);
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

