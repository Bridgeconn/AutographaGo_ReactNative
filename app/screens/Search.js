import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class Search extends Component {
  static navigationOptions = {
    headerTitle: 'Search',
    headerTintColor: '#F44336'
  };
  render() {
    return (
      <View>
        <Text>
        Hello there Search
        </Text>
      </View>
    );
  }
}
