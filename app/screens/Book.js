import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  FlatList
} from 'react-native';

const width = Dimensions.get('window').width;

export default class Book extends Component {

  static navigationOptions = {
    headerTitle: 'Book',
  };

  constructor(){
    super()
    this.state = {
        numberOfRow:[1,2,3,4,5,6,7,8,9]
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
      <FlatList
        numColumns={4}
        data={this.state.numberOfRow}
        renderItem={({item}) => 
        <View style={{flex:0.25,borderColor:'black',borderRightWidth:1, borderBottomWidth:1,
          height:width/4, justifyContent:"center"}}>
        <Text style={{textAlign:"center",alignItems:"center"}}>{item}</Text>
      </View>}
      />
      </View>  
    );
  }
}