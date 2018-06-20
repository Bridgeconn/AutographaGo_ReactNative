import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,ScrollView,TouchableOpacity} from 'react-native';
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
      <View style={{flexDirection:"row"}}>
        <Text style={{color:"#fff",marginHorizontal:8}}>clear</Text>
          <Icon name="delete-forever" color="#fff" size={24} style={{marginHorizontal:8}} onPress={()=>navigation.state.params.onClearHistory()}/>
      </View>
      )
  })

  constructor(props){
    super(props)
    this.state = {
      historyData:[],
      historyList: [
        { time: "Today", list: []},
        { time: "Yesterday", list:[]},
        { time: "1 week ago", list:[]},
        { time: "1 month ago", list:[]},
        { time: "2 month ago", list:[]}
    ],
    }
    this.styles = historyStyle(props.screenProps.colorFile, props.screenProps.sizeFile);       
  }

  async componentDidMount(){
    let res  = await dbQueries.queryHistory()
    console.log("resutl in history "+JSON.stringify(res))
    this.setState({historyData:res})
    this.dateDiff()
    this.props.navigation.setParams({onClearHistory:this.onClearHistory})
  }
  
 
  onClearHistory(){
    console.log("hi clear history")
    dbQueries.clearHistory()
  }
  dateDiff() {
    var date = new Date()
    var cur = moment(date).format('D')
      for(i=0; i < this.state.historyData.length; i++){
        var end = moment(this.state.historyData[i].time).format('D')
        var timeDiff =  Math.floor(cur-end)
        if(timeDiff == 0){
          this.state.historyList[0].list.push(this.state.historyData[i])
        }
        if(timeDiff == 1){
          this.state.historyList[1].list.push(this.state.historyData[i])
        }
        if(timeDiff > 2 && timeDiff < 8){
          this.state.historyList[2].list.push(this.state.historyData[i])
        }
        if(timeDiff > 8 && timeDiff < 30){
          this.state.historyList[3].list.push(this.state.historyData[i])
        }
        if(timeDiff > 30 ){
          this.state.historyList[4].list.push(this.state.historyData[i])
        }
      }
  }
  _renderHeader = (data, index, isActive) =>{
    return (
      <View>
      {
        data.list.length == 0 ? null : 
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
      <View >
        {data.list.map((item, index) => 
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Book",{bookId: item.bookId, 
          bookName: getBookNameFromMapping(item.bookId), chapterNumber: item.chapterNumber })}>
          <Text>{getBookNameFromMapping(item.bookId)} : {item.chapterNumber} </Text>
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

