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
const width = Dimensions.get('window').width;
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from '../../utils/dimens.js'
import {settingsPageStyle} from './styles.js'
import {nightColors, dayColors} from '../../utils/colors.js'
import AsyncStorageUtil from '../../utils/AsyncStorageUtil.js';
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')

const setParamsAction = ({colorMode}) => NavigationActions.setParams({
  params: { colorMode },
  key: 'Home',
});

const setParamsAction2 = ({sizeMode}) => NavigationActions.setParams({
  params: { sizeMode },
  key: 'Home',
});

const setParamsAction3 = ({colorFile}) => NavigationActions.setParams({
  params: { colorFile },
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
      sliderValue: this.props.screenProps.sizeMode,
      colorMode: this.props.screenProps.colorMode,
      colorFile:this.props.screenProps.colorFile,
    };
    this.colorFile = this.props.screenProps.colorMode == AsyncStorageConstants.Values.DayMode
      ? dayColors
      : nightColors;

    this.sizeFile;
    switch(this.props.screenProps.sizeMode) {
      case AsyncStorageConstants.Values.SizeModeXSmall: {
        sizeFile = extraSmallFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeSmall: {
        sizeFile = smallFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeNormal: {
        sizeFile = mediumFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeLarge: {
        sizeFile = largeFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeXLarge: {
        sizeFile = extraLargeFont;
        break;
      }
    }

    this.styleFile = settingsPageStyle(this.state.colorFile, sizeFile);
    
  }
  
  onChangeSlider(value) {
    this.setState({sizeMode: value})
    
    AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, 
      value);
      
    this.props.screenProps.updateSize(value);

    var sizeFile;
    switch(value) {
      case AsyncStorageConstants.Values.SizeModeXSmall: {
        sizeFile = extraSmallFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeSmall: {
        sizeFile = smallFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeNormal: {
        sizeFile = mediumFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeLarge: {
        sizeFile = largeFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeXLarge: {
        sizeFile = extraLargeFont;
        break;
      }
    }
    
    this.styleFile = settingsPageStyle(this.state.colorFile, sizeFile);
    this.props.navigation.dispatch(setParamsAction2(value));
  }

   onColorModeChange(value){
    if (this.state.colorMode == value) {
      return;
    }
    this.setState({colorMode: value},()=>{console.log("value of colorMode"+this.state.colorMode)})
    this.props.screenProps.updateColor(value);
    const colorFile = this.state.colorMode == AsyncStorageConstants.Values.DayMode
    ? dayColors
    : nightColors;
    this.setState({colorFile}),
    this.styleFile = settingsPageStyle(colorFile, this.sizeFile)
    this.props.navigation.dispatch(setParamsAction3(colorFile))
    this.props.navigation.dispatch(setParamsAction(value));    
    AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.ColorMode, value);
  }
  render() {
    return (
      <View style={this.styleFile.container}>
      <View style={{flex:1,margin:8}}>
         <Content>
          <Card >
            <CardItem style={[{paddingTop:16,paddingBottom:16}]}>
              <Left>
                <Text style={this.styleFile.textStyle}>
                  Reading Mode
                </Text>
              </Left>
              <Right>
                <View style={{flexDirection:'row'}}>
                <Text style={[{marginRight:8,marginBottom:20},]}>  
                  Night
                </Text>
                <Icon name="brightness-7" size={24} color={this.state.colorMode != AsyncStorageConstants.Values.DayMode ? '#26A65B' : "gray"} onPress={this.onColorModeChange.bind(this, 0)}/>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={[{marginRight:8}]}>
                  Day
                </Text>
                <Icon name="brightness-5" size={24} color={this.state.colorMode == AsyncStorageConstants.Values.DayMode ? '#F62459' : "gray"}  onPress={this.onColorModeChange.bind(this, 1)}/>
                </View>
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={[{paddingTop:16,paddingBottom:16},]}>
              <Right style={{alignItems:'flex-start'}}>
              <View style={{flexDirection:'row'}}>
              <Icon name='format-size' size={24} style={{marginRight:8}} />
              <Text style={this.styleFile.textStyle}>Text Size</Text>
              </View>
              <Slider
               style={{width:width-50, height: 30, borderRadius: 50}}
                step={1}
                minimumValue={0}
                maximumValue={4}
                thumbTintColor={this.state.day ? '#F62459': '#26A65B'}
                minimumTrackTintColor={this.state.day ? '#F62459': '#26A65B'}
                onValueChange={this.onChangeSlider.bind(this)}
                value={this.state.sliderValue}
              />
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={[{paddingTop:16,paddingBottom:16}]}>
            <Icon name='settings-backup-restore' size={24} style={{marginRight:8}} />
              <Text style={this.styleFile.textStyle}>Backup and Restore</Text>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={[{paddingTop:16,paddingBottom:16}]}>
            <Icon name='cloud-download' size={24} style={{marginRight:8}} />
              <Text style={this.styleFile.textStyle}>Download More Bibles</Text>
             </CardItem>
           </Card>
           <Card>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('OpenHints')}>
            <CardItem style={[{paddingTop:16,paddingBottom:16},{backgroundColor:dayColors.backgroundColor ? this.state.day : nightColors.backgroundColor}]}>
            <Icon name='help' size={24} style={{marginRight:8}} />
              <Text style={this.styleFile.textStyle}>Open Hints</Text>
             </CardItem>
             </TouchableOpacity>
           </Card>
           <Card>
            <CardItem style={[{paddingTop:16,paddingBottom:16}]}>
            <Icon name='info' size={24} style={{marginRight:8}}/>
              <Text style={this.styleFile.textStyle}>About</Text>
             </CardItem>
           </Card>
        </Content>
      </View>
      </View>
    );
  }
}
