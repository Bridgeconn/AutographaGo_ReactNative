import React, { Component } from 'react';
import {
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default class FixedSidebar extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const iconName = [
      {icon:'local-library',pressIcon:'EditNote',},
      {icon:'history',pressIcon:'History'},
      {icon:'search',pressIcon:'Search'},
      {icon:'note',pressIcon:'Notes'},
      {icon:'bookmark',pressIcon:'Bookmarks',},
      {icon:'border-color',pressIcon:'Highlights'},
      {icon:'settings',pressIcon:'Settings'}
    ]
    const iconPress = ['EditNote',' History','Search','Note','Bookmarks','Highlights','Settings']
    return (
      <View style={{flex:1,backgroundColor:'#000'}}>
        {
          iconName.map((iconName)=>
            <Icon name={iconName.icon} size={32} 
              style={{padding:16,color:"#fff"}}
              onPress={() =>this.props.onPress(iconName.pressIcon)}/>
          )
        }
        </View>
    );
  }
};

