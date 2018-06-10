import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,ScrollView,FlatList} from 'react-native';
import HistoryAccordion from './HistoryAccordion';
import dbQueries from '../utils/dbQueries';
import { View } from 'native-base';
import {getBookNameFromMapping} from '../utils/UtilFunctions';
var moment = require('moment');

export default class History extends Component{
  static navigationOptions = {
    headerTitle: 'History',
  };

  constructor(props){
    super(props)
    this.state = {
      historyData:[],
      historyList: [
        { time: "Today", list: []},
        { time: "Yesterday", list:[]},
        { time: "2_days_Ago", list: []},
        { time:"1_week_ago", list:[]}
    ],
      timeDiff:[]
    }
  }

  async componentDidMount(){
    let res  = await dbQueries.queryHistory()
    console.log("resutl in history "+JSON.stringify(res))
    this.setState({historyData:res})
    this.dateDiff()
  }

  renderItem = ({item}) => {
    console.log("render data "+JSON.stringify(this.state.historyList[0]))
    console.log("render data "+JSON.stringify(this.state.historyList[1]))
    console.log("render data "+JSON.stringify(this.state.historyList[2]))
        
    return(
     <Text>{getBookNameFromMapping(item.bookId)}</Text>
    )
  }
  dateDiff() {
    var date = new Date()
    var cur = moment(date).format('D')
    var data = []
    
      for(i=0; i < this.state.historyData.length; i++){
        var end = moment(this.state.historyData[i].time).format('D')
        var timeDiff =  Math.floor(cur-end)
        if(timeDiff == 0){
          var today = this.state.historyList[0].list.push(this.state.historyData[i])
          console.log( JSON.stringify(today)+" today data")
          console.log( JSON.stringify(this.state.historyList[0].list)+" today ")
        }
        console.log("data "+JSON.stringify(this.state.historyList[0]))
        if(timeDiff == 1){
          var yesterday = this.state.historyList[1].list.push(this.state.historyData[i])
          console.log( JSON.stringify(yesterday)+" yesterday ")
          console.log( JSON.stringify(this.state.historyList[1].list)+" yesterday ")
        }
        if(timeDiff == 2){
          var daysAgo = this.state.historyList[2].list.push(this.state.historyData[i])
          console.log( JSON.stringify(daysAgo)+" longTime data")
          console.log( JSON.stringify(this.state.historyList[2].list)+" longTime ")
        }
        if(timeDiff > 2 && timeDiff < 8){
          var daysAgo = this.state.historyList[3].list.push(this.state.historyData[i])
          console.log( JSON.stringify(daysAgo)+" week ago")
          console.log( JSON.stringify(this.state.historyList[2].list)+" week ago ")
        }
      }
  }
  render() {
     console.log("state difference  of time "+this.state.timeDiff)
     console.log("state difference  of time "+JSON.stringify(this.state.historyList[0]))
    
     return (
      <View style={{flex:1,backgroundColor:"white"}}> 

      {
        this.state.historyList.map((item,index)=>
        // <Text>{item.today}</Text>
          <HistoryAccordion title={item.time}>
            <FlatList
              data={item.list}
              renderItem={this.renderItem}
            />
          </HistoryAccordion> 
        )
      }
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#f4f7f9',
    paddingTop      : 30
  },
  
});