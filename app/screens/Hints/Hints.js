import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Segment,Button,Tab,Tabs} from 'native-base'
import { HintStyle } from './styles.js';
const width = Dimensions.get('window').width;
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
export default class HintsPage extends Component {
static navigationOptions = {
    headerTitle: 'Hints',
};
constructor(props){
  super(props)
  console.log("props in hints page"+JSON.stringify(this.props))
  this.animatedValue = new Animated.Value(0)
  this.state = {
    index:null,
    iconName: [
        {icon:'local-library',hint:'Continue reading where you last left', visible:false,size: new Animated.Value(0.3),},
        {icon:'history',hint:'See all your reading history', visible:false,size: new Animated.Value(0.3)},
        {icon:'search',hint:'Search for text', visible:false,size: new Animated.Value(0.3)},
        {icon:'note',hint:'Manage all your notes', visible:false,size: new Animated.Value(0.3),},
        {icon:'bookmark',hint:'See all your bookmarks', visible:false,size: new Animated.Value(0.3),},
        {icon:'border-color',hint:'See all your highlights', visible:false,size: new Animated.Value(0.3),},
        {icon:'settings',hint:'Manage app settings', visible:false,size: new Animated.Value(0.3),}
      ],
  }
  this.styleFile = HintStyle(this.props.screenProps.colorFile, this.props.screenProps.sizeFile);
}
  showHints(index){
    console.log("hints param"+index)
    let visibility = [ ...this.state.iconName ];
    visibility[index] = {...visibility[index], visible: true};
    this.setState({ iconName: visibility}, () =>   {
    console.log("visible text"+this.state.iconName.visibility)
    });
    this.handlePressIn(index)
    this.handlePressOut()
    
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }
  
  handlePressIn(index) {
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
    const animatedStyle = {
      transform: [{ scale: this.animatedValue}]
    }
    return (
      <View style={this.styleFile.container}>
          <View style={this.styleFile.iconView}>
            {this.state.iconName.map((iconValue,index)=>
              <View style={this.styleFile.iconRow}>
                <TouchableWithoutFeedback
                  onPress={this.showHints.bind(this,index)}
                  onPressIn={this.handlePressIn.bind(this,index)}
                  onPressOut={this.handlePressOut.bind(this)}
                >
                  <Animated.View style={[this.styleFile.AnimatedViewCustom, index == this.state.index ? animatedStyle : null]}>
                    <Icon name={iconValue.icon} size={36} style={this.styleFile.iconColor}/>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View> 
            )} 
          </View>
          <View style={this.styleFile.textView}>
            {this.state.iconName.map((iconValue,index)=>
              <View style={this.styleFile.textRow}>
                <Text style={this.styleFile.textStyle}>{iconValue.visible ? iconValue.hint : null}</Text>
              </View> 
            )} 
          </View>
      </View>
    );
   }
 }



