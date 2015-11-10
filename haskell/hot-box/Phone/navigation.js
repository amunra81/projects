/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    NavigatorIOS
} = React;

var AllRests = require('./all-rests');
var ClientRestView = require('./restaurant-client-view');

var Navigation = React.createClass({

  render: function() {
    return (
    <NavigatorIOS style = {styles.wraper}
      initialRoute={{
        component: AllRests,
        title: 'lime-s',
        passProps: { 
            myProp: 'foo'
            ,onRestClicked : function(id,name) {
            /* HERE SHOULD PUSH RESTAURANT VIEW MODEL */
                this.navigator.push({
                    component: ClientRestView,
                    title: name,
                    passProps: {
                        id:id
                    }
                });
            }
        }
      }}
    />
  );
  }
});

var styles = StyleSheet.create({
  wraper: {
    flex:1
    ,justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Navigation;
