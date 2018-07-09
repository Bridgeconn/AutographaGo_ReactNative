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
    console.log("props navigation home")
    return{
      headerTitle: 'Autographa Go',
      headerRight:(
          <TouchableOpacity onPress={() =>{navigation.navigate('Language')}}>
            <Text style={{color:"#fff",margin:8}}>{navigation.state.params.bibleLanguage} {navigation.state.params.bibleVersion}</Text>
          </TouchableOpacity>
        )
      }
  }

  constructor(props){
    super(props)
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)

    this.state = {
      colorFile:this.props.screenProps.colorFile,
      sizeFile:this.props.screenProps.sizeFile,
      lastRead:this.props.screenProps.lastRead,
      bibleLanguage:this.props.screenProps.languageCode,
      bibleVersion:this.props.screenProps.versionCode,
      activeTab:true,
      iconPress: [],
      booksList: this.props.screenProps.booksList,
    }
    console.log("IN HOME, bok len"  + this.props.screenProps.booksList.length)

    this.styles = homePageStyle(this.state.colorFile, this.state.sizeFile);
    
    this.viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
        waitForInteraction: true
    }

  }
  toggleButton(value){
    this.setState({activeTab:value})
    if(value == false){
      console.log("pressed")
      this.flatlistRef.scrollToIndex({index:39,viewPosition:0,animated: false,viewOffset:0})
    }
    else{
      this.flatlistRef.scrollToIndex({index:0,viewPosition:0,animated: false,viewOffset:0})
    }
  }
 
   componentWillReceiveProps(props){
    console.log("WILLLLL recievr props  version "+JSON.stringify(props))
     this.setState({
      colorFile:props.screenProps.colorFile,
      sizeFile:props.screenProps.sizeFile,
      lastRead: props.screenProps.lastRead,
      bibleVersion:props.screenProps.versionCode,
      bibleLanguage:props.screenProps.bibleLanguage
    })
   
    // this.props.navigation.setParams({bibleLanguage: this.props.screenProps.languageCode, 
    //   bibleVersion: this.props.screenProps.versionCode})
    

    this.styles = homePageStyle(props.screenProps.colorFile, props.screenProps.sizeFile,this.state.activeTab);   
  }
 
  getItemLayout = (data, index) => (
    { length: 48, offset: 48 * index, index }
  )

  handleScroll = (event)=>{
     console.log(event.nativeEvent.contentOffset.y+ "  index value")  
  }

  _onViewableItemsChanged = (info) => {
    console.log("viewable item : " + JSON.stringify(info.viewableItems))
    console.log("changed item : " + JSON.stringify(info.changed))
  }

  handleViewableItemsChanged = ({viewableItems }) => {
    console.log("handleViewableItemsChanged.. "+viewableItems)
    // console.log("handleViewableItemsChanged changes.. "+changed)
  }

componentDidMount(){
  // this.props.navigation.setParams({styles:this.styles})
  this.props.navigation.setParams({bibleLanguage: this.props.screenProps.languageCode, 
    bibleVersion: this.props.screenProps.versionCode})
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

  handlePressIn() {

  }

  handlePressOut(){
    
  }
  

  render(){
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
            <Segment style={this.styles.segmentCustom}>
              <Button 
                active={this.state.activeTab} 
                style={[
                  {backgroundColor:this.state.activeTab ?  "#3F51B5":"#fff"},
                  this.styles.segmentButton
                ]} 
                onPress={this.toggleButton.bind(this,true)
                }
              >
                <Text 
                  style={{color:this.state.activeTab? "#fff" : "#3F51B5"
                  }}>
                  Old Testament
                </Text>
              </Button>
              <Button 
                active={!this.state.activeTab} 
                style={[
                  {backgroundColor:this.state.activeTab ?  "#fff" : "#3F51B5"},  
                  this.styles.segmentButton
                ]} 
                onPress={this.toggleButton.bind(this,false)}>
                <Text 
                  active={!this.state.activeTab} 
                  style={
                    {
                    color:!this.state.activeTab ? "#fff":"#3F51B5" 
                  }
                  }>
                  New Testament
                </Text>
              </Button>
            </Segment>
            <FlatList
              ref={ref => this.flatlistRef = ref}
              data={this.state.booksList}
              getItemLayout={this.getItemLayout}
              // onScroll={this.handleScroll}
              renderItem={this.renderItem}
              extraData={this.styles}
              // onViewableItemsChanged={this.handleViewableItemsChanged}
              // viewabilityConfig={this.viewabilityConfig}
            />
        </View> 
      </View>
    );
  }
};

