import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabBar from '../../Component/TabBar/TabBar.js';

class Dashboard extends Component {
  renderContentTabBar(title) {
    console.log(title);
    return (<View style={{flex:1}}><Text>{title}</Text></View>);
  }
  render() {
    return (
      <TabBar structure={[{
                        title:'Ask HN',
                        iconName:'comment',
                        renderContent:()=>{return this.renderContentTabBar('Ask HN')}
                      },{
                        title:'Show HN',
                        iconName:'eye',
                        renderContent:()=>{return this.renderContentTabBar('Show HN')}
                      },{
                        title:'Front page',
                        iconName:'star',
                        renderContent:()=>{return this.renderContentTabBar('Front page')}
                      },{
                        title:'New',
                        iconName:'level-up',
                        renderContent:()=>{return this.renderContentTabBar('New')}
                      },{
                        title:'Jobs',
                        iconName:'suitcase',
                        renderContent:()=>{return this.renderContentTabBar('Ask HN')}
                      }
              ]}
              selectedTab={2}
              activeTintColor={'#ff8533'}
              iconSize={20}
      />
    )
  }
}

module.exports = Dashboard;
