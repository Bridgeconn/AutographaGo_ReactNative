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
import {nightColors, dayColors} from '../../utils/colors.js'
import FixedSidebar from '../../components/FixedSidebar/FixedSidebar'

export default class Home extends Component {

  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Autographa Go',
    headerRight:(
        <TouchableOpacity onPress={()=>navigation.state.params.goToLanguage()} >
          <Text style={{color:"#fff",margin:8}}>{navigation.state.params.bibleLanguage} {navigation.state.params.bibleVersion}</Text>
        </TouchableOpacity>
      )
  })

  constructor(props){
    super(props)
    console.log("navigation rops" +JSON.stringify(this.props.navigation))
    console.log("navigation rops" +JSON.stringify(this.props.navigation))
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)

    this.state = {
      colorFile:this.props.screenProps.colorFile,
      sizeFile:this.props.screenProps.sizeFile,
      // bibleLanguage:this.props.screenProps.languageCode,
      // bibleVersion:this.props.screenProps.versionCode,
      activeTab:true,
      iconPress: [],
      booksList: this.props.screenProps.booksList,
    }

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
    console.log("WILLLLL recievr props"+props.screenProps.languageCode+"  version "+props.screenProps.versionCode)
    this.setState({
      colorFile:props.screenProps.colorFile,
      sizeFile:props.screenProps.sizeFile
    }, () => {
      // this.props.navigation.setParams({bibleLanguage:props.screenProps.languageCode, 
      //   bibleVersion: props.screenProps.versionCode})
    })
    this.styles = homePageStyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
  }
  goToLanguage = ()=>{
    this.props.navigation.navigate("Language")
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
  console.log("data from router language props "+this.props.screenProps.data)
  this.props.navigation.setParams({goToLanguage:this.goToLanguage,bibleLanguage: this.props.screenProps.languageCode, 
    bibleVersion: this.props.screenProps.versionCode})

  console.log("BOOOK LENGTH"+this.state.booksList.length)
  console.log("BOOOKs "+JSON.stringify(this.state.booksList))
  
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
              size={24} />
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
          onPress={(icon)=>{this.props.navigation.navigate(icon)}}
          doAnimate = {false}
        />
        <View style={this.styles.bookNameContainer}>
            <Segment style={this.styles.segmentCustom}>
            {/* {this.state.booksList.length <40 } */}
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
                  style={{color:this.state.activeTab? "#fff" : "#000"
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
                  style={{
                    color:!this.state.activeTab ? "#fff":"#000" 
                  }}>
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

