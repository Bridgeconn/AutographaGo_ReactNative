import React, { Component } from 'react';
import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button
} from 'react-native';
import DbQueries from '../../utils/dbQueries';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {getBookNameFromMapping} from '../../utils/UtilFunctions';
import colorConstants from '../../utils/colorConstants.js'
import Accordion from 'react-native-collapsible/Accordion';
import { languageStyle } from './styles.js'
import {NavigationActions} from 'react-navigation'
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')
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
      colorMode:this.props.screenProps.colorMode,
      languageData:[],
      index:0

    }
    this.styles = languageStyle(props.screenProps.colorFile, props.screenProps.sizeFile);    

    }
     
  componentDidMount(){
    this.setState({isLoading: true}, async () => {
      var res = await DbQueries.queryLanguages()
      // console.log("result in history page"+(res.length))
        let languageData = [];
        for (var i=0; i<res.length;i++) {
          if (res[i].languageCode == 'ENG'){
            this.setState({index:i})
          }
          let verList = [];
          for (var j=0;j<res[i].versionModels.length;j++) {
            let verModel = {versionName: res[i].versionModels[j].versionName,
              versionCode: res[i].versionModels[j].versionCode, languageCode: res[i].languageCode }
            verList.push(verModel);
          }
          languageData.push({"languageCode" : res[i].languageCode, "languageName": res[i].languageName,
            versionModels: verList})
        }
        

      this.setState({languageData, isLoading: false})
      })
  }
  onDeleteVersion(lanCode, verCode){
    // DbQueries.deleteLangVerszion(lanCode,verCode)

    console.log("next task for language")
  }
  _renderHeader = (data, index, isActive) =>{
    console.log("language code "+data.languageCode)
    return (
      <View style={this.styles.headerContainer}>
      {
        this.state.isLoading ? <ActivityIndicator animate = {true}/> : 
        data.versionModels.length == 0 ? null : 
        <View style={this.styles.LanguageHeader}>
         <Text style={this.styles.headerText}>{data.languageName}  </Text>
         <Icon name={isActive ? "keyboard-arrow-down" : "keyboard-arrow-up" } style={this.styles.iconCustom} />
        </View>
      }
      </View> 
    )
  }
  
  _renderContent  = (data) => {
    console.log("is active ")
    console.log("version model"+JSON.stringify(data))

    let activeBgColor = 
      this.state.colorMode == AsyncStorageConstants.Values.DayMode ? colorConstants.Dark_Gray : colorConstants.White
    let inactiveBgColor = 
      this.state.colorMode == AsyncStorageConstants.Values.DayMode ? colorConstants.Gray : colorConstants.Light_Gray

    return (
      <View>
        {
          this.state.isLoading ? <ActivityIndicator animate = {true}/> : 
          data.versionModels.map((item, index) => 
          <View>
             <TouchableOpacity style={this.styles.VersionView} onPress={()=>this._updateLanguage(data.languageCode,data.languageName, item.versionCode,item.versionName)}>
              <Text style={[this.styles.contentText,
                  {color:this.props.screenProps.versionCode == item.versionCode && this.props.screenProps.languageCode == item.languageCode
                    ? activeBgColor : inactiveBgColor}]}>
               {item.versionName}
              </Text>
              <Icon 
                name= {(item.languageCode == 'ENG') && (item.versionCode == 'ULB' || item.versionCode=='UDB') ? null : 'delete'} 
                style={this.styles.checkIcon} 
                onPress={()=>{this.onDeleteVersion(item.languageCode,item.versionCode)}}
              />
             </TouchableOpacity>
             <View style={this.styles.divider}/>
          </View>
        )
      }
        </View>
    )
  }
 
  _updateLanguage = (lanCode,langName, verCode, verName) =>{
    console.log("Update Language ver code....."+verCode+ "language code " +lanCode)
    AsyncStorageUtil.setAllItems([[AsyncStorageConstants.Keys.LanguageCode, lanCode],
      [AsyncStorageConstants.Keys.LanguageName,langName],
      [AsyncStorageConstants.Keys.VersionCode,verCode],
      [AsyncStorageConstants.Keys.VersionName,verName]
    ]);
    this.props.screenProps.updateLanguage(lanCode,langName, verCode, verName);

    this.props.navigation.state.params.updateLanguage(langName,verCode)
    this.props.navigation.dispatch(NavigationActions.back())    
  }
  
  render(){
     return (
       <View  style={this.styles.container}>
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
        initiallyActiveSection={this.state.index}
      />
      }
       <View
        style={this.styles.buttonCustom}
       >
      <Button
        onPress={()=>this.props.navigation.navigate("DownloadLanguage")}
        title="Download More Bibles"
        color="#000"
        // accessibilityLabel="Learn more about this purple button"
      />
      </View>
      </View>
  )
}
    
}

