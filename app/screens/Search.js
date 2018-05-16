import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  VirtualizedList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DbQueries from '../utils/dbQueries.js'
import {Button,Segment} from 'native-base'
import {getBookNameFromMapping, getBookNumberFromMapping} from '../utils/UtilFunctions'


export default class Search extends Component {

  constructor(){
    super();
    this.state = {
      searchedResult:[],
      displaySearchResults: [],
      activeTab:0,
      isLoading:false,
      tabsData:[]
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
    let searchResultByBookName = await DbQueries.querySearchBookWithName("ULB", "ENG",this.state.text);
    
    if(searchResultByBookName && searchResultByBookName.length >0 ){
      for(var i = 0; i < searchResultByBookName.length ;i++ ){
        let reference = {bookId:searchResultByBookName[i].bookId,
        bookName:getBookNameFromMapping(searchResultByBookName[i].bookId),
        bookNumber: getBookNumberFromMapping(searchResultByBookName[i].bookId),
        chapterNumber:1,
        verseNumber:"1",
        versionCode:'ULB',
        languageCode:'ENG',
        type: 'v',
          text: 'ASDXFCGVBHNM',
          highlighted: 'false'}
          this.setState(prevState =>({
            searchedResult:[...prevState.searchedResult, reference]
          }))
        
      }
     }

    let searchResultByVerseText = await DbQueries.querySearchVerse("ULB","ENG",this.state.text)
    
    if (searchResultByVerseText &&  searchResultByVerseText.length >0) {
      // let searchedResult = [...this.state.searchedResult]
      // searchedResult = searchedResult.concat(searchResultByVerseText)
      // this.setState({searchedResult})
      
      // for(var i = 0 ; i < searchResultByVerseText.length ;i++ ){
      //   this.setState({searchedResult: this.state.searchedResult.concat([{text:searchResultByVerseText[i].text,bookId:searchResultByVerseText[i].bookId,verseNumber:searchResultByVerseText[i].verseNumber,chapterNumber:searchResultByVerseText[i].chapterNumber}])})
      // }
       
      for(var i = 0; i < searchResultByVerseText.length ;i++ ){
        let reference = {bookId:searchResultByVerseText[i].bookId,
        bookName:getBookNameFromMapping(searchResultByVerseText[i].bookId),
        bookNumber:getBookNumberFromMapping(searchResultByVerseText[i].bookId),
        chapterNumber:searchResultByVerseText[i].chapterNumber,
        verseNumber:searchResultByVerseText[i].verseNumber,
        versionCode:searchResultByVerseText[i].versionCode,
        languageCode:searchResultByVerseText[i].languageCode,
        type: searchResultByVerseText[i].type,
          text: searchResultByVerseText[i].text,
          highlighted: searchResultByVerseText[i].highlighted}

          this.setState(prevState =>({
            searchedResult:[...prevState.searchedResult, reference]
          }))
      }

     }
   

     this.setState({isLoading:false})
  }
  renderDataOnPressTab(activeTab){
    for(var i = 0; i < this.state.searchedResult.length ;i++ ){
      if(this.state.searchedResult[i].bookNumber > 39 && activeTab == 1){
            console.log("data from 41 "+JSON.stringify(this.state.searchedResult[i].bookNumber))
            console.log ("book "+this.state.searchedResult[i])
            let tabData1 = this.state.searchedResult[i]
            this.state.searchedResult.splice(i, 1);
            // console.log("data moved "+JSON.stringify(data))
            this.setState({tabsData:this.state.tabsData.push(tabData1)})
            console.log("data from TAB 1 "+JSON.stringify(this.state.tabsData))
        }
      }

    
  }
  onText = (text) =>{
    this.setState({text})
  }
  
  componentDidMount(){
    this.props.navigation.setParams({onText: this.onText,onSearchText: this.onSearchText,text:this.state.text})
  }
  toggleButton(activeTab){
      // if(this.state.searchedResult[i].bookNumber == 41){
      //   console.log ( "book number "+this.state.searchedResult[i].bookName)
      // }
      this.renderDataOnPressTab(activeTab)
    // console.log("button active"+button)
      this.setState({activeTab:activeTab})
      // this.elementIndex.scrollToIndex({index:39,viewPosition:0, animated: true,viewOffset:0})
      // if(button == 1){
        // this.elementIndex.scrollToIndex({index:0,viewPosition:0,animated: true,viewOffset:0})
      // }
  }

  
  render() {
    console.log("isloadoing"+this.state.isLoading)
    console.log("tabs data  "+JSON.stringify(this.state.tabsData))
    return (
      <View style={styles.container}>
      {/* {this.state.isLoading ?  */}
        {/* <ActivityIndicator 
          animating={this.state.isLoading ? true : false} 
          size="large" 
          color="#0000ff" /> */}
          {/* : */}
            <Segment style = 
            {{
              backgroundColor:"transparent", 
              borderColor:"#3F51B5",
              borderWidth:1,
              justifyContent:'space-between'
            }}>
            <Button
            onPress={this.toggleButton.bind(this,0)} 
            first active={this.state.activeTab == 0} 
            style={{backgroundColor:this.state.activeTab == 0 ? "#3F51B5":"#fff",height:43}}
            size={28}>
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
            style={{backgroundColor:this.state.activeTab == 2 ? "#3F51B5":"#fff",height:43}}>
              <Text style={{color:this.state.activeTab == 2? "#fff" : "#000"}}>
                Old Testament
              </Text>
            </Button>
            </Segment>             
        <FlatList
          ref={ref => this.elementIndex = ref}
          data={this.state.activeTab == 1 ?  this.state.tabsData : this.state.searchedResult}
          renderItem={({item,index}) => 
          <View>
          <Text>{item.bookName}</Text>
          <Text style={{color:"red"}}> {item.bookName} : {item.verseNumber} : {item.chapterNumber} </Text>
          <Text>{item.text}</Text>
          </View>
          }
          />
        {/* } */}
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




