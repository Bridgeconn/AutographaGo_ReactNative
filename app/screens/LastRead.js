import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import AsyncStorageUtil from '../utils/AsyncStorageUtil';
const AsyncStorageConstants = require('../utils/AsyncStorageConstants')
import DbQueries from '../utils/dbQueries'
export default class LastRead extends Component {
    constructor(){
        super();
        this.state = {
            lastRead:{}
        }
    }
    static navigationOptions = {
        headerTitle: 'Last Read',
      };

    
async componentDidMount(){
    await  AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.LastReadReference)
    .then((lastRead) => {
        this.setState({lastRead})

    })
    console.log("set state "+JSON.stringify(this.state.lastRead))
    let result = await  DbQueries.queryLastRead(this.state.lastRead.langCode, this.state.lastRead.verCode, this.state.lastRead.bookId, this.state.lastRead.chapterNum)
    console.log("result "+JSON.stringify(result[0].chapterNumber))
}

render(){
    return(
        <View>
        <Text>last read</Text>
        </View>
    )
}
}