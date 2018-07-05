import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Slider,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Switch,
  ScrollView
} from 'react-native';
import { HeaderBackButton, NavigationActions} from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from '../../utils/dimens.js'
import { settingsPageStyle } from './styles.js'
import {nightColors, dayColors} from '../../utils/colors.js'
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
import SizeFileUtils from '../../utils/SizeFileUtils'
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')

const setParamsAction = ({colorFile}) => NavigationActions.setParams({
  params: { colorFile },
  key: 'Home',
});

const setParamsAction2 = ({sizeFile}) => NavigationActions.setParams({
  params: { sizeFile },
  key: 'Home',
});

export default class Setting extends Component {
  static navigationOptions = {
    headerTitle: 'Settings',
  };

  constructor(props) {
    super(props);

    this.state = {
      sizeMode:JSON.parse(this.props.screenProps.sizeMode),
      sizeFile:this.props.screenProps.sizeFile,
      colorMode: this.props.screenProps.colorMode,
      colorFile:this.props.screenProps.colorFile,
      verseInLine:JSON.parse(this.props.screenProps.verseInLine)
    };
    
    this.styles = settingsPageStyle(this.state.colorFile, this.state.sizeFile);
  }
  
  onSizeFileUpdate(sizeMode, sizeFile){
    this.setState({sizeFile})
    this.props.screenProps.updateSize(sizeMode, sizeFile)
    this.props.navigation.dispatch(setParamsAction2(sizeFile));
    this.styles = settingsPageStyle(this.state.colorFile, sizeFile);
  }

  onChangeSlider(value) {
    AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, value);
    this.setState({sizeMode: value})
    // SizeFileUtils.onSizeFileChange(value)
    switch(value) {
      case AsyncStorageConstants.Values.SizeModeXSmall: {
        this.onSizeFileUpdate(value, extraSmallFont)
        break;
      }

      case AsyncStorageConstants.Values.SizeModeSmall: {
        this.onSizeFileUpdate(value, smallFont)
        break;
      }

      case AsyncStorageConstants.Values.SizeModeNormal: {
        this.onSizeFileUpdate(value, mediumFont)
        break;
      }

      case AsyncStorageConstants.Values.SizeModeLarge: {
        this.onSizeFileUpdate(value, largeFont)
        break;
      }
      
      case AsyncStorageConstants.Values.SizeModeXLarge: {
        sizeFile = extraLargeFont;
        this.onSizeFileUpdate(value, sizeFile)
        break;
      }
    }
  }

  onColorModeChange(value){
    if (this.state.colorMode == value) {
      return;
    }
    const changeColorFile = value == AsyncStorageConstants.Values.DayMode
      ? dayColors
      : nightColors;

    this.setState({colorMode: value, colorFile: changeColorFile},()=>{
      this.props.screenProps.updateColor(this.state.colorMode,this.state.colorFile);
      this.props.navigation.dispatch(setParamsAction(this.state.colorFile))
      
      AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.ColorMode,this.state.colorMode);
      
      this.styles = settingsPageStyle(changeColorFile, this.state.sizeFile)
    })
    
  }

  onVerseInLineModeChange(){
    this.setState({verseInLine:!this.state.verseInLine}, ()=>{
        this.props.screenProps.updateVerseInLine(this.state.verseInLine);
        AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.VerseViewMode,this.state.verseInLine);
    })
  }

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.containerMargin}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Card >
              <CardItem style={this.styles.cardItemStyle}>
                <Left>
                  <Text style={this.styles.textStyle}>
                    Reading Mode
                  </Text>
                </Left>
                <Right>
                  <View 
                    style={
                      this.styles.cardItemRow
                    }>
                    <Text 
                      style={
                        this.styles.nightModeCustom
                      }>  
                      Night
                    </Text>
                    <Icon 
                      name="brightness-7" 
                      size={24} 
                      color={
                        this.state.colorMode != AsyncStorageConstants.Values.DayMode 
                        ? '#26A65B' : "gray"
                      } 
                      onPress={
                        this.onColorModeChange.bind(this, 0)
                      }
                    />
                  </View>
                  <View
                    style={
                      this.styles.cardItemRow
                    }>
                    <Text 
                      style={
                        this.styles.dayModeCustom
                      }>  
                      Day
                    </Text>
                    <Icon 
                      name="brightness-5" 
                      size={24} 
                      color={this.state.colorMode == AsyncStorageConstants.Values.DayMode 
                      ? '#F62459' : "gray"}  
                      onPress={
                        this.onColorModeChange.bind(this, 1)
                      }
                    />
                  </View>
                </Right>
              </CardItem>
            </Card>
            
            <Card>
              <CardItem  bordered style={this.styles.cardItemStyle}>
                <Right style={this.styles.cardItemAlignRight}>
                  <View style={this.styles.cardItemRow}>
                    <Icon name='format-size' size={24} style={this.styles.cardItemIconCustom} />
                      <Text style={this.styles.textStyle}>Text Size</Text>
                  </View>
                  <Slider
                    style={this.styles.segmentCustom}
                    step={1}
                    minimumValue={0}
                    maximumValue={4}
                    thumbTintColor={this.state.colorMode == AsyncStorageConstants.Values.DayMode ? '#F62459': '#26A65B'}
                    minimumTrackTintColor={this.state.colorMode == AsyncStorageConstants.Values.DayMode ? '#F62459': '#26A65B'}
                    onValueChange={this.onChangeSlider.bind(this)}
                    value={this.state.sizeMode}
                  />
                </Right>
              </CardItem>
            </Card>
           
            <Card style={{elevation:4}}>
              <CardItem style={this.styles.switchButtonCard}>
                <Text style={this.styles.textStyle}>One Verse Per Line</Text>
                <Switch 
                  size={24} 
                  thumbTintColor={this.state.colorMode == AsyncStorageConstants.Values.DayMode ? '#F62459': '#26A65B'}
                  onValueChange={this.onVerseInLineModeChange.bind(this)}
                  value={this.state.verseInLine}
                />
              </CardItem>
            </Card>
            <Card>
              <CardItem style={this.styles.cardItemStyle}>
                <Icon name='settings-backup-restore' size={24} style={this.styles.cardItemIconCustom} />
                <Text style={this.styles.textStyle}>Backup and Restore</Text>
              </CardItem>
            </Card>
           
            <Card>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('DownloadLanguage')}>              
                <CardItem style={this.styles.cardItemStyle}>
                  <Icon name='cloud-download' size={24} style={this.styles.cardItemIconCustom} />
                  <Text style={this.styles.textStyle}>Download More Bibles</Text>
                </CardItem>
              </TouchableOpacity>
            </Card>
            
            <Card>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Hints')}>
                <CardItem style={this.styles.cardItemStyle}>
                  <Icon name='help' size={24} style={this.styles.cardItemIconCustom} />
                  <Text style={this.styles.textStyle}>Open Hints</Text>
                </CardItem>
              </TouchableOpacity>
            </Card>
            
            <Card>
              <CardItem style={this.styles.cardItemStyle}>
                <Icon name='info' size={24} style={this.styles.cardItemIconCustom}/>
                <Text style={this.styles.textStyle}>About</Text>
              </CardItem>
            </Card>
          </ScrollView>
        </View>
      </View>
    );
  }
}
