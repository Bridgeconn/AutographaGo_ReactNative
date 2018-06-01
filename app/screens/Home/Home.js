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

export default class Home extends Component {
  static navigationOptions = {
    headerTitle: 'Autographa Go',
  };

  constructor(props){
    super(props)
    console.log("last read in home page "+this.props.screenProps.lastRead.versionCode)
    console.log("last read in home page "+this.props.screenProps.lastRead.chapterNumber)
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)

    this.state = {
      colorFile:this.props.screenProps.colorFile,
      sizeFile:this.props.screenProps.sizeFile,
      lastRead:this.props.screenProps.lastRead,
      activeTab:true,
      iconPress: [],
      booksList: this.props.screenProps.booksList,
    }

    this.styleFile = homePageStyle(this.state.colorFile, this.state.sizeFile);
    
    this.viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
        waitForInteraction: true
    }
  }

  toggleButton(value){
    this.setState({activeTab:value})
    if(value == false){
      console.log("pressed")
      this.elementIndex.scrollToIndex({index:39,viewPosition:0,animated: true,viewOffset:0})
    }
    else{
      this.elementIndex.scrollToIndex({index:0,viewPosition:0,animated: true,viewOffset:0})
    }
  }
 
  componentWillReceiveProps(props){
    console.log("will recievr props"+JSON.stringify(props))
    this.setState({
      colorFile:props.screenProps.colorFile,
      sizeFile:props.screenProps.sizeFile,
    })
    this.styleFile = homePageStyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
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
  renderItem = ({item, index})=> {
    return (
      <TouchableOpacity 
          onPress={
            ()=>this.props.navigation.navigate('NumberSelection', {bookId: item.bookId, 
                bookName: item.bookName, bookIndex: index, numOfChapters: item.numOfChapters})
          }>
          <View 
            style={this.styleFile.bookList}>
            <Text
              style={
                this.styleFile.textStyle
              }>
              {item.bookName}
            </Text>
            <Icon 
              name='chevron-right' 
              color="gray" 
              style={this.styleFile.iconCustom}
              size={24} />
          </View>
        </TouchableOpacity>
    );
  }

  handlePressIn() {

  }

  handlePressOut(){
    
  }

  render() {
    return (
      <View style={this.styleFile.container}>
        <FixedSidebar 
          onPress={(icon)=>{
            this.props.navigation.navigate(
              icon,
              { languageCode:this.state.lastRead.languageCode,
                versionCode:this.state.lastRead.versionCode,
                bookId:this.state.lastRead.bookId,
                chapterNumber:this.state.lastRead.chapterNumber,
                verseNumber:this.state.lastRead.verseNumber,
                bookName:getBookNameFromMapping(this.state.lastRead.bookId)
              })}}
          doAnimate = {false}
        />
        <View style={this.styleFile.bookNameContainer}>
            <Segment style={this.styleFile.segmentCustom}>
              <Button 
                first active={this.state.activeTab} 
                style={[
                  {backgroundColor:this.state.activeTab ?  "#3F51B5":"#fff"},
                  this.styleFile.segmentButton
                ]} 
                onPress={this.toggleButton.bind(this,true)
                }
              >
                <Text 
                  style={{color:this.state.activeTab? "#fff" : "#000"
                  }}>
                  Old Testament
                </Text>
              </Button>
              <Button 
                last active={!this.state.activeTab} 
                style={[
                  {backgroundColor:this.state.activeTab ?  "#fff" : "#3F51B5"},  
                  this.styleFile.segmentButton
                ]} 
                onPress={this.toggleButton.bind(this,false)}>
                <Text 
                  active={!this.state.activeTab} 
                  style={{
                    color:!this.state.activeTab ? "#fff":"#000" 
                  }}>
                  New Testament
                </Text>
              </Button>
            </Segment>
            <FlatList
              ref={ref => this.elementIndex = ref}
              data={this.state.booksList}
              // getItemLayout={this.getItemLayout}
              // onScroll={this.handleScroll}
              renderItem={this.renderItem}
              extraData={this.styleFile}
              onViewableItemsChanged={this.handleViewableItemsChanged}
              viewabilityConfig={this.viewabilityConfig}
            />
        </View> 
      </View>
    );
  }
};

