import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TouchableHighlight
} from 'react-native';
import TabBar from '../../Component/TabBar/TabBar.js';
import RefreshableListView from '../../Component/RefreshableListView/index.js';
import api from '../../Network/api.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStoryIDs: null,
      lastIndex: 0
    }
  }
  renderContentTabBar(title,api_endpoint) {
    return (<View style={{flex:1}}>
                <ToolbarAndroid style={styles.toolbar}
                                title={title}
                                titleColor={'#FFFFFF'}/>
                <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, title)}
                                      onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api_endpoint)}
                                      backgroundColor={'#F6F6EF'}/>
            </View>);
  }
  render() {
    return (
      <TabBar structure={[{
                        title:'Ask HN',
                        iconName:'comment',
                        renderContent:()=>{return this.renderContentTabBar('Ask HN',api.HN_ASK_STORIES_ENDPOINT)}
                      },{
                        title:'Show HN',
                        iconName:'eye',
                        renderContent:()=>{return this.renderContentTabBar('Show HN',api.HN_SHOW_STORIES_ENDPOINT)}
                      },{
                        title:'Front page',
                        iconName:'star',
                        renderContent:()=>{return this.renderContentTabBar('Front page',api.HN_TOP_STORIES_ENDPOINT)}
                      },{
                        title:'New',
                        iconName:'level-up',
                        renderContent:()=>{return this.renderContentTabBar('New',api.HN_NEW_STORIES_ENDPOINT)}
                      },{
                        title:'Jobs',
                        iconName:'suitcase',
                        renderContent:()=>{return this.renderContentTabBar('Jobs',api.HN_JOB_STORIES_ENDPOINT)}
                      }
              ]}
              selectedTab={2}
              activeTintColor={'#ff8533'}
              iconSize={20}
      />
    )
  }
  renderListViewRow(row,title) {
    return(
          <TouchableHighlight underlayColor={'#f3f3f2'}
                              onPress={()=>this.selectRow(row, title)}>
            <View style={styles.rowContainer}>
                <Text style={styles.rowCount}>
                    {row.count}
                </Text>
                <View style={styles.rowDetailsContainer}>
                    <Text style={styles.rowTitle}>
                        {row.title}
                    </Text>
                    <Text style={styles.rowDetailsLine}>
                        Posted by {row.by} | {row.score} Points | {row.descendants} Comments
                    </Text>
                    <View style={styles.separator}/>
                </View>
            </View>
          </TouchableHighlight>
      );
  }
  listViewOnRefresh(page, callback, api_endpoint) {
    if (page != 1 && this.state.topStoryIDs){
        this.fetchStoriesUsingTopStoryIDs(this.state.topStoryIDs, this.state.lastIndex, 5, callback);
    }
    else {
      fetch(api_endpoint)
      .then((response) => response.json())
      .then((topStoryIDs) => {
          this.fetchStoriesUsingTopStoryIDs(topStoryIDs, 0, 12, callback);
          this.setState({topStoryIDs: topStoryIDs});
      })
      .done();
    }
  }
  fetchStoriesUsingTopStoryIDs(topStoryIDs, startIndex, amountToAdd, callback) {
    var rowsData = [];
      var endIndex = (startIndex + amountToAdd) < topStoryIDs.length ? (startIndex + amountToAdd) : topStoryIDs.length;
      function iterateAndFetch(){
          if (startIndex < endIndex){
              fetch(api.HN_ITEM_ENDPOINT+topStoryIDs[startIndex]+".json")
              .then((response) => response.json())
              .then((topStory) => {
                  topStory.count = startIndex+1;
                  rowsData.push(topStory);
                  startIndex++;
                  iterateAndFetch();
              })
              .done();
          }
          else {
              callback(rowsData);
              return;
          }
      }
      iterateAndFetch();
      this.setState({lastIndex: endIndex});
  }
  selectRow(row,title){
    this.props.navigator.push({id:'Post',title:title + ' #'+row.count,post:row});
  }
}

var styles = StyleSheet.create({
    container: {
      flex: 1
    },
    toolbar: {
      height: 56,
      backgroundColor: '#FF6600'
    },
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowCount: {
        fontSize: 20,
        textAlign: 'right',
        color: 'gray',
        margin: 10,
        marginLeft: 15,
    },
    rowDetailsContainer: {
        flex: 1,
    },
    rowTitle: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 4,
        marginRight: 10,
        color: '#FF6600'
    },
    rowDetailsLine: {
        fontSize: 12,
        marginBottom: 10,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    }
});

module.exports = Dashboard;
