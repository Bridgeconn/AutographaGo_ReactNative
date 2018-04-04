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
  BackHandler,
} from 'react-native';
import { HeaderBackButton} from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const width = Dimensions.get('window').width;
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from '../../utils/dimens.js'
import {settingsPageStyle} from './styles.js'
import {nightColors, dayColors} from '../../utils/colors.js'
import AsyncStorageUtil from '../../utils/AsyncStorageUtil.js';
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')

// import settingsPageStylestyles from 'style.js'

export default class Setting extends Component {
  static navigationOptions = {
    headerTitle: 'Settings',
    headerLeft: (
      <HeaderBackButton
        color="white"
         onPress={()=>console.log("hereee")}/>
    )
  };
  
  constructor(props) {
    super(props);
    console.log("SCREEN = " + JSON.stringify(this.props))
    console.log("SCREEN PORPS = " + this.props.screenProps)

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    
    this.state = {
      value: null,
      isDayMode: this.props.screenProps.colorMode == AsyncStorageConstants.Values.DayMode ? true : false,
    };

    this.colorFile = this.props.screenProps.colorMode == AsyncStorageConstants.Values.DayMode
      ? dayColors
      : nightColors;
    
    var sizeFile;
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

    this.styleFile = settingsPageStyle(this.colorFile, sizeFile);
    
  }

  handleBackPress = () => {
    console.log("on handle back press")
    return true;
  }
  
  change(value) {
    console.log("slider value "+value)
    switch(value) {
      case 0:{
        return this.setState({value:extraSmallFont});
      }
      case 1:{
        return  this.setState({value:smallFont});
      }
      case 2:{
       return this.setState({value:mediumFont});
      }
      case 3:{
        return  this.setState({value:largeFont});
      }
      case 4:{
        return  this.setState({value:extraLargeFont});
      }
    }
  }

  onColorModeChange(value){
    this.setState({isDayMode: value})
    
    AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.ColorMode, 
      value 
      ? AsyncStorageConstants.Values.DayMode 
      : AsyncStorageConstants.Values.NightMode);

    this.props.screenProps.updateColor(value 
      ? AsyncStorageConstants.Values.DayMode 
      : AsyncStorageConstants.Values.NightMode);
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
                <Icon name="brightness-7" size={24} color={!this.state.isDayMode ? '#26A65B' : "gray"} onPress={this.onColorModeChange.bind(this, false)}/>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={[{marginRight:8}]}>
                  Day
                </Text>
                <Icon name="brightness-5" size={24} color={this.state.isDayMode ? '#F62459' : "gray"}  onPress={this.onColorModeChange.bind(this, true)}/>
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
                onValueChange={this.change.bind(this)}
                value={2}
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
