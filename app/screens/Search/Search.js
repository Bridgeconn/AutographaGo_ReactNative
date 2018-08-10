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
import DbQueries from '../../utils/dbQueries.js'
import {getBookNameFromMapping, getBookNumberFromMapping} from '../../utils/UtilFunctions'
const width = Dimensions.get('window').width-20;
import SearchTab from '../../components/SearchTab/SearchTab'
import { Segment } from 'native-base';
import {searchStyle} from './styles'
 
const SearchResultTypes = {
  ALL: 0,
  OT: 1,
  NT: 2
};

export default class Search extends Component {
  
  static navigationOptions = ({navigation}) =>{
      const { params = {} } = navigation.state;
      console.log("props navigation iportion "+JSON.stringify(navigation))
      return {
        headerTitle: (<TextInput
          placeholder="Search"
          underlineColorAndroid = 'transparent'
          style={{color:'white',width:Dimensions.get('window').width-90}}
          onChangeText={(text) =>params.onTextChange(text)}
          placeholderTextColor={'#fff'} 
          returnKeyType="search"
          multiline={false}
          numberOfLines={1}
          value={params.text}
          onSubmitEditing={() => params.onSearchText()}
      />),
      headerRight:(
          <Icon name='cancel' size={28} style={{marginHorizontal:8}} onPress={(text)=>params.clearData()}/>
        )
      }
    }
  


  constructor(props){
    super(props);
    console.log("props value "+JSON.stringify(this.props))
    this.state = {
      searchedResult:[],
      activeTab:SearchResultTypes.ALL,
      isLoading:false,
      text:'',
      tabsData:[]
    }
    this.onSearchText = this.onSearchText.bind(this)
    this.toggleButton = this.toggleButton.bind(this)
    this.clearData = this.clearData.bind(this)
    this.styles = searchStyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
  }

  
 onSearchText(){
    this.setState({isLoading: true}, async () => {
      this.setState({isLoading:true,searchedResult:[], tabsData:[] })
      let searchResultByBookName = await DbQueries.querySearchBookWithName("ULB", "ENG",this.state.text);
      if(searchResultByBookName && searchResultByBookName.length >0 ){
        for(var i = 0; i < searchResultByBookName.length ;i++ ){
          let reference = { bookId:searchResultByBookName[i].bookId,
            bookName:getBookNameFromMapping(searchResultByBookName[i].bookId),
            bookNumber: getBookNumberFromMapping(searchResultByBookName[i].bookId),
            chapterNumber:1,
            verseNumber:"1",
            versionCode:'ULB',
            languageCode:'ENG',
            type: 'v',
            text: '',
            highlighted: 'false' }
            this.setState(
              {searchedResult:[...this.state.searchedResult, reference]
            }
          )
  
            this.addReferenceToTab(reference)
          
        }
       }
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
 
   this.setState({isLoading:false})
    })
      

  }
  clearData(){
    console.log("hi ")
    this.props.navigation.setParams({
      text: ''
    })
    if(this.state.text){
      this.setState({text:""})
    }
  }
  addReferenceToTab(reference) {
    console.log("reference " +reference)
    switch (this.state.activeTab) {
      case SearchResultTypes.ALL: {
        this.setState(
          {tabsData:[...this.state.tabsData, reference]
        })
        break
      }
      case SearchResultTypes.OT: {
        if(reference.bookNumber < 40){
          this.setState(
            {tabsData:[...this.state.tabsData, reference]
          })
        }                
        break
      }
      case SearchResultTypes.NT: {
        if(reference.bookNumber > 40){
          this.setState(
            {tabsData:[...this.state.tabsData, reference]
          })
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
    console.log("text value "+text)
    this.props.navigation.setParams({
      text: text
    })
    this.setState({text})
  }
  
  componentDidMount(){
    this.props.navigation.setParams({
      onTextChange: this.onTextChange,
      onSearchText: this.onSearchText,
      onChangeText:this.onChangeText,
      clearData:this.clearData,
      headerStyle:this.styles.headerText,
    })
    console.log("props of navigation option"+JSON.stringify(this.props.navigation))
    // console.log("value of navigationOprion "+this.props.navigation.getParams())
  }

  toggleButton(activeTab){
    console.log("toggle function "+activeTab)
      if (this.state.activeTab == activeTab) {
        console.log(" this.state.activeTab "+this.state.activeTab+ " active tab " +activeTab)
        return
      }
      this.setState({activeTab}, ()=> {
          this.renderDataOnPressTab(activeTab)
      })
  }

  ListEmptyComponent = () =>{
    return (
      <View style={this.styles.ListEmptyContainer}>
      {this.state.isLoading == false && this.state.tabsData == null ? 
      <Text>No Result Found</Text>:null
      } 
      </View>
    )
  }
  ListFooterComponent = ()=>{
    return(
    <View>
      { this.state.isLoading ?
        <Text>Loading...</Text>
        :null
      }
    </View>
    )
  }
  searchedData = ({item,index}) => {
    return (
      <View style={this.styles.searchedDataContainer}>
        <Text
          style={this.styles.searchedData}
        > 
          {item.bookName} {item.chapterNumber} : {item.verseNumber} 
        </Text>
        <Text style={this.styles.textStyle}>{item.text}</Text>
      </View>
  )
}
  render() {
    return (
      <View style={this.styles.container}>
        <SearchTab
         toggleFunction={this.toggleButton}
         activeTab={this.state.activeTab}
        />
        <Text style={this.styles.textLength}>{this.state.tabsData.length} search results found</Text>
        {
          this.state.isLoading ? <ActivityIndicator
          animating={true} 
          size="large" 
          color="#0000ff" /> :
          <FlatList
          ref={ref => this.elementIndex = ref}
          data={this.state.tabsData}
          renderItem={this.searchedData}
          ListEmptyComponent={this.ListEmptyComponent}
          ListFooterComponent={this.ListFooterComponent}
          />
        }
        
        
      </View>
      
    )
}
}
