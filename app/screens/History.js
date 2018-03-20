import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class History extends Component {
  static navigationOptions = {
    headerTitle: 'History',
  };
  render() {
    return (
      <View>
        <Text>
        Hello there History
        </Text>
      </View>
    );
  }
}
