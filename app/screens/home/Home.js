
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
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
    console.log("props value home page update "+this.props.screenProps)

    this.queryBooksList = this.queryBooksList.bind(this)

    this.state = {
      colorFile:this.props.screenProps.colorFile,
      sizeFile:this.props.screenProps.sizeFile,
      activeTab1:true,
      activeTab2:false,
      booksList: [],
      number:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,996,97,98,99],
    }
    this.styleFile = homePageStyle(this.state.colorFile, this.state.sizeFile);
  }

  componentDidMount() {
    this.queryBooksList();
  }

  async queryBooksList() {
    this.setState({isLoading: true})
    let models = await DbQueries.queryBooksWithCode("ULB", "ENG");
    
    if (models && models.length > 0) {
      this.setState({booksList: models})
      this.setState({isLoading:false})
    }
  }

  toggleButton1(){
    this.setState({activeTab1:true,activeTab2:false})
    this.ScrollViewPosition.scrollTo({x: 0, y: 0, animated: true})
  }
  
  toggleButton2(){
    this.setState({activeTab1:false,activeTab2:true})
    this.ScrollViewPosition.scrollTo({x: 0, y: 569, animated: false})
  }
  
  handleScroll = (event)=>{
    console.log("handleScroll"+ Math.round(event.nativeEvent.contentOffset.y));
    console.log("maxHeight of window "+height)
    if(Math.round(event.nativeEvent.contentOffset.y)>568){
      console.log("height is more than 568")
      this.setState({activeTab1:false,activeTab2:true})
    }
    else{
      console.log("height is less than 568")
      this.setState({activeTab1:true,activeTab2:false})
    }
  }

  componentWillReceiveProps(props){
    console.log('componentWillReceiveProps home '+JSON.stringify(props))
    this.setState({
      colorFile:props.screenProps.colorFile,
      sizeFile:props.screenProps.sizeFile,
    })
    this.styleFile = homePageStyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
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
      <View style={this.styleFile.container}>
        <View style={this.styleFile.sideBarContainer}>
        {
          iconName.map((iconName)=>
            <Icon name={iconName.icon} size={32} 
              style={this.styleFile.sideBarIconCustom} 
              onPress={() =>this.props.navigation.navigate(iconName.pressIcon)}/>
          )
        }
        </View>
        <View style={this.styleFile.bookNameContainer}>
            <Segment style={this.styleFile.segmentCustom}>
              <Button 
                first active={this.state.activeTab1} 
                style={[
                  {backgroundColor:this.state.activeTab1==false ? "#fff" : "#3F51B5",},
                  this.styleFile.segmentButton
                ]} 
                onPress={this.toggleButton1.bind(this)}
              >
                <Text 
                  active={this.state.activeTab1} 
                  style={{color:this.state.activeTab1==false ? "#000" : "#fff"
                  }}>
                  Old Testament
                </Text>
              </Button>
              <Button 
                last active={this.state.activeTab2} 
                style={[
                  {backgroundColor:this.state.activeTab2==false ?  "#fff" : "#3F51B5"},  
                  this.styleFile.segmentButton
                ]} 
                onPress={
                  this.toggleButton2.bind(this)}>
                <Text 
                  active={this.state.activeTab2} 
                  style={{
                    color:this.state.activeTab2==false ? "#000" : "#fff"
                  }}>
                  New Testament
                </Text>
              </Button>
            </Segment>
             <ScrollView
              onScroll = {this.handleScroll}
              scrollEventThrottle={10}
              ref = {refs => this.ScrollViewPosition =refs }
              >
                {this.state.booksList.map((item)=>
                  <TouchableOpacity 
                    onPress={
                      ()=>this.props.navigation.navigate('Book', 
                      {bookId: item.bookId, bookName: item.bookName
                      })
                    }>
                    <View 
                      style={{
                        flexDirection:'row',
                        justifyContent:'space-between', 
                        paddingHorizontal:16, 
                        paddingVertical:12
                      }}>
                      <Text
                        style={
                          this.styleFile.textStyle
                        }>
                        {item.bookName}
                      </Text>
                      <Icon 
                        name='chevron-right' 
                        color="gray" 
                        size={24} />
                    </View>
                  </TouchableOpacity>
                )}
              </ScrollView>
        </View> 
      </View>
    );
  }
};