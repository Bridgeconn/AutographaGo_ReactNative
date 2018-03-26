import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Slider,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const width = Dimensions.get('window').width;
import {dimens} from '../utils/dimens.js'
import {primaryColor, darkColor} from '../utils/colors.js'
import {styles} from '../utils/styles.js'

export default class Setting extends Component {
  static navigationOptions = {
    headerTitle: 'Setting',
  };
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      day:true,
      night:false,
      backgroundDark:'',
      backgroundPrimary:''
    };
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
  onNightMode(){
    this.setState({night:true,day:false})
  }
  onDayMode(){
    this.setState({night:false,day:true})
  }
  componentDidMount(){
    this.setState({value:dimens.mediumFont})
  }
  render() {
      console.log("render value "+this.state.value)
    return (
      <View style={[styles.container,this.state.day ? primaryColor.backgroundColorPrimary : darkColor.backgroundColorDark]}>
      <View style={{flex:1,margin:8}}>
         <Content>
          <Card >
            <CardItem style={[{paddingTop:16,paddingBottom:16},this.state.day ? primaryColor.cardBackgroundColor : darkColor.cardBackgroundColor]}>
              <Left>
                <Text style={[this.state.value,this.state.day ? primaryColor.textColor : darkColor.textColor,]}>
                  Reading Mode
                </Text>
              </Left>
              <Right>
                <View style={{flexDirection:'row'}}>
                <Text style={[{marginRight:8,marginBottom:20},this.state.day ? primaryColor.textColor : darkColor.textColor]}>  
                  Night
                </Text>
                <Icon name="brightness-7" size={24} color={this.state.night ? '#26A65B' : "gray"} onPress={this.onNightMode.bind(this)}/>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={[{marginRight:8},this.state.day ? primaryColor.textColor : darkColor.textColor]}>
                  Day
                </Text>
                <Icon name="brightness-5" size={24} color={this.state.day ? '#F62459' : "gray"}  onPress={this.onDayMode.bind(this)}/>
                </View>
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={[{paddingTop:16,paddingBottom:16},this.state.day ? primaryColor.cardBackgroundColor : darkColor.cardBackgroundColor]}>
              <Right style={{alignItems:'flex-start'}}>
              <View style={{flexDirection:'row'}}>
              <Icon name='format-size' size={24} style={{marginRight:8}} color={this.state.day ? primaryColor.settingsIconColor.color : darkColor.settingsIconColor.color}/>
              <Text style={[this.state.value,this.state.day ? primaryColor.textColor : darkColor.textColor]}>Text Size</Text>
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
            <CardItem style={[{paddingTop:16,paddingBottom:16},this.state.day ? primaryColor.cardBackgroundColor : darkColor.cardBackgroundColor]}>
            <Icon name='settings-backup-restore' size={24} style={{marginRight:8}} color={this.state.day ? primaryColor.settingsIconColor.color : darkColor.settingsIconColor.color}/>
              <Text style={[this.state.value,this.state.day ? primaryColor.textColor : darkColor.textColor]}>Backup and Restore</Text>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={[{paddingTop:16,paddingBottom:16},this.state.day ? primaryColor.cardBackgroundColor : darkColor.cardBackgroundColor]}>
            <Icon name='cloud-download' size={24} style={{marginRight:8}} color={this.state.day ? primaryColor.settingsIconColor.color : darkColor.settingsIconColor.color}/>
              <Text style={[this.state.value,this.state.day ? primaryColor.textColor : darkColor.textColor]}>Download More Bibles</Text>
             </CardItem>
           </Card>
           <Card>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('OpenHints')}>
            <CardItem style={[{paddingTop:16,paddingBottom:16},this.state.day ? primaryColor.cardBackgroundColor : darkColor.cardBackgroundColor]}>
            <Icon name='help' size={24} style={{marginRight:8}} color={this.state.day ? primaryColor.settingsIconColor.color : darkColor.settingsIconColor.color} style={{marginRight:8}}/>
              <Text style={[this.state.value,this.state.day ? primaryColor.textColor : darkColor.textColor]}>Open Hints</Text>
             </CardItem>
             </TouchableOpacity>
           </Card>
           <Card>
            <CardItem style={[{paddingTop:16,paddingBottom:16},this.state.day ? primaryColor.cardBackgroundColor : darkColor.cardBackgroundColor]}>
            <Icon name='info' size={24} color={this.state.day ? primaryColor.settingsIconColor.color : darkColor.settingsIconColor.color} style={{marginRight:8}}/>
              <Text style={[this.state.value,this.state.day ? primaryColor.textColor : darkColor.textColor]}>About</Text>
             </CardItem>
           </Card>
        </Content>
      </View>
      </View>
    );
  }
}
