import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Slider,
  Dimensions
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const width = Dimensions.get('window').width;
import {dimens} from '../utils/dimens.js'
export default class Setting extends Component {
  static navigationOptions = {
    headerTitle: 'Setting',
  };
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      day:true,
      night:false,
    };
  }
  change(value) {
    console.log("slider value "+value)
    switch(value) {
      case 1:{
        return this.setState({value:dimens.extraSmallFont.fontSize});
      }
      case 2:{
      return  this.setState({value:dimens.smallFont.fontSize});
      }
      case 3:{
       return this.setState({value:dimens.mediumFont.fontSize});
      }
      case 4:{
      return  this.setState({value:dimens.largeFont.fontSize});
      }
      case 5:{
      return  this.setState({value:dimens.extraLargeFont.fontSize});
      }
  }
  }

  render() {
      console.log("render value "+this.state.value)
    return (
      <View style={{flex:1,margin:8}}>
         <Content>
          <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16}}>
              <Left>
                <Text style={{fontSize:this.state.value}}>
                  Reading Mode
                </Text>
              </Left>
              <Right>
                <View style={{flexDirection:'row'}}>
                <Text style={{marginRight:8,marginBottom:20}}>  
                  Night
                </Text>
                <Icon name="brightness-7" size={24} color={this.state.night ? '#F62459' : "gray"} onPress={()=>this.setState({night:true,day:false})}/>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{marginRight:8}}>
                  Day
                </Text>
                <Icon name="brightness-5" size={24} color={this.state.day ? '#F62459' : "gray"}  onPress={()=>this.setState({night:false,day:true})}/>
                </View>
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16}}>
              <Right style={{alignItems:'flex-start'}}>
              <View style={{flexDirection:'row'}}>
              <Icon name='format-size' size={24} style={{marginRight:8}}/>
              <Text style={dimens.largeFont}>Text Size</Text>
              </View>
              <Slider
               style={{width:width-50, height: 30, borderRadius: 50}}
                step={1}
                minimumValue={0}
                maximumValue={5}
                thumbTintColor="#f62459"
                minimumTrackTintColor="#f62459"
                onValueChange={this.change.bind(this)}
              />
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16,flexDirection:'row'}}>
            <Icon name='settings-backup-restore' size={24} style={{marginRight:8}}/>
              <Text style={dimens.largeFont}>Backup and Restore</Text>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16,flexDirection:'row'}}>
            <Icon name='cloud-download' size={24} style={{marginRight:8}}/>
              <Text style={dimens.largeFont}>Download More Bibles</Text>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16,flexDirection:'row'}}>
            <Icon name='help' size={24} style={{marginRight:8}}/>
              <Text style={dimens.largeFont}>Open Hints</Text>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16,flexDirection:'row'}}>
            <Icon name='info' size={24} style={{marginRight:8}}/>
              <Text style={dimens.largeFont}>About</Text>
             </CardItem>
           </Card>
        </Content>
      </View>
    );
  }
}
