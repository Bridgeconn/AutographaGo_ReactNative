import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class Setting extends Component {
  static navigationOptions = {
    headerTitle: 'Setting',
    headerTintColor: '#F44336'
  };
  render() {
    return (
      <View>
        <Text>
        Hello there Setting
        </Text>
      </View>
    );
  }
}
