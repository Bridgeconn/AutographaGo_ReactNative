import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from 'react-native';

const height = Dimensions.get('window').height-80;
const width = Dimensions.get('window').width;

export default class Book extends Component {
  static navigationOptions = {
    headerTitle: 'Book',
  };
  constructor(){
  super()
  this.state = {
      numberofCol:[1,2,3,4,5],
      numberOfRow:[1,2,3,4,5,6,7],
      number:[],
  }
}


  render() {
    return (
      <View style={{flex:1}}>
      <View style={{flex:1,flexDirection:'column',justifyContent:"center",alignItems:"center",top:0}}>
      {
        this.state.numberOfRow.map((row,index1)=>
          <View style={{flexDirection:'row',height:height/7}}>
          {
            this.state.numberofCol.map((col,index2)=>
              <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}>
                <Text style={{textAlign:"center",alignItems:"center"}}></Text>
              </View>
         )}
         </View>
      )}
      </View>
      </View>  
    );
  }
}
