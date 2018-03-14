import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class Book extends Component {
  static navigationOptions = {
    headerTitle: 'Book',
    headerTintColor: '#F44336'
  };
  render() {
    return (
      <View>
        <Text>
        Hello there Book
        </Text>
      </View>
    );
  }
}
