/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var REQUEST_URL2 = 'http://localhost:8000/restaurants'

var AllRestaurants = React.createClass({
  //mandatory
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
                        rowHasChanged: function (row1, row2) { 
                            return row1 !== row2 
                        },
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL2)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }, 

  constImgUrl: 'http://www.electroputeremall.ro/wp-content/uploads/2014/05/4123logo1.jpg',

  renderMovie: function(movie) {
    return (
        <TouchableHighlight onPress={() => alert(movie.name) }>
            <View style={styles.container}>
                <Image style={styles.thumbnail} source={{uri: this.constImgUrl}} /> 
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.id}</Text>
                    <Text style={styles.year}>{movie.name}</Text>
                </View>
            </View>
        </TouchableHighlight>
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

module.exports = AllRestaurants;
