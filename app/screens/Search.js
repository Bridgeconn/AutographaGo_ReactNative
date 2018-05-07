import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DbQueries from '../utils/dbQueries.js'

export default class Search extends Component {

  constructor(){
    super();
    this.state = {
      text:''
    }
    this.onSearchText = this.onSearchText.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  static navigationOptions = ({navigation}) =>({
    headerTitle: <TextInput
        placeholder="Search"
        style={{width:50, textAlignVertical: "top"}}
        onChangeText={(text) => this.onChangeText(text)}
        />,
    headerRight:(
      <TouchableOpacity style={{margin:8}} onPress={()=>navigation.state.params.onSearchText()}>
        <Icon name="search" size={36}/>
      </TouchableOpacity>
      )
  });
  async onSearchText(){
    console.log("waiting for search funtion ")
    // let res = DbQueries.querySearchBookWithName(this.state.text);
    // console.log("result  "+res)
  }
  onChangeText(text){
    this.setState({text})
    console.log("text")
  }
  componentDidMount(){
    this.props.navigation.setParams({onSearchText: this.onSearchText})
    this.props.navigation.setParams({onChangeText: this.onChangeText})

  }
  render() {
    return (
      <View>
       
      </View>
    );
  }
}
