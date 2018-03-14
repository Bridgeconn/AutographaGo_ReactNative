import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class BookMarks extends Component {
  static navigationOptions = {
    headerTitle: 'BookMarks',
    headerTintColor: '#F44336'
  };
  render() {
    return (
      <View>
        <Text>
        Hello there BookMarks
        </Text>
      </View>
    );
  }
}
