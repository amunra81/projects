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
  Image,
} = React;

var BlurView = require('react-native-blur').BlurView;
var VibrancyView = require('react-native-blur').VibrancyView;

var background = 'http://img05.deviantart.net/f218/i/2012/302/5/a/colorful_background_by_yuimi_chan-d5jd40b.jpg';
//var background = 'http://www.masmithwd.com/2.jpg';
//var background = 'http://previews.123rf.com/images/alex_star/alex_star1010/alex_star101000455/8066584-Lime-background-Stock-Photo-acid.jpg';
//var background = 'http://iphonewallpapers-hd.com/thumbs/firework_iphone_wallpaper_5-t2.jpg';
//var background = 'http://www.designbolts.com/wp-content/uploads/2014/01/American-Flag-iPhone-5-Wallpaper.jpg';
var camerUrl = 'https://raw.githubusercontent.com/voronianski/react-native-effects-view/master/example/EffectsApp/img/Camera%402x.png';
var bitcoinUrl = 'https://raw.githubusercontent.com/voronianski/react-native-effects-view/master/example/EffectsApp/img/Bitcoin%402x.png';
var geniusUrl = 'https://raw.githubusercontent.com/voronianski/react-native-effects-view/master/example/EffectsApp/img/Genius%402x.png';
var maskUrl = 'https://raw.githubusercontent.com/voronianski/react-native-effects-view/master/example/EffectsApp/img/ButtonRoundRect%402x.png';

var basic = React.createClass({
  render: function() {
    return (
      <Image source={{uri: background}} style={styles.container}>
        <BlurView blurType="xlight" style={[styles.containerBlur,]}>
          <Image style={styles.genius} source={require('../img/Genius.png')} />
         <Text style={styles.welcome}> Blur xlight</Text>
        </BlurView>

        <VibrancyView blurType="xlight" style={[styles.containerBlur,]}>
          <Image style={styles.phone} source={require('../img/Phone.png')}/>
          <Text style={styles.welcome}>Vibrancy xlight</Text>
        </VibrancyView>

        <BlurView blurType="light" style={[styles.containerBlur,]}>
            <Image style={styles.camera} source={require('../img/Camera.png')} />
         <Text style={styles.welcome}> Blur light</Text>
        </BlurView>

        <VibrancyView blurType="light" style={[styles.containerBlur,]}>
          <Image style={styles.phone} source={require('../img/Phone.png')}/>
            <Text style={styles.welcome}>Vibrancy light</Text>
        </VibrancyView>

        <VibrancyView blurType="dark" style={[styles.containerBlur,]}>
          <Image style={styles.phone} source={require('../img/Phone.png')}/>
          <Text style={styles.welcome}>Vibrancy darkk</Text>
        </VibrancyView>

        <BlurView blurType="dark" style={[styles.containerBlur,]}>
         <Image style={styles.bitcoin} source={require('../img/Bitcoin.png')} />
         <Text style={styles.welcome}> Blur dark</Text>
        </BlurView>
      </Image>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  containerBlur: {
      //flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height:80
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  camera: {
        //flex:1,
        width: 28,
        height: 20,
        backgroundColor: 'transparent'
  },
   bitcoin: {
        width: 28,
        height: 28
    },
    phone: {
        width: 32,
        height: 32
    },
    genius: {
        width: 26,
        height: 28
    },
      mask: {
        width: 64,
        height: 64,
        flex: 1,
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    }
});

//AppRegistry.registerComponent('basic', () => basic);

module.exports = basic;
