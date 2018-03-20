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
