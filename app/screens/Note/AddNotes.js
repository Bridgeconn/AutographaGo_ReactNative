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
import { HeaderBackButton } from 'react-navigation';

export default class Notes extends Component {
  
  constructor(){
    super();
    this.state = {
        value:1
    }
  }
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Notes',
    headerLeft:(<HeaderBackButton style={{color:"#fff"}} onPress={()=>console.log("navigation"+JSON.stringify(navigation))} />),
    headerRight:(
      <TouchableOpacity style={{margin:8}}>
         <Text style={{fontSize:12,color:'#fff'}}>DONE</Text>
     </TouchableOpacity>
    )
  });
  render() {
    return (
     <View style={{flex:1}}>
     <TextInput placeholder="Title"/>
     <View style={{borderBottomWidth:1,borderTopWidth:1,borderColor:'#000'}}>
     <Icon name="add-circle" size={24} style={{alignSelf:"flex-end",margin:8}}/>
     </View>
     <TextInput placeholder="Note" style={{borderTopColor:'#000'}}/>
     </View> 
    )
  }
}
