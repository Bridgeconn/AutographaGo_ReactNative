
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
    console.log("props value home page update "+this.props.screenProps)

    this.queryBooksList = this.queryBooksList.bind(this)

    this.state = {
      colorMode:this.props.screenProps.colorMode,
      sizeMode:this.props.screenProps.sizeMode,
      activeTab1:true,
      activeTab2:false,
      booksList: [],
      number:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,996,97,98,99],
    }
  }

  componentDidMount() {
    this.queryBooksList();
  }

  async queryBooksList() {
    this.setState({isLoading: true})
    let models = await DbQueries.queryBookIdModels("ULB", "ENG");
    this.setState({isLoading:false})
    if (models && models.length > 0) {
      this.setState({booksList: models})
      // this.props.screenProps.updateBooks(models)
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
                {this.state.booksList.map((item)=>
                  <TouchableOpacity 
                    onPress={
                      ()=>this.props.navigation.navigate('NumberSelection', {bookId: item.bookId, bookName: item.bookName})
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