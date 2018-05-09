
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import DbQueries from '../utils/dbQueries'
import USFMParser from '../utils/USFMParser'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Segment,Button,Tab,Tabs} from 'native-base'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Home extends Component {
  static navigationOptions = {
    headerTitle: 'Autographa Go',
  };

  constructor(props){
    super(props)
    console.log("props value home page update "+JSON.stringify(this.props.screenProps))

    this.state = {
      colorMode:this.props.screenProps.colorMode,
      sizeMode:this.props.screenProps.sizeMode,
      activeTab1:true,
      activeTab2:false,
      booksList: this.props.screenProps.booksList,
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
    console.log('HOME  componentWillReceiveProps home '+JSON.stringify(props))

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
    const iconPress = ['EditNote',' history','Search','Note','Bookmarks','Highlights','Settings']
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flexDirection:'column',width:width/5,backgroundColor:'black', }}>
        {
          iconName.map((iconName)=>
            <Icon name={iconName.icon} color="white" size={32} 
              style={{alignSelf:'center',padding:16}} 
              onPress={() =>this.props.navigation.navigate(iconName.pressIcon)}/>
          )
        }
        </View>
        <View style={{flexDirection:'column',width:width*4/5}}>
            <Segment style={{borderColor:'#3F51B5',borderBottomWidth:1}}>
              <Button first active={this.state.activeTab1} style={{backgroundColor:this.state.activeTab1==false ? "#fff" : "#3F51B5", padding: 0,height: 45,width:width*2/5}} onPress={this.toggleButton1.bind(this)}><Text active={this.state.activeTab1} style={{color:this.state.activeTab1==false ? "#000" : "#fff"}}>Old Testment</Text></Button>
              <Button last active={this.state.activeTab2} style={{backgroundColor:this.state.activeTab2==false ?  "#fff" : "#3F51B5",  padding: 0,height: 45,width:width*2/5}} onPress={this.toggleButton2.bind(this)}><Text active={this.state.activeTab2} style={{color:this.state.activeTab2==false ? "#000" : "#fff"}}>New Testment</Text></Button>
            </Segment>
             <ScrollView
              onScroll = {this.handleScroll}
              scrollEventThrottle={10}
              ref = {refs => this.ScrollViewPosition =refs }>
                {this.state.booksList.map((item, index)=>
                  <TouchableOpacity 
                    onPress={
                      ()=>this.props.navigation.navigate('NumberSelection', {bookId: item.bookId, bookName: item.bookName, bookIndex: index, numOfChapters: item.numOfChapters})
                      // ()=>this.props.navigation.navigate('Book', {bookId: item.bookId, bookName: item.bookName})
                      }>
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:16, paddingVertical:12}}>
                      <Text style={{fontSize:22}}>
                        {item.bookName}
                      </Text>
                      <Icon name='chevron-right' color="gray" size={24} />
                    </View>
                  </TouchableOpacity>
                )}
              </ScrollView>
        </View> 
      </View>
    );
  }
};