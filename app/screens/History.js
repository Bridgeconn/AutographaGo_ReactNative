import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,ScrollView} from 'react-native';
import HistoryAccordion from './HistoryAccordion';

export default class History extends Component{
  static navigationOptions = {
    headerTitle: 'History',
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <HistoryAccordion title="A Panel with short content text">
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </HistoryAccordion>
        <HistoryAccordion title="A Panel with long content text">
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </HistoryAccordion>
        <HistoryAccordion title="Another Panel">
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</Text>
        </HistoryAccordion>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#f4f7f9',
    paddingTop      : 30
  },
  
});