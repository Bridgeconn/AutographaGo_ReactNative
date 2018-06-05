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
      historyData:[]
    }
  }


  async componentDidMount(){
    let res  = await dbQueries.queryHistory()
    console.log("resutl in history "+JSON.stringify(res))
    this.setState({historyData:res})
  
  }
  // renderItem = ({item,index})=>{
  // return(
   
  //  )
  // }

  HistoryTime(){
    var date = new Date();
    console.log("history date "+historyData.time)
    // if(historyData.time){

    // }
  }
  
  render() {
    var date = new Date()
    var end = moment(this.state.historyData.time).format('D');
    var cur = moment(new Date()).format('D');
    var diff =  Math.floor(end-cur) 
    console.log("time db" +end)
    console.log("time current" +cur)
    console.log("time current" +diff)
    
    
    // let dateFormate =  date.getDays() < 1  ? moment(this.state.historyData.time).fromNow() 
    // :( date.getDays() < 2 ) ? "tommorow" 
    // :( date.getDays() < 3 )  ? "2 days ago"
    // :( date.getDays() < 7 ) ? "a week ago "
    // :( date.getDays() < 14 ) ? "2 weeks ago"  
    // : "1 month ago "
    // //  moment(this.state.historyData.time).format('DD-MMM');  
    // let dateFormate =  date.getDays() < 24  ? moment(this.state.historyData.time).fromNow() : moment(this.state.historyData.time).format('DD-MMM');  
    
    return (
      <View style={{flex:1,backgroundColor:"white"}}> 
      {
        diff === 0  ? 
        <HistoryAccordion title="today" > 
        <FlatList
          data={this.state.historyData}
          renderItem={({item}) => 
            <Text 
            style={{
                borderBottomColor:"grey",
                borderBottomWidth:0.5
              }}
            >
              {getBookNameFromMapping(item.bookId)} {item.chapterNumber}
              
            </Text>
          }
          />
        </HistoryAccordion>
        :( diff === 1)? 
        <HistoryAccordion title="yesterday" > 
        <FlatList
          data={this.state.historyData}
          renderItem={({item}) => 
            <Text 
            style={{
                borderBottomColor:"grey",
                borderBottomWidth:0.5
              }}
            >
              {getBookNameFromMapping(item.bookId)} {item.chapterNumber}
              
            </Text>
          }
          />
        </HistoryAccordion>
        :( diff === 2 ) ? 
        <HistoryAccordion title="2 days ago" > 
        <FlatList
          data={this.state.historyData}
          renderItem={({item}) => 
            <Text 
            style={{
                borderBottomColor:"grey",
                borderBottomWidth:0.5
              }}
            >
              {getBookNameFromMapping(item.bookId)} {item.chapterNumber}
              
            </Text>
          }
          />
        </HistoryAccordion>
        :( diff > 3  && diff <= 7) ? 
        <HistoryAccordion title="a week ago" > 
        <FlatList
          data={this.state.historyData}
          renderItem={({item}) => 
            <Text 
            style={{
                borderBottomColor:"grey",
                borderBottomWidth:0.5
              }}
            >
              {getBookNameFromMapping(item.bookId)} {item.chapterNumber}
              
            </Text>
          }
          />
        </HistoryAccordion>
        : (diff < 14 &&   diff > 7) ? 
        <HistoryAccordion title="2 week ago" > 
        <FlatList
          data={this.state.historyData}
          renderItem={({item}) => 
            <Text 
            style={{
                borderBottomColor:"grey",
                borderBottomWidth:0.5
              }}
            >
              {getBookNameFromMapping(item.bookId)} {item.chapterNumber}
              
            </Text>
          }
          />
        </HistoryAccordion> 
        
        : <HistoryAccordion title="a month ago" > 
        <FlatList
          data={this.state.historyData}
          renderItem={({item}) => 
            <Text 
            style={{
                borderBottomColor:"grey",
                borderBottomWidth:0.5
              }}
            >
              {getBookNameFromMapping(item.bookId)} {item.chapterNumber}
              
            </Text>
          }
          />
        </HistoryAccordion>
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