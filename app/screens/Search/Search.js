import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DbQueries from '../../utils/dbQueries.js'
import { Item } from 'native-base';

export default class Search extends Component {

  constructor(){
    super();
    this.state = {
      searchedResult:[]
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
    // let searchResultByBookName = await DbQueries.querySearchBookWithName(this.state.text,"ULB", "ENG");
    let searchResultByVerseText = await DbQueries.querySearchVerse(this.state.text,"ULB", "ENG")
     if (searchResultByVerseText && searchResultByVerseText.length > 0 ) {
       console.log("search result "+JSON.stringify(searchResultByVerseText[0].text))
      this.setState({searchedResult: searchResultByVerseText}) 
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
      <FlatList
          data={this.state.searchedResult}
          renderItem={({item}) => 
          <View>
            <View>
              <Text style={{color:"red"}}> {item.bookId} {item.verseNumber} : {item.chapterNumber} </Text>
            </View>
          <Text>{item.text}</Text>
          
         
          </View>
          }/>
      </View>
    )
}
}