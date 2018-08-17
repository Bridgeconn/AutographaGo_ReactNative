import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  VirtualizedList,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DbQueries from '../../utils/dbQueries.js'
import {getBookNameFromMapping, getBookNumberFromMapping, getResultText} from '../../utils/UtilFunctions'
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
      return {
        headerTitle: (
          <TextInput
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
          />
        ),
        headerRight:(
          <Icon name='cancel' size={28} style={{marginHorizontal:8}} onPress={(text)=>params.clearData()}/>
        )
      }
  }

  constructor(props){
    super(props);
    this.state = {
      searchedResult:[],
      activeTab:SearchResultTypes.ALL,
      isLoading:false,
      text:'',
      tabsData:[],
      languageCode:this.props.screenProps.languageCode,
      versionCode:this.props.screenProps.versionCode,
    }

    this.onSearchText = this.onSearchText.bind(this)
    this.toggleButton = this.toggleButton.bind(this)
    this.clearData = this.clearData.bind(this)
    this.styles = searchStyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
  }
  
  onSearchText(){
    this.setState({isLoading: true, searchedResult:[], tabsData:[]}, async () => {
      let searchResultByBookName = await DbQueries.querySearchBookWithName(this.state.versionCode, this.state.languageCode,this.state.text);
      if(searchResultByBookName && searchResultByBookName.length >0 ){
        var refList = [];
        for(var i = 0; i < searchResultByBookName.length ;i++ ){
          let reference = { bookId:searchResultByBookName[i].bookId,
            chapterNumber:1,
            verseNumber:"1",
            versionCode:this.state.versionCode,
            languageCode:this.state.languageCode,
            type: 'v',
            text: '',
            highlighted: 'false' 
          }
          refList.push(reference);
        }
        this.setState({searchedResult: refList})
        this.addRefListToTab(refList)
      }
      let searchResultByVerseText = await DbQueries.querySearchVerse(this.state.versionCode, this.state.languageCode,this.state.text)
      if (searchResultByVerseText &&  searchResultByVerseText.length >0) {
        this.setState({searchedResult:[...this.state.searchedResult, ...searchResultByVerseText]})
        this.addRefListToTab(searchResultByVerseText)
      }
      this.setState({isLoading:false})
    })
  }

  clearData() {
    this.props.navigation.setParams({text: ''})
    if(this.state.text){
      this.setState({text:""})
    }
  }

  addRefListToTab(list) {
    switch (this.state.activeTab) {
      case SearchResultTypes.ALL: {
        this.setState({tabsData:[...this.state.tabsData, ...list]})
        break;
      }
      case SearchResultTypes.OT: {
        let reflist = [];
        for (var i=0; i<list.length;i++) {
          if(getBookNumberFromMapping(list[i].bookId) < 40){
            reflist.push(list[i])
          }
        }
        this.setState({tabsData:[...this.state.tabsData, ...reflist]})
        break;
      }
      case SearchResultTypes.NT: {
        let reflist = [];
        for (var i=0; i<list.length;i++) {
          if(getBookNumberFromMapping(list[i].bookId) > 40){
            reflist.push(list[i])
          }
        }
        this.setState({tabsData:[...this.state.tabsData, ...reflist]})
        break;
      }
    }
  }

  renderDataOnPressTab(activeTab) {
    this.setState({tabsData: []}, () => {
      switch (activeTab) {
        case SearchResultTypes.ALL: {
            this.setState({tabsData: this.state.searchedResult})
          break;
        }
        case SearchResultTypes.OT: {
          let data = [];
          for(var i = 0; i < this.state.searchedResult.length ;i++ ){
            if(getBookNumberFromMapping(this.state.searchedResult[i].bookId) < 40){
              data.push(this.state.searchedResult[i])
            }
          }
          this.setState({tabsData:data})
          break;
        }
        case SearchResultTypes.NT: {
          let data = [];
          for(var i = 0; i < this.state.searchedResult.length ;i++ ){
            if(getBookNumberFromMapping(this.state.searchedResult[i].bookId) > 40){
              data.push(this.state.searchedResult[i])
            }
          }
          this.setState({tabsData:data})
          break;
        }
      }
    })
  }

  onTextChange = (text) =>{
    this.props.navigation.setParams({text: text})
    this.setState({text})
  }
  
  componentDidMount() {
    this.props.navigation.setParams({
      onTextChange: this.onTextChange,
      onSearchText: this.onSearchText,
      onChangeText:this.onChangeText,
      clearData:this.clearData,
      headerStyle:this.styles.headerText,
    })
  }

  toggleButton(activeTab){
    if (this.state.activeTab == activeTab) {
      return;
    }
    this.setState({activeTab}, ()=> {
        this.renderDataOnPressTab(activeTab)
    })
  }

  ListEmptyComponent = () => {
    return (
      <View style={this.styles.ListEmptyContainer}>
        { this.state.isLoading == false && this.state.tabsData == null 
          ? <Text>No Result Found</Text>
          : null
        }
      </View>
    )
  }

  ListFooterComponent = () => {
    return(
      <View>
        { this.state.isLoading 
          ? <Text>Loading...</Text>
          : null
        }
      </View>
    )
  }

  searchedData = ({item,index}) => {
    return (
      <TouchableOpacity style={this.styles.searchedDataContainer} 
        onPress={()=>this.props.navigation.navigate('Book', {bookId: item.bookId, 
          bookName: getBookNameFromMapping(item.bookId), 
          chapterNumber: item.chapterNumber, verseNumber: item.verseNumber})}>
        <Text style={this.styles.searchedData}> 
          {getBookNameFromMapping(item.bookId)} {item.chapterNumber} : {item.verseNumber} 
        </Text>
        <Text style={this.styles.textStyle}>{getResultText(item.text)}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    let text = this.state.isLoading == true ? "Loading..." : this.state.tabsData.length + " search results found"
    return (
      <View style={this.styles.container}>
        <SearchTab
          toggleFunction={this.toggleButton}
          activeTab={this.state.activeTab}
        />
        <Text style={this.styles.textLength}>{text}</Text>
        <FlatList
          ref={ref => this.elementIndex = ref}
          data={this.state.tabsData}
          renderItem={this.searchedData}
          ListEmptyComponent={this.ListEmptyComponent}
          ListFooterComponent={this.ListFooterComponent}
        />
      </View>
    )
  }
}