import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Slider,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const width = Dimensions.get('window').width;
import {dimens} from '../../utils/dimens.js'
import {settingsPageStyle} from './styles.js'
import {nightColors, dayColors} from '../../utils/colors.js'
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')


// import settingsPageStylestyles from 'style.js'

export default class Setting extends Component {
  static navigationOptions = {
    headerTitle: 'Setting',
  };
  constructor(props) {
    super(props);
    console.log("SCREEN = " + JSON.stringify(this.props))
    console.log("SCREEN PORPS = " + this.props.screenProps)
    this.state = {
      value: '',
      day:true,
      night:false,
    };
    var colorFile = this.props.screenProps.colorMode == AsyncStorageConstants.Values.DayMode 
      ? dayColors
      : nightColors;
    var sizeFile;
    switch(this.props.screenProps.sizeMode) {
      case AsyncStorageConstants.Values.SizeModeXSmall: {
        sizeFile = nightColors;
        break;
      }
    }
    this.styleFile = settingsPageStyle(colorFile, sizeFile);
  }
  change(value) {
    console.log("slider value "+value)
    switch(value) {
      case 0:{
        return this.setState({value:dimens.extraSmallFont});
      }
      case 1:{
      return  this.setState({value:dimens.smallFont});
      }
      case 2:{
       return this.setState({value:dimens.mediumFont});
      }
      case 3:{
      return  this.setState({value:dimens.largeFont});
      }
      case 4:{
      return  this.setState({value:dimens.extraLargeFont});
      }
  }
  }
   async onNightMode(){
    this.setState({night:true,day:false})
    // try {
    //   await AsyncStorage.setItem(AsyncStorageConstant.nightModeBackgroundColor,JSON.stringify(true));
    //   await AsyncStorage.setItem(AsyncStorageConstant.dayModeBackgroundColor,JSON.stringify(false));
    //   } catch (error) {
    //     console.error('AsyncStorage error: ' + error);
    //   }
    // var value = await AsyncStorage.getItem(AsyncStorageConstant.nightModeBackgroundColor)
    // console.log("night asyncstorage "+value)
    // var value = await AsyncStorage.getItem(AsyncStorageConstant.dayModeBackgroundColor)
    // console.log("day asyncstorage "+value)
  }
  async onDayMode(){
    this.setState({night:false,day:true})
    try {
    await AsyncStorage.setItem('keyday','1')
    const  value = await AsyncStorage.getItem('keyday')
    console.log('key day value '+value)
    // await AsyncStorage.setItem(AsyncStorageConstant.dayModeBackgroundColor,JSON.stringify(true));
    } catch (error) {
      console.error('AsyncStorage error: ' + error);
    }
    // var value = await AsyncStorage.getItem(AsyncStorageConstant.nightModeBackgroundColor)
    // console.log("night asyncstorage "+value)
    // var value = await AsyncStorage.getItem(AsyncStorageConstant.dayModeBackgroundColor)
    // console.log("day asyncstorage "+value)
  }

  componentDidMount(){
    this.setState({value:dimens.mediumFont})
  }
  render() {
      console.log("render value "+this.state.value)
    return (
      <View style={this.styleFile.container}>
      <View style={{flex:1,margin:8}}>
         <Content>
          <Card >
            <CardItem style={[{paddingTop:16,paddingBottom:16}]}>
              <Left>
                <Text style={[this.state.value,]}>
                  Reading Mode
                </Text>
              </Left>
              <Right>
                <View style={{flexDirection:'row'}}>
                <Text style={[{marginRight:8,marginBottom:20},]}>  
                  Night
                </Text>
                <Icon name="brightness-7" size={24} color={this.state.night ? '#26A65B' : "gray"} onPress={this.onNightMode.bind(this)}/>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={[{marginRight:8}]}>
                  Day
                </Text>
                <Icon name="brightness-5" size={24} color={this.state.day ? '#F62459' : "gray"}  onPress={this.onDayMode.bind(this)}/>
                </View>
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={[{paddingTop:16,paddingBottom:16},]}>
              <Right style={{alignItems:'flex-start'}}>
              <View style={{flexDirection:'row'}}>
              <Icon name='format-size' size={24} style={{marginRight:8}} />
              <Text style={[this.state.value]}>Text Size</Text>
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
              <Text style={[this.state.value,]}>Download More Bibles</Text>
             </CardItem>
           </Card>
           <Card>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('OpenHints')}>
            <CardItem style={[{paddingTop:16,paddingBottom:16},{backgroundColor:dayColors.backgroundColor ? this.state.day : nightColors.backgroundColor}]}>
            <Icon name='help' size={24} style={{marginRight:8}} />
              <Text style={[this.state.value]}>Open Hints</Text>
             </CardItem>
             </TouchableOpacity>
           </Card>
           <Card>
            <CardItem style={[{paddingTop:16,paddingBottom:16}]}>
            <Icon name='info' size={24} style={{marginRight:8}}/>
              <Text style={[this.state.value]}>About</Text>
             </CardItem>
           </Card>
        </Content>
      </View>
      </View>
    );
  }
}
