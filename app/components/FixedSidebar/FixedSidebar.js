import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { sidebarStyle } from './styles.js';


export default class FixedSidebar extends Component {
  constructor(props){
    super(props)
    this.state = {
      index:null
    }
  this.animatedValue = new Animated.Value(0)
    
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }
  

  handlePressIn = (index) =>{

    this.setState({index})
    Animated.spring(this.animatedValue, {
      toValue: 0
    }).start()
  }

  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
    }).start()
  }

  render() {
    console.log("render of fixed side")
    const animatedStyle = {
      transform: [{ scale: this.animatedValue}]
    }
    const iconName = [
      {icon:'local-library',pressIcon:'Book',},
      {icon:'history',pressIcon:'History'},
      {icon:'search',pressIcon:'Search'},
      {icon:'note',pressIcon:'Notes'},
      {icon:'bookmark',pressIcon:'Bookmarks',},
      {icon:'border-color',pressIcon:'Highlights'},
      {icon:'settings',pressIcon:'Settings'}
    ]
    const iconPress = ['EditNote',' History','Search','Note','Bookmarks','Highlights','Settings']
    return (
      <View style={sidebarStyle.container}>
        {
          iconName.map((iconName,index)=>
          <TouchableWithoutFeedback
          onPress={()=>this.props.onPress(iconName.pressIcon,index)}
          onPressIn={() =>this.handlePressIn(index)}
          onPressOut={()=>this.handlePressOut()}
          >
          <Animated.View style={[sidebarStyle.AnimatedViewCustom, this.props.doAnimate == true && index == this.state.index ? animatedStyle : null]}>
            <Icon name={iconName.icon} size={32} 
            style={sidebarStyle.iconColor}
              />
          </Animated.View>
          </TouchableWithoutFeedback>
          )

        }
        </View>
    );
  }
};

