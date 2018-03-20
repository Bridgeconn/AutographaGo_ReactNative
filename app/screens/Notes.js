import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Notes extends Component {
  static navigationOptions = {
    headerTitle: 'Notes',
  };
  render() {
    return (
      <View style={{flex:1}}>
      <View style={{flexDirection:'row', justifyContent: 'space-between',margin:16}}>
          <Text style={{fontSize:18}}>jgjf</Text>
          <Icon name='delete-forever' size={28} />
      </View>
      <View style={{flexDirection:'row', justifyContent: 'space-between',margin:16}}>
          <Text style={{fontSize:18}}>jgjf</Text>
          <Icon name='delete-forever' size={28} />
      </View>
      </View>
    );
  }
}
