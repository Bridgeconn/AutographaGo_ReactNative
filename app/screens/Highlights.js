import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class HighLights extends Component {
  static navigationOptions = {
    headerTitle: 'HighLights',
    headerTintColor: '#F44336'
  };
  render() {
    return (
      <View>
        <Text>
        Hello there HighLights
        </Text>
      </View>
    );
  }
}
