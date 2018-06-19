import React, { Component } from 'react';
import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import DbQueries from '../../utils/dbQueries';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {getBookNameFromMapping} from '../../utils/UtilFunctions';
import Accordion from 'react-native-collapsible/Accordion';
import {List,ListItem} from 'native-base'
import { historyStyle } from './styles.js'


var moment = require('moment');

export default class Language extends Component{
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Language',
  })
  constructor(props){
    super(props)
    console.log("language page")
    this.state = {
      isLoading: false,
      languageData:[],
    }
    this.styles = historyStyle(props.screenProps.colorFile, props.screenProps.sizeFile);     
    this.updateLanguage = this.updateLanguage.bind(this)  
  }

  componentDidMount(){
    this.setState({isLoading: true}, async () => {
      var res = await DbQueries.queryLanguages()
      console.log("result in history page"+(res.length))

        let languageData = [];
        for (var i=0; i<res.length;i++) {
          let verList = [];
          for (var j=0;j<res[i].versionModels.length;j++) {
            let verModel = {versionName: res[i].versionModels[j].versionName,
              versionCode: res[i].versionModels[j].versionCode }
            verList.push(verModel);
          }
          languageData.push({"languageCode" : res[i].languageCode, "languageName": res[i].languageName,
            versionModels: verList})
        }
      this.setState({languageData, isLoading: false})
      })
  }

  _renderHeader(data, index, isActive) {
    console.log("language code "+data.languageCode)
    return (
      <View>
      {
        data.versionModels.length == 0 ? null : 
        <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            margin:8
          }}>
         <Text>{data.languageCode}</Text>
         <Icon name={isActive ? "keyboard-arrow-down" : "keyboard-arrow-up" } size={24} />
        </View>
      }
      </View> 
    )
  }
 
  _renderContent(data){
    console.log("is active ")
    console.log("version model"+JSON.stringify(data))
    return (
      
        <List dataArray={data.versionModels}
              renderRow={(item)=>
                <TouchableHighlight onPress={()=>this.updateLanguage()}>
                  <ListItem>
                    <Text>{item.versionName}</Text>
                  </ListItem>
                </TouchableHighlight>
              }>
        </List>
     
      
    )
  }
  updateLanguage = () =>{
    console.log("Update Language")
    this.props.navigation.dispatch(navigationActions.back())
  }
  render(){
     return (
       <View>
      {this.state.isLoading ? 
        <ActivityIndicator 
        animating={this.state.isLoading} 
        size="large" 
        color="#0000ff" />
      :
        <Accordion
        sections={this.state.languageData}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        underlayColor="tranparent"
        initiallyActiveSection={0}
      />
      }
      </View>
  )
}
    
}

