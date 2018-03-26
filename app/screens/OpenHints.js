import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Segment,Button,Tab,Tabs} from 'native-base'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class Home extends Component {
static navigationOptions = {
    headerTitle: 'Hints',
};
constructor(){
  super()
  this.state = {
    activeTab1:true,
    activeTab2:false,
    iconName: [
        {icon:'local-library',hint:'Continue reading where you last left', visible:false},
        {icon:'history',hint:'See all your reading history', visible:false},
        {icon:'search',hint:'Search for text', visible:false},
        {icon:'note',hint:'Manage all your notes', visible:false},
        {icon:'bookmark',hint:'See all your bookmarks', visible:false},
        {icon:'settings',hint:'Manage app settings', visible:false}
      ],
     number:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,996,97,98,99],
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
  showHints(index){
    console.log("hints param"+index)

    // this.setState({visible[index]:true})
    let visibility = [ ...this.state.iconName ];
    visibility[index] = {...visibility[index], visible: true};
    this.setState({ iconName: visibility }, () =>   {
    console.log("visible text"+this.state.iconName)
    } );

  }
  render() {
    // const visibility = this.state.visibleText;

    return (
      <ScrollView>
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flexDirection:'column'}}>
          {this.state.iconName.map((iconValue,index)=>
            <View style={{flexDirection:'row'}}>
            <Icon name={iconValue.icon}  size={32} color ='gray' style={{alignSelf:'center',padding:16}} onPress={()=>{this.showHints(index)}}/>
            <Text>{iconValue.visible ? iconValue.hint : null}</Text>
            </View>
          )}
        </View>
      </View>
      </ScrollView>
    );
  }
}

