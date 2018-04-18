import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Notes extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Notes',
    headerRight:(
      <TouchableOpacity style={{margin:8}} onPress={() => navigation.navigate('AddNotes')}>
         <Icon name="note-add" size={24} color="#fff"/>
     </TouchableOpacity>
)
  });
  render() {
    return (
      <View style={{flex:1}}>
        <Text>Notes</Text>
      </View>
    );
  }
}
