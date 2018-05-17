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
  VirtualizedList,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DbQueries from '../utils/dbQueries.js'
import {Button,Segment} from 'native-base'
import {getBookNameFromMapping, getBookNumberFromMapping} from '../utils/UtilFunctions'
const width = Dimensions.get('window').width;

const SearchResultTypes = {
  ALL: 0,
  OT: 1,
  NT: 2
};

export default class Search extends Component {

  constructor(){
    super();
    this.state = {
      searchedResult:[],
      activeTab:SearchResultTypes.ALL,
      isLoading:false,
      tabsData:[]
    }
    this.onSearchText = this.onSearchText.bind(this)
    this.clearData = this.clearData.bind(this)
  }

  static navigationOptions = ({navigation}) =>({
    headerTitle: (<TextInput
        placeholder="Search"
        ref={ref => clear = ref}
        style={{width:width, textAlignVertical: "top"}}
        onChangeText={(text) => navigation.state.params.onTextChange(text)}
        returnKeyType="search"
        onSubmitEditing={() => navigation.state.params.onSearchText()}
    />),
    headerRight:(
        <Icon name="search" size={36} onPress={()=>navigation.state.params.clearData()}/>
      )
  })
  async onSearchText(){
    this.setState({isLoading:true, searchedResult:[], tabsData:[]})
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
          this.setState(
            // prevState =>({
            {searchedResult:[...this.state.searchedResult, reference]
          }
        )
      // )

          this.addReferenceToTab(reference)
        
      }
     }

     {
    let searchResultByVerseText = await DbQueries.querySearchVerse("ULB","ENG",this.state.text)
    
    if (searchResultByVerseText &&  searchResultByVerseText.length >0) {
     
       
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

          this.setState(
            // prevState =>({
            {searchedResult:[...this.state.searchedResult, reference]
          })
        // )

          this.addReferenceToTab(reference)
      }

     }
    }
   
     // todo fix loading true when all references added
     this.setState({isLoading:false})

  }
  clearData(){
    console.log("params value "+JSON.stringify(navigation.state))

  }
  addReferenceToTab(reference) {
    switch (this.state.activeTab) {
      case SearchResultTypes.ALL: {
        this.setState(
          // prevState =>({
          {tabsData:[...this.state.tabsData, reference]
        })
      // )
        break
      }
      case SearchResultTypes.OT: {
        if(reference.bookNumber < 40){
          this.setState(
            // prevState =>({
            {tabsData:[...this.state.tabsData, reference]
          })
        // )
        }                
        break
      }
      case SearchResultTypes.NT: {
        if(reference.bookNumber > 40){
          this.setState(
            // prevState =>({
            {tabsData:[...this.state.tabsData, reference]
          })
        // )
        }     
        break
      }
    }
  }

  renderDataOnPressTab(activeTab){
    this.setState({tabsData: []}, () => {
      switch (activeTab) {
        case SearchResultTypes.ALL: {
            this.setState({tabsData: this.state.searchedResult})
          break
        }
        case SearchResultTypes.OT: {
          let data = [];
          for(var i = 0; i < this.state.searchedResult.length ;i++ ){
            if(this.state.searchedResult[i].bookNumber < 40){
              data.push(this.state.searchedResult[i])
            }
          }
          this.setState({tabsData:data})
          break
        }
        case SearchResultTypes.NT: {
          let data = [];
          for(var i = 0; i < this.state.searchedResult.length ;i++ ){
            if(this.state.searchedResult[i].bookNumber > 40){
              data.push(this.state.searchedResult[i])
            }
          }
          this.setState({tabsData:data})
          break
        }
      }
    })
  }

  onTextChange = (text) =>{
    this.setState({text})
  }
  
  componentDidMount(){
    this.props.navigation.setParams({onTextChange: this.onTextChange,
      onSearchText: this.onSearchText,
      text:this.state.text,
      onChangeText:this.onChangeText,
      clearData:this.clearData
    })
  }

  toggleButton(activeTab){
      if (this.state.activeTab == activeTab) {
        return
      }
      this.setState({activeTab}, ()=> {
          this.renderDataOnPressTab(activeTab)
      })
  }

  noItemDisplay = () =>{
    return (
      <View style={styles.container}>
      {!this.state.isloading ?  
      <Text>No Result Found</Text>:null
      } 
      </View>
    )

  }
  render() {
    console.log("isloadoing"+this.state.isLoading+ "DATA LENGTH" +this.state.searchedResult.length)
    // console.log("searched data "+JSON.stringify(this.state.searchedResult))
    // console.log("tabs data "+JSON.stringify(this.state.tabsData))
    return (
      <View style={styles.container}>
      {/* {this.state.isLoading ?  */}
        <ActivityIndicator 
          animating={true} 
          size="large" 
          color="#0000ff" />
          {/* : */}
            <Segment style = 
            {{
              backgroundColor:"transparent", 
              borderColor:"#3F51B5",
              borderWidth:1,
              justifyContent:'space-between'
            }}>
            <Button
            onPress={this.toggleButton.bind(this,SearchResultTypes.ALL)} 
            first active={this.state.activeTab == SearchResultTypes.ALL} 
            style={{backgroundColor:this.state.activeTab == SearchResultTypes.ALL ? "#3F51B5":"#fff",height:43}}
            size={28}>
              <Text style={{color:this.state.activeTab == SearchResultTypes.ALL ? "#fff" : "#000"}}>
                All
              </Text>
            </Button>
            <Button
            onPress={this.toggleButton.bind(this,SearchResultTypes.OT)}  
            second active={!this.state.activeTab == SearchResultTypes.OT} 
            style={ {backgroundColor:this.state.activeTab  == SearchResultTypes.OT ?  "#3F51B5":"#fff",height:43}}
            >
             <Text style={{color:this.state.activeTab == SearchResultTypes.OT ? "#fff" : "#000"}}>
                Old Testament
              </Text>
            </Button>
            <Button 
            onPress={this.toggleButton.bind(this,SearchResultTypes.NT)} 
            last active={this.state.activeTab == SearchResultTypes.NT} 
            style={{backgroundColor:this.state.activeTab == SearchResultTypes.NT ? "#3F51B5":"#fff",height:43}}>
              <Text style={{color:this.state.activeTab == SearchResultTypes.NT ? "#fff" : "#000"}}>
                New Testament
              </Text>
            </Button>
            </Segment>  
           
        <FlatList
          ref={ref => this.elementIndex = ref}
          data={this.state.tabsData}
          
          renderItem={({item,index}) => 
            <View >
              <Text>{item.bookName}</Text>
              <Text style={{color:"red"}}> {item.bookName} {item.chapterNumber} : {item.verseNumber} </Text>
              <Text>{item.text}</Text>
            </View>
          }
          ListEmptyComponent={this.noItemDisplay}
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
    backgroundColor: '#F5FCFF',
  },
});




