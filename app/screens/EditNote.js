import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class EditNote extends Component {
  static navigationOptions = {
    headerTitle: 'EditNote',
  };
  render() {
    return (
      <View>
        <Text>
        Hello there EditNote
        </Text>
      </View>
    );
  }
}
