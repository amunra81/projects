'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
} = React;

var SampleApp = React.createClass({
  render: function() {
    return (
     <View style={styles.container}>
          
        <Image source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} style={styles.image}>
            <Text style={{backgroundColor: 'transparent',color:'transparent',fontSize:14}}>Inside{'\n'}Test</Text>
        </Image>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100
  }
});


module.exports = SampleApp;

