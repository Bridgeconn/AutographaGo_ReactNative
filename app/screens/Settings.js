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

export default class Setting extends Component {
  static navigationOptions = {
    headerTitle: 'Setting',
  };
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
      day:true,
      night:false,
    };
  }
  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }

  render() {
    return (
      <View style={{flex:1,margin:8}}>
         <Content>
          <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16}}>
              <Left>
                <Text style={{fontSize:18}}>
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
              <Text style={{textAlign:'left',fontSize:18}}>Text Size</Text>
              </View>
              <Slider
               style={{width:width-50, height: 30, borderRadius: 50}}
                step={1}
                minimumValue={0}
                maximumValue={100}
                thumbTintColor="#f62459"
                minimumTrackTintColor="#f62459"
                onValueChange={this.change.bind(this)}
                value={this.state.value}
              />
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16,flexDirection:'row'}}>
            <Icon name='settings-backup-restore' size={24} style={{marginRight:8}}/>
              <Text style={{textAlign:'left',fontSize:18}}>Backup and Restore</Text>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16,flexDirection:'row'}}>
            <Icon name='cloud-download' size={24} style={{marginRight:8}}/>
              <Text style={{textAlign:'left',fontSize:18}}>Download More Bibles</Text>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16,flexDirection:'row'}}>
            <Icon name='help' size={24} style={{marginRight:8}}/>
              <Text style={{textAlign:'left',fontSize:18}}>Open Hints</Text>
             </CardItem>
           </Card>
           <Card>
            <CardItem style={{paddingTop:16,paddingBottom:16,flexDirection:'row'}}>
            <Icon name='info' size={24} style={{marginRight:8}}/>
              <Text style={{textAlign:'left',fontSize:18}}>About</Text>
             </CardItem>
           </Card>
        </Content>
      </View>
    );
  }
}
