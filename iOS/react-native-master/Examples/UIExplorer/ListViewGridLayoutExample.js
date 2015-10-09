/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

var THUMB_URLS = [
  'http://cdn1.knowyourmobile.com/sites/knowyourmobilecom/files/0/87/vodafone-logo.jpg',
  'http://www.zdnet.de/wp-content/uploads/2013/05/apple-logo-schwarz.jpg',
  'https://cloud.google.com/hadoop/images/hadoop-elephant.png',
  'http://reichertbrothers.com/images/haskell_logo1.png',
  'https://lh5.ggpht.com/xmJdSKQ18YguPSFQKLUXhmf_ObYNvAVVz2neC58FKcIqpi6JXTXyZOm-MuYM2A731VvE=w300',
  'http://www.raymondcamden.com/wp-content/uploads/2015/01/ibm_200x200.jpg',
  'http://cdn-www.xda-developers.com/wp-content/uploads/2014/04/android_intel.png',
  'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/AMD_Radeon_graphics_logo_2014.svg/1213px-AMD_Radeon_graphics_logo_2014.svg.png',
  'http://rendszerigeny.hu/wp-content/uploads/2013/06/AMD-FX-9000-CPU-Is-a-5-GHz-Processor.jpg',
  'http://s3.amazonaws.com/digitaltrends-uploads-prod/2015/01/ARM-Chip.jpg',
  'http://www.nvidia.com/docs/IO/56076/GeForce_GTX_280_3qtr.jpg',
];

var ListViewGridLayoutExample = React.createClass({

  statics: {
    title: '<ListView> - Grid Layout',
    description: 'Flexbox grid layout.'
  },

  getInitialState: function() {
var ds = new ListView.DataSource({rowHasChanged: 
                                    (r1, r2) => { 
                                        console.log(5 + 6);
                                        return r1 !== r2
                                    }});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this._pressData = {};
  },

  render: function() {
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource = {
      uri: THUMB_URLS[rowHash % THUMB_URLS.length],
    };
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="transparent">
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (X)' : '';
      dataBlob.push('Cell ' + ii + pressedText);
    }
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
  },
});

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var styles = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
});

module.exports = ListViewGridLayoutExample;
