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
import FixedSidebar from '../../components/FixedSidebar/FixedSidebar'
export default class HintsPage extends Component {
static navigationOptions = {
    headerTitle: 'Hints',
};
constructor(props){
  super(props)
  console.log("props in hints page"+JSON.stringify(this.props))
  this.state = {
    iconName: [
        {icon:'local-library',hint:'Continue reading where you last left', visible:false},
        {icon:'history',hint:'See all your reading history', visible:false},
        {icon:'search',hint:'Search for text', visible:false},
        {icon:'note',hint:'Manage all your notes', visible:false},
        {icon:'bookmark',hint:'See all your bookmarks', visible:false},
        {icon:'border-color',hint:'See all your highlights', visible:false},
        {icon:'settings',hint:'Manage app settings', visible:false}
      ],
  }
  this.showHints = this.showHints.bind(this)
  this.styleFile = HintStyle(this.props.screenProps.colorFile, this.props.screenProps.sizeFile);
}
  showHints(icon, index){
    let visibility = [ ...this.state.iconName ];
    visibility[index] = {...visibility[index], visible: true};
    this.setState({ iconName: visibility});
  }
  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue}]
    }
    return (
      <View style={this.styleFile.container}>
      
        <FixedSidebar 
          onPress={this.showHints}
          doAnimate = {true}

        />
         
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



