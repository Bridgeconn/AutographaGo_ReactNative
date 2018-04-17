
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


export default class Home extends Component {
  static navigationOptions = {
    headerTitle: 'Autographa Go',
  };

  constructor(props){
    super(props)
    this.queryBooksList = this.queryBooksList.bind(this)

    this.state = {
      styleFile: homePageStyle(this.props.screenProps.colorFile, this.props.screenProps.sizeFile),
      colorFile:this.props.screenProps.colorFile,
      sizeFile:this.props.screenProps.sizeFile,
      activeTab:true,
      booksList: [],
      number:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,996,97,98,99],
    }
    // this.styleFile = homePageStyle(this.state.colorFile, this.state.sizeFile);
    
    this.viewabilityConfig = {
      itemVisiblePercentThreshold: 50,
      waitForInteraction: true
  }
  this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
  }

  componentDidMount() {
    this.queryBooksList();
  }

  async queryBooksList() {
    this.setState({isLoading: true})
    let models = await DbQueries.queryBooksWithCode("ULB", "ENG");
    
    if (models && models.length > 0) {
      console.log("books : " + models.length)
      this.setState({booksList: models})
      this.setState({isLoading:false})
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
    this.setState({
      colorFile:props.screenProps.colorFile,
      sizeFile:props.screenProps.sizeFile,
      styleFile: homePageStyle(props.screenProps.colorFile, props.screenProps.sizeFile)
    })
    // this.styleFile = homePageStyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
  }

  getItemLayout = (data, index) => (
    { length: 48, offset: 48 * index, index }
  )
  handleScroll = (event)=>{
     console.log(event.nativeEvent.contentOffset.y+ "  index value")  
    //  if(index < 34){
    //    console.log("active tab"+this.state.activeTab)
    //    this.setState({activeTab:true})
    //  }
    //  else{
    //    this.setState({activeTab:false})
    //  } 
    //  this.toggleButton()
  }

  _onViewableItemsChanged = (info) => {
    console.log("viewable item : " + JSON.stringify(info.viewableItems))
    console.log("changed item : " + JSON.stringify(info.changed))
    
  }

  handleViewableItemsChanged(info) {
    console.log(info)
}

  renderItem = ({item, index})=> {
    return (
      <TouchableOpacity 
          onPress={
            ()=>this.props.navigation.navigate('Book', 
            {bookId: item.bookId, bookName: item.bookName
            })
          }>
          <View 
            style={this.state.styleFile.bookList}>
            <Text
              style={
                this.state.styleFile.textStyle
              }>
              {item.bookName}
            </Text>
            <Icon 
              name='chevron-right' 
              color="gray" 
              size={24} />
          </View>
        </TouchableOpacity>
    );

  }


  render() {
    const iconName = [
      {icon:'local-library',pressIcon:'EditNote',},
      {icon:'history',pressIcon:'History'},
      {icon:'search',pressIcon:'Search'},
      {icon:'note',pressIcon:'Notes'},
      {icon:'bookmark',pressIcon:'Bookmarks',},
      {icon:'border-color',pressIcon:'Highlights'},
      {icon:'settings',pressIcon:'Settings'}
    ]
    const iconPress = ['EditNote',' History','Search','Note','Bookmarks','Highlights','Settings']
    return (
      <View style={this.state.styleFile.container}>
        <View style={this.state.styleFile.sideBarContainer}>
        {
          iconName.map((iconName)=>
            <Icon name={iconName.icon} size={32} 
              style={this.state.styleFile.sideBarIconCustom} 
              onPress={() =>this.props.navigation.navigate(iconName.pressIcon)}/>
          )
        }
        </View>
        <View style={this.state.styleFile.bookNameContainer}>
            <Segment style={this.state.styleFile.segmentCustom}>
              <Button 
                first active={this.state.activeTab} 
                style={[
                  {backgroundColor:this.state.activeTab ?  "#3F51B5":"#fff"},
                  this.state.styleFile.segmentButton
                ]} 
                onPress={this.toggleButton.bind(this,true)}
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
                  this.state.styleFile.segmentButton
                ]} 
                onPress={
                  this.toggleButton.bind(this,false)}>
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
              getItemLayout={this.getItemLayout}
              // onScroll={this.handleScroll}
              renderItem={this.renderItem}
              // onViewableItemsChanged={this.handleViewableItemsChanged}
              // viewabilityConfig={this.viewabilityConfig}
            />
        </View> 
      </View>
    );
  }
};