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

    console.log('settings props'+JSON.stringify(this.props.screenProps))
    this.state = {
      sizeMode: this.props.screenProps.sizeMode,
      sizeFile:this.props.screenProps.sizeFile,
      
      colorMode: this.props.screenProps.colorMode,
      colorFile:this.props.screenProps.colorFile,
    
    };
    
    this.styleFile = settingsPageStyle(this.state.colorFile, this.state.sizeFile);
    
  }
  
  onSizeFileUpdate(sizeMode, sizeFile){
    this.setState({sizeFile})
    this.props.screenProps.updateSize(sizeMode, sizeFile)
    this.props.navigation.dispatch(setParamsAction2(sizeFile));
    this.styleFile = settingsPageStyle(this.state.colorFile, sizeFile);
  }
  onChangeSlider(value) {
    AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, value);
    this.setState({sizeMode: value})
    SizeFileUtils.onSizeFileChange(value)
    // switch(value) {
    //   case AsyncStorageConstants.Values.SizeModeXSmall: {
    //     this.onSizeFileUpdate(value, extraSmallFont)
    //     break;
    //   }

    //   case AsyncStorageConstants.Values.SizeModeSmall: {
    //     this.onSizeFileUpdate(value, smallFont)
    //     break;
    //   }

    //   case AsyncStorageConstants.Values.SizeModeNormal: {
    //     this.onSizeFileUpdate(value, mediumFont)
    //     break;
    //   }

    //   case AsyncStorageConstants.Values.SizeModeLarge: {
    //     this.onSizeFileUpdate(value, largeFont)
    //     break;
    //   }
      
    //   case AsyncStorageConstants.Values.SizeModeXLarge: {
    //     sizeFile = extraLargeFont;
    //     this.onSizeFileUpdate(value, sizeFile)
    //     break;
    //   }
    // }
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

      this.styleFile = settingsPageStyle(changeColorFile, this.state.sizeFile)
    })
  }
  render() {
    return (
      <View style={this.styleFile.container}>
      <View style={this.styleFile.containerMargin}>
         <Content>
          <Card >
            <CardItem style={this.styleFile.cardItemStyle}>
              <Left>
                <Text style={this.styleFile.textStyle}>
                  Reading Mode
                </Text>
              </Left>
              <Right>
                <View 
                  style={
                    this.styleFile.cardItemRow
                  }>
                <Text 
                  style={
                    this.styleFile.nightModeCustom
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
                  }/>
                </View>
                <View
                style={
                  this.styleFile.cardItemRow
                }>
                <Text 
                style={
                  this.styleFile.dayModeCustom
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
                }/>
                </View>
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={this.styleFile.cardItemStyle}>
              <Right style={this.styleFile.cardItemAlignRight}>
              <View style={this.styleFile.cardItemRow}>
              <Icon name='format-size' size={24} style={this.styleFile.cardItemIconCustom} />
              <Text style={this.styleFile.textStyle}>Text Size</Text>
              </View>
              <Slider
               style={this.styleFile.segmentCustom}
                step={1}
                minimumValue={0}
                maximumValue={4}
                thumbTintColor={this.state.colorMode == AsyncStorageConstants.dayColors ? '#F62459': '#26A65B'}
                minimumTrackTintColor={this.state.colorMode == AsyncStorageConstants.dayColors ? '#F62459': '#26A65B'}
                onValueChange={this.onChangeSlider.bind(this)}
                value={this.state.sizeMode}
              />
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={this.styleFile.cardItemStyle}>
            <Icon name='settings-backup-restore' size={24} style={this.styleFile.cardItemIconCustom} />
              <Text style={this.styleFile.textStyle}>Backup and Restore</Text>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={this.styleFile.cardItemStyle}>
            <Icon name='cloud-download' size={24} style={this.styleFile.cardItemIconCustom} />
              <Text style={this.styleFile.textStyle}>Download More Bibles</Text>
             </CardItem>
           </Card>
           <Card>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('OpenHints')}>
            <CardItem style={this.styleFile.cardItemStyle}>
            <Icon name='help' size={24} style={this.styleFile.cardItemIconCustom} />
              <Text style={this.styleFile.textStyle}>Open Hints</Text>
             </CardItem>
             </TouchableOpacity>
           </Card>
           <Card>
            <CardItem style={this.styleFile.cardItemStyle}>
            <Icon name='info' size={24} style={this.styleFile.cardItemIconCustom}/>
              <Text style={this.styleFile.textStyle}>About</Text>
             </CardItem>
           </Card>
        </Content>
      </View>
      </View>
    );
  }
}
