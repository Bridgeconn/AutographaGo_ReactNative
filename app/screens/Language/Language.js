import React, { Component } from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  TouchableOpacity,
  ScrollView
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


export default class Language extends Component{
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Change Language',
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
      console.log("result page"+(res.length))
        let languageData = [];
        for (var i=0; i<res.length;i++) {
          let verList = [];
          for (var j=0;j<res[i].versionModels.length;j++) {
            let verModel = {versionName: res[i].versionModels[j].versionName,
              versionCode: res[i].versionModels[j].versionCode}
            verList.push(verModel);
          }
          let langModel = {languageCode : res[i].languageCode, 
            languageName: res[i].languageName,
            versionModels: verList}

          if (res[i].languageCode == this.props.screenProps.languageCode){
            languageData.splice(0, 0, langModel)
          } else {
            languageData.push(langModel)
          }
        }

      this.setState({languageData, isLoading: false})
      })
  }

  onDeleteVersion(lanCode, lanIndex, verCode, verIndex){
    console.log("indexMain language"+lanIndex)
    let languageData = [...this.state.languageData]
    languageData[lanIndex].versionModels.splice(verIndex, 1)
    if (languageData[lanIndex].versionModels.length == 0) {
      languageData.splice(lanIndex, 1)
    }
    this.setState({languageData})

    DbQueries.deleteLanguage(lanCode, verCode)

  }
  
  _renderHeader = (data, index, isActive) =>{
    console.log("language code "+data.languageCode)
    return (
        <View style={this.styles.LanguageHeader}>
         <Text style={this.styles.headerText}>{data.languageName}</Text>
         <Icon name={isActive ? "keyboard-arrow-down" : "keyboard-arrow-up" } 
            style={this.styles.iconCustom} />
        </View>
    )
  }
  
  _renderContent  = (data,index) => {
    console.log("is active ")
    console.log("data"+data.versionModels.length)

    let activeBgColor = 
      this.state.colorMode == AsyncStorageConstants.Values.DayMode ? 
        colorConstants.Dark_Gray : colorConstants.White
    let inactiveBgColor = 
      this.state.colorMode == AsyncStorageConstants.Values.DayMode ? 
        colorConstants.Gray : colorConstants.Light_Gray

    return (
      <View>
        {
          data.versionModels.map((item, versionIndex) => 
          <View>
            <TouchableOpacity style={this.styles.VersionView} 
             onPress={()=>this._updateLanguage(data.languageCode,data.languageName, 
                item.versionCode,item.versionName)}>
              <Text style={[this.styles.contentText,
                  {color:this.props.screenProps.versionCode == item.versionCode && 
                      this.props.screenProps.languageCode == data.languageCode
                      ? activeBgColor : inactiveBgColor, 
                  fontWeight: this.props.screenProps.versionCode == item.versionCode && 
                    this.props.screenProps.languageCode == data.languageCode
                    ? "bold" : "normal"}]}>
               {item.versionName}
              </Text>
              <Icon 
                name= {(data.languageCode == 'ENG') && (item.versionCode == 'ULT' || 
                    item.versionCode=='UST') ? null : 'delete'} 
                style={this.styles.checkIcon} 
                onPress={()=>this.onDeleteVersion(data.languageCode, index, 
                  item.versionCode, versionIndex)}
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
      <ScrollView>
        <Accordion
        sections={this.state.languageData}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        underlayColor="tranparent"
        initiallyActiveSection={this.state.index}
      />
      </ScrollView>
      }
       <View
        style={this.styles.buttonCustom}
       >
      {/* <TouchableOpacity style={this.styles.downloadButton} 
        onPress = {()=>this.props.navigation.navigate('DownloadLanguage')}>
        <Text style={this.styles.buttonContent}>Download More Bibles</Text>
      <Icon name='file-download' style={this.styles.buttonContent} />
      </TouchableOpacity> */}
       
      <Icon name='file-download' style={this.styles.buttonContent} 
        onPress = {()=>this.props.navigation.navigate('DownloadLanguage')}/>
      </View>
      </View>
   
  )
}
    
}

