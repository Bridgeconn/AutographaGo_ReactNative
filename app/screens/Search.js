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
    // this.onSearchText = this.onSearchText.bind(this)
  }

  static navigationOptions = ({navigation}) =>({
    headerTitle: (<TextInput
        placeholder="Search"
        style={{width:50, textAlignVertical: "top"}}
        onChangeText={(text) => navigation.state.params.onText(text)}
    />),
    // headerRight:(
    //     <Icon name="search" size={36} onPress={()=>navigation.state.params.onSearchText()}/>
    //   )
  })
  async onSearchText(){
    console.log("waiting for search funtion ")
    let searchResult = await DbQueries.querySearchBookWithName(this.state.text,"ULB", "ENG");
    console.log("search result "+searchResult)
     if (searchResult && searchResult.length > 0) {
       console.log("search result "+JSON.stringify(searchResult[0].bookName))
      // let result = searchResult[0].  
      // this.setState({modelData: chapters}) 
     }   
  }
  onText = (text) =>{
    this.setState({text})
    console.log("text"+this.state.text)
  }
  
  componentDidMount(){
    // console.log("props from navigation options "+this.props.navigation.state.params.text)
    this.props.navigation.setParams({onText: this.onText,onSearchText: this.onSearchText,text:this.state.text})
  }
  render() {
    return (
      <View>
      <Icon name="search" size={36} onPress={()=>this.onSearchText()}/>
      </View>
    );
  }
}
