import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

export default class Notes extends Component {
  static navigationOptions = {
    headerTitle: 'Notes',
  };
  render() {
    return (
      <View style={{flex:1}}>
        <Text>Notes</Text>
      </View>
    );
  }
}
