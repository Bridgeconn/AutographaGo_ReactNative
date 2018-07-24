import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import DbQueries from '../../utils/dbQueries'
import USFMParser from '../../utils/USFMParser'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Segment,Button,Tab,Tabs} from 'native-base'
import { homePageStyle } from './styles.js';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')
import {getBookNameFromMapping} from '../../utils/UtilFunctions'
import {nightColors, dayColors} from '../../utils/colors.js'
import FixedSidebar from '../../components/FixedSidebar/FixedSidebar'
import {constantFont} from '../../utils/dimens.js'

export default class Home extends Component {

  static navigationOptions = ({navigation}) =>{
    const { params = {} } = navigation.state;
    console.log("props navigation VALUE "+JSON.stringify(navigation.state.params))
    return{
      headerTitle: (
              <TouchableOpacity onPress={() =>{navigation.navigate("About")}} >
                <Text style={{color:'white',fontSize:20,marginHorizontal:16,fontWeight:'500'}}>Autographa Go</Text>
              </TouchableOpacity>),
      headerRight:(
          <TouchableOpacity onPress={() =>{navigation.state.params.openLanguages()}} >
            <Text style={params.headerRightText}>{params.bibleLanguage} {params.bibleVersion}</Text>
          </TouchableOpacity>
        )
      }
  }

  constructor(props){
    super(props)

    this.state = {
      colorFile:this.props.screenProps.colorFile,
      sizeFile:this.props.screenProps.sizeFile,
      colorMode:this.props.screenProps.colorMode,
      lastRead:this.props.screenProps.lastRead,
      bibleLanguage:this.props.screenProps.languageName,
      bibleVersion:this.props.screenProps.versionCode,
      activeTab:true,
      iconPress: [],
      booksList: this.props.screenProps.booksList,
      OTSize:0,
      NTSize:0
    }
    console.log("IN HOME, bok len"  + this.props.screenProps.booksList.length)
    console.log("IN HOME, ACTIVE TAB"  + this.state.activeTab)
    this.styles = homePageStyle(this.state.colorFile, this.state.sizeFile);
    
    this.viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
        waitForInteraction: true
    }

    this.setState({OTSize:this.getOTSize(this.props.screenProps.booksList),
      NTSize:this.getNTSize(this.props.screenProps.booksList)})

      this.viewabilityConfig = {
        itemVisiblePercentThreshold: 100
      }
  }

  toggleButton(value){
    this.setState({activeTab:value})
    if(value == false){
      console.log("pressed")
      this.flatlistRef.scrollToIndex({index:this.state.OTSize,viewPosition:0,animated: false,viewOffset:0})
    }
    else{
      this.flatlistRef.scrollToIndex({index:0,viewPosition:0,animated: false,viewOffset:0})
    }
  }
  
  updateLanguage = (language,version) =>{
    this.props.navigation.setParams({
      bibleLanguage: language,
      bibleVersion: version
    })
  }

  openLanguages = ()=>{
    this.props.navigation.navigate("Language", {updateLanguage:this.updateLanguage})
  } 

   componentWillReceiveProps(props){
    console.log("WILLLLL recievr props  version "+JSON.stringify(props))
     this.setState({
      colorFile:props.screenProps.colorFile,
      colorMode: props.screenProps.colorMode,
      sizeFile:props.screenProps.sizeFile,
      lastRead: props.screenProps.lastRead,
      booksList: this.props.screenProps.booksList,
      OTSize:this.getOTSize(this.props.screenProps.booksList),
      NTSize:this.getNTSize(this.props.screenProps.booksList)
      
    })
    console.log("OT SIZE " +this.state.OTSize)
   
    this.styles = homePageStyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
  }
 
  getItemLayout = (data, index) => (
    { length: 48, offset: 48 * index, index }
  )

  componentDidMount(){
    this.props.navigation.setParams({
      bibleLanguage: this.props.screenProps.languageName, 
      bibleVersion: this.props.screenProps.versionCode,
      openLanguages: this.openLanguages,
      headerRightText:this.styles.headerRightText

    })
  }

renderItem = ({item, index})=> {
    return (
      <TouchableOpacity 
          onPress={
            ()=>this.props.navigation.navigate('ChapterSelection', {bookId: item.bookId, 
                bookName: item.bookName, bookIndex: index, numOfChapters: item.numOfChapters})
          }>
          <View 
            style={this.styles.bookList}>
            <Text
              style={
                this.styles.textStyle
              }>
              {item.bookName}
            </Text>
            <Icon 
              name='chevron-right' 
              color="gray" 
              style={this.styles.iconCustom}
              />
          </View>
        </TouchableOpacity>
    );
  }

  getOTSize(bookList){
    var count = 0;
    for(var i=0 ; i<bookList.length ; i++){
      if(bookList[i].bookNumber <= 39){
        count ++;
      }
      else{
        break;
      }

    }
    return count 
  }

  getNTSize(bookList){
    var count = 0;
    for(var i=bookList.length-1 ; i>=0 ; i--){
      if(bookList[i].bookNumber >= 41){
        count++
      }
      else{
        break;
      }
    }
    return count 
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
      console.log("Visible items are", viewableItems);
      if (viewableItems.length > 0) {
        if (viewableItems[0].index < this.state.OTSize) {
          // toggel to OT
          this.setState({activeTab:true})
        } else {
          // toggle to NT
          this.setState({activeTab:false})
        }
      }
  }


  render(){
    let activeBgColor = 
      this.state.colorMode == AsyncStorageConstants.Values.DayMode ? '#3F51B5' : '#fff'
    let inactiveBgColor = 
      this.state.colorMode == AsyncStorageConstants.Values.DayMode ? '#fff' : '#3F51B5'
   
   
    return (
      <View style={this.styles.container}>
        <FixedSidebar 
          onPress={(icon)=>{
            this.props.navigation.navigate(
              icon,
              { languageCode:this.state.lastRead.languageCode,
                versionCode:this.state.lastRead.versionCode,
                bookId:this.state.lastRead.bookId,
                chapterNumber:this.state.lastRead.chapterNumber,
                bookName:getBookNameFromMapping(this.state.lastRead.bookId)
              })}}
          doAnimate = {false}
        />
        <View style={this.styles.bookNameContainer}>
            <Segment>
              {
                this.state.OTSize > 0 
              ?
              <Button 
                active={this.state.activeTab} 
       
                style={[{
                  backgroundColor: this.state.activeTab ? activeBgColor : inactiveBgColor
                  },this.styles.segmentButton]} 
                onPress={this.toggleButton.bind(this,true)
                }
              >
                <Text 
                  style={{color:this.state.activeTab ? inactiveBgColor : activeBgColor
                  }}>
                  Old Testament
                </Text>
              </Button>
              : null}
              {
                this.state.NTSize > 0 

              ?
              <Button 
                active={!this.state.activeTab} 
                style={[{backgroundColor: !this.state.activeTab ? activeBgColor : inactiveBgColor},this.styles.segmentButton]} 
                onPress={this.toggleButton.bind(this,false)}>
                <Text 
                  active={!this.state.activeTab} 
                  style={
                    {
                      color:!this.state.activeTab ? inactiveBgColor : activeBgColor
                  }
                  }>
                  New Testament
                </Text>
              </Button>
              :null}
            </Segment>
            <FlatList
              ref={ref => this.flatlistRef = ref}
              data={this.state.booksList}
              getItemLayout={this.getItemLayout}
              onScroll={this.handleScroll}
              renderItem={this.renderItem}
              extraData={this.styles}
                  
              onViewableItemsChanged={this.onViewableItemsChanged}
              viewabilityConfig={this.viewabilityConfig}
              // onViewableItemsChanged={this.handleViewableItemsChanged}
            />
        </View> 
      </View>
    );
  }
}

