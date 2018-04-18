import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Notes extends Component {
  static navigationOptions = {
    headerTitle: 'Notes',
    headerRight:(
      <TouchableOpacity style={{margin:8}}>
         <Text style={{fontSize:12,color:'#fff'}}>DONE</Text>
     </TouchableOpacity>
)
  };
  render() {
    return (
     <View style={{flex:1}}>
     <TextInput placeholder="Title"/>
     <Icon name="add-circle" size={24} style={{alignSelf:"flex-end",margin:8}}/>
     <TextInput placeholder="Note" style={{borderTopColor:'#000'}}/>
     </View> 
    )
  }
}
