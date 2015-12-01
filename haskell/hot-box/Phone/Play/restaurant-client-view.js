
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var REQUEST_URL = 'http://localhost:8000/restaurant'

var RestaurantClientView = React.createClass({

    //mandatory
    getInitialState: function() {
        return {
            data: null,
            loaded: false,
        };
    },

    componentDidMount: function() {
        this.fetchData(this.props.id);
    },

    fetchData: function(id) {
        fetch(REQUEST_URL+"/"+id)
            .then((response) => 
                response.json()) //to json
            .then((responseData) => {
                this.setState({
                    data: responseData,
                    loaded: true,
                });
            })
            .done();
    },

    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View style={styles.container}>
                <Text style={styles.container}>
                    {this.state.data.name}
                </Text>
                <Text style={styles.container}>
                    {this.state.data.tables}
                </Text>
            </View>
        );
    },

    renderLoadingView: function() {
        return (
        <View style={styles.container}>
            <Text>
                Getting info ({this.props.id}) ...
            </Text>
        </View>
        );
    }, 

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = RestaurantClientView;
