import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class BookMarks extends Component {
  static navigationOptions = {
    headerTitle: 'Bookmarks',
  };
  render() {
    return (
      <View>
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
