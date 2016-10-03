import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from './customTabBar.js';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state= {
      structure: this.props.structure,
			selectedTab: this.props.selectedTab,
			iconSize: this.props.iconSize ? this.props.iconSize : 30,
			activeTintColor: this.props.activeTintColor ? this.props.activeTintColor : null
    }
  }
  render() {
    return (
      <ScrollableTabView renderTabBar={() => <CustomTabBar />}
								   onChangeTab={(o)=>{}}
                           		   tabBarPosition={'bottom'}
                                 initialPage={this.state.selectedTab}
                                   >
        {this.state.structure.map((tabProps,tabIndex)=>
                  <View style={{flex:1}}
                        tabLabel={tabProps.title+'!$#'+tabProps.iconName+'!$#'+this.state.iconSize}
                        key={tabIndex}>
                        {tabProps.renderContent()}
                  </View>
        )}
      </ScrollableTabView>
    )
  }
}

module.exports = TabBar;
