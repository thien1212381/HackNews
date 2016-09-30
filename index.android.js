/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid
} from 'react-native';

import Dashboard from './App/View/Dashboard/index.android.js';
import Post from './App/View/Post/index.android.js';
var _navigator;


BackAndroid.addEventListener('hardwareBackPress', () => {
  console.log(_navigator.getCurrentRoutes().length);
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});


class HackerNews extends Component {
  render() {
    return (
      <Navigator
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{id: 'Dashboard'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }
  navigatorRenderScene(route,navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'Dashboard': return <Dashboard navigator={navigator}/>
      case 'Post' : return <Post />
      default: return (<View><Text>Nothing</Text></View>)

    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  }
});


AppRegistry.registerComponent('HackerNews', () => HackerNews);
