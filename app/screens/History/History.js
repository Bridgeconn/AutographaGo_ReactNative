import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import dbQueries from '../../utils/dbQueries';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {getBookNameFromMapping} from '../../utils/UtilFunctions';
import Accordion from 'react-native-collapsible/Accordion';
import {List,ListItem} from 'native-base'
import { historyStyle } from './styles.js'

var moment = require('moment');

export default class History extends Component{
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'History',
    headerRight:(
      <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:"#fff",fontSize:20,marginHorizontal:8}}>clear</Text>
        <Icon name="delete-forever" color="#fff" size={24}  onPress={()=>navigation.state.params.onClearHistory()}/>
      </View>
      )
  })

  constructor(props){
    super(props)
    this.state = {
      historyList: [
        { time: "Today", list: [] },
        { time: "Yesterday", list:[] },
        { time: "1 week ago", list:[] },
        { time: "1 month ago", list:[] },
        { time: "2 months ago", list:[] }
    ],
    isLoading:false
    }
    this.styles = historyStyle(props.screenProps.colorFile, props.screenProps.sizeFile);       
  }

  async componentDidMount(){
    this.setState({isLoading: true}, async () => {
    
    let historyData  = await dbQueries.queryHistory()

    if (historyData) {
      let historyList = [...this.state.historyList]
      var date = new Date()
      var cur = moment(date).format('D')
        for(i=0; i < historyData.length; i++){
          var end = moment(historyData[i].time).format('D')
          var timeDiff =  Math.floor(cur-end)
          if(timeDiff == 0){
            historyList[0].list.push(historyData[i])
          }
          if(timeDiff == 1){
            historyList[1].list.push(historyData[i])
          }
          if(timeDiff >= 2 && timeDiff <= 7){
            historyList[2].list.push(historyData[i])
          }
          if(timeDiff > 7 && timeDiff <= 30){
            historyList[3].list.push(historyData[i])
          }
          if(timeDiff > 30 ){
            historyList[4].list.push(historyData[i])
          }
        }

        for(i=0; i < historyList.length; i++){
          if (historyList[i].list.length  == 0) {
            historyList.splice(i, 1)
            i--;
          }
        }
        this.setState({historyList,isLoading:false})
    }
    })
this.props.navigation.setParams({onClearHistory:this.onClearHistory})

}
  
 
  onClearHistory(){
    console.log("hi clear history")
    dbQueries.clearHistory()
  }

  _renderHeader = (data, index, isActive) =>{
    return (
      <View>
      {
        <View  style={this.styles.historyHeader}>
         <Text style={this.styles.headerText}>{data.time}</Text>
         <Icon name={isActive ? "keyboard-arrow-down" : "keyboard-arrow-up" } size={24} />
        </View>
      }
      </View> 
    )
  }

  _renderContent  = (data) => {
    console.log("is active ")
    console.log("version model"+JSON.stringify(data))
    return (
      <View>
        {
          this.state.isLoading ? <ActivityIndicator animate = {true}/> : 
            data.list.map((item, index) => 
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Book",{bookId: item.bookId, 
              bookName: getBookNameFromMapping(item.bookId), chapterNumber: item.chapterNumber })}>
              <Text style={this.styles.contentText}>{getBookNameFromMapping(item.bookId)} : {item.chapterNumber} </Text>
            </TouchableOpacity>
            )
           
        }
       
        </View>
    )
  }

  render(){
     return (
      <Accordion
      activeSection={this.state.activeSection}
      sections={this.state.historyList}
      renderHeader={this._renderHeader}
      renderContent={this._renderContent}
      underlayColor="tranparent"
      initiallyActiveSection={0}
    />
    )
  }
}

