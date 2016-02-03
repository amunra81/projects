var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Image,
} = React

var TKit = React.createClass({
  render: function() {
    return (
      <View style={styles.main}>
        <Box/>
      </View>
    );
  }
});

var Box = React.createClass({
  render: function() {
    return (
      <View style={styles.box}></View>
    );
  }
});

var styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: "#ffffff",
    //borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
     height: 0,
      width: 0
    }
  }
});

module.exports = TKit;
