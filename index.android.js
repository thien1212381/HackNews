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
  ToolbarAndroid,
  WebView
} from 'react-native';

import Dashboard from './App/View/Dashboard/index.android.js';
import Post from './App/View/Post/index.android.js';


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
    switch (route.id) {
      case 'Dashboard': return <Dashboard navigator={navigator}/>
      case 'Post' : return <Post navigator={navigator} title={route.title} post={route.post}/>
      case 'Web': return (
            <View style={{flex: 1}}>
                <ToolbarAndroid style={styles.toolbar}
                                title={route.title}
                                navIcon={{uri: "ic_arrow_back_white_24dp", isStatic: true}}
                                onIconClicked={navigator.pop}
                                titleColor={'#FFFFFF'}/>
                <WebView source={{uri: route.url}}
                         javaScriptEnabled={true}/>
            </View>
          );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#FF6600'
  }
});


AppRegistry.registerComponent('HackerNews', () => HackerNews);
