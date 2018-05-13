import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DbQueries from '../utils/dbQueries.js'
import {Button,Segment} from 'native-base'

export default class Search extends Component {

  constructor(){
    super();
    this.state = {
      searchedResult:[],
      activeTab:0,
      isLoading:false
    }
    this.onSearchText = this.onSearchText.bind(this)
  }

  static navigationOptions = ({navigation}) =>({
    headerTitle: (<TextInput
        placeholder="Search"
        style={{width:50, textAlignVertical: "top"}}
        onChangeText={(text) => navigation.state.params.onText(text)}
        returnKeyType="search"
        onSubmitEditing={() => navigation.state.params.onSearchText()}
    />)
  //   headerRight:(
  //       <Icon name="search" size={36} onPress={()=>navigation.state.params.onSearchText()}/>
  //     )
  })
  async onSearchText(){
    this.setState({isLoading:true})
    console.log("waiting for search funtion ")
    let searchResultByBookName = await DbQueries.querySearchBookWithName("ULB", "ENG",this.state.text);
    let searchResultByVerseText = await DbQueries.querySearchVerse("ULB","ENG",this.state.text)
  
    if(searchResultByBookName && searchResultByBookName.length>0){
      for(var i = 0 ; i < searchResultByBookName.length ;i++ ){
     console.log("bookName "+searchResultByBookName[0].bookName)
      this.setState({searchedResult:[{bookName:searchResultByBookName[i].bookName}]})
      }
     }
    if (searchResultByVerseText && searchResultByVerseText.length > 0 ) {
      for(var i = 0 ; i < searchResultByVerseText.length ;i++ ){
        this.setState({searchedResult: this.state.searchedResult.concat([{text:searchResultByVerseText[i].text,bookId:searchResultByVerseText[i].bookId,verseNumber:searchResultByVerseText[i].verseNumber,chapterNumber:searchResultByVerseText[i].chapterNumber}])})
      }
      // console.log("serachd result verse text is coming value of  "+JSON.stringify(searchResultByVerseText[0].text))
        // console.log("serachd result verse text "+JSON.stringify(searchResultByVerseText[0].text))
       
     }   
     this.setState({isLoading:false})
      
     
  }
  onText = (text) =>{
    this.setState({text})
    console.log("text"+this.state.text)
  }
  
  componentDidMount(){
    // console.log("props from navigation options "+this.props.navigation.state.params.text)
    this.props.navigation.setParams({onText: this.onText,onSearchText: this.onSearchText,text:this.state.text})
  }
toggleButton(button){
  console.log("button active"+button)
    this.setState({activeTab:button})
}
  render() {
    console.log("isloadoing"+this.state.isLoading)
    return (
      <View style={styles.container}>
      {this.state.isLoading ? 
        <ActivityIndicator 
          animating={this.state.isLoading ? true : false} 
          size="large" 
          color="#0000ff" />
          :
      <FlatList
       removeClippedSubviews={false}
          data={this.state.searchedResult}
          renderItem={({item}) => 
          <View>
          <Text>{item.bookName}</Text>
          <Text style={{color:"red"}}> {item.bookId} : {item.verseNumber} : {item.chapterNumber} </Text>
          <Text>{item.text}</Text>
          </View>
          }
          ListHeaderComponent={this.state.searchedResult.length !== 0  ?
            <Segment style = 
            {{
              backgroundColor:"transparent", 
              borderColor:"#3F51B5",
              borderWidth:1,
              margin:8,
              justifyContent:'space-between'
            }}>
            <Button
            onPress={this.toggleButton.bind(this,0)} 
            first active={this.state.activeTab == 0} 
            style={{backgroundColor:this.state.activeTab == 0 ? "#3F51B5":"#fff",height:43}}
            size={28}
            >
              <Text style={{color:this.state.activeTab == 0 ? "#fff" : "#000"}}>
                All
              </Text>
            </Button>
            <Button
            onPress={this.toggleButton.bind(this,1)}  
            second active={!this.state.activeTab == 1} 
            style={ {backgroundColor:this.state.activeTab  == 1 ?  "#3F51B5":"#fff",height:43}}
            >
             <Text style={{color:this.state.activeTab == 1 ? "#fff" : "#000"}}>
                New Testament
              </Text>
            </Button>
            <Button 
            onPress={this.toggleButton.bind(this,2)} 
            last active={this.state.activeTab == 2} 
            style={{backgroundColor:this.state.activeTab == 2 ? "#3F51B5":"#fff",height:43}}
            >
              <Text style={{color:this.state.activeTab == 2? "#fff" : "#000"}}>
                Old Testament
              </Text>
            </Button>
            </Segment> :null  }
          />
        }
      </View>
      
    )
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});




