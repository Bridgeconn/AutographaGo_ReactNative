import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class About extends Component {
  static navigationOptions = {
    headerTitle: 'About',
  };
  render() {
    return (
      <View>
        <Text>
        Hello there About
        </Text>
      </View>
    );
  }
}
