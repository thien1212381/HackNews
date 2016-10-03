import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
module.exports = React.createClass({
    getInitialState: function(){
        return {
            renderRow: this.props.renderRow,
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#FFFFFF',
            loadMoreText: this.props.loadMoreText ? this.props.loadMoreText : 'Load More...',
            renderHeader: this.props.renderHeader ? this.props.renderHeader : null,
        };
    },
    onRefresh: function(page=1, callback, options){
        this.props.onRefresh(page, callback);
    },
    renderRow: function(row){
        return this.state.renderRow(row);
    },
    render: function(){
        return(
            <View style={[styles.container, {backgroundColor: this.state.backgroundColor}, this.props.style]}>
                <View style={styles.navBarSpace} />
                <GiftedListView rowView={this.renderRow}
                                onFetch={this.onRefresh}
                                paginationAllLoadedView={this.renderPaginationAllLoadedView}
                                paginationWaitingView={this.renderPaginationWaitingView}
                                headerView={this.renderHeaderView}
                                PullToRefreshViewAndroidProps={{
                                    colors: ['#F6F6EF'],
                                    progressBackgroundColor: '#FF6600',
                                }}
                                customStyles={{
                                                refreshableView: {
                                                    backgroundColor: this.state.backgroundColor,
                                                    justifyContent: 'flex-end',
                                                    paddingBottom: 12,
                                                },
                                                paginationView: {
                                                    backgroundColor: this.state.backgroundColor,
                                                    height: 60
                                                }
                                }}/>
            </View>
        );
    },
    renderPaginationAllLoadedView: function(){
        return(
            <View />
        );
    },
    renderPaginationWaitingView: function(paginateCallback) {
        return (
            <TouchableOpacity style={styles.paginationView}
                              onPress={paginateCallback}>
                <Text style={styles.loadMoreText}>
                    {this.state.loadMoreText}
                </Text>
           </TouchableOpacity>
        );
    },
    renderHeaderView: function(){
        if(this.state.renderHeader){
            return this.props.renderHeader();
        }
        return (null);
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navBarSpace: {
        height: (Platform.OS !== 'android') ? 64 : 0,
    },
    rowContainer: {
        paddingRight: 15,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    paginationView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    loadMoreText: {
        fontSize: 15,
        color: 'gray',
    }
});
