import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import DbQueries from '../../utils/dbQueries'
import { numberSelectionPageStyle } from './styles.js';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import {nightColors, dayColors} from '../../utils/colors.js'
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from '../../utils/dimens.js'
import {createMaterialTopTabNavigator, TabNavigator} from 'react-navigation'
import VerseSelector from './VerseSelector'

const TabNav = TabNavigator({
  TabItem1: {
      screen: VerseSelector,
      navigationOptions: {
          tabBarLabel:"Chapter",
          tabBarIcon: ({ tintColor }) => <Icon name={"glass"} size={30} color={tintColor} />
      }
  },
  TabItem2: {
    screen: VerseSelector,
    navigationOptions: {
        tabBarLabel:"Verse",
        tabBarIcon: ({ tintColor }) => <Icon name={"glass"} size={30} color={tintColor} />
    }
  },
}, {
      tabBarOptions: {
      
     activeTintColor: '#f2f2f2',
     activeBackgroundColor: '#2EC4B6',
     inactiveTintColor: '#666',
     tabBarPosition: 'bottom',
   swipeEnabled: true,
     labelStyle: {
       fontSize: 22,
       padding: 12
     }
  }
});

export default class NumberSelection extends Component {
  static navigationOptions = {
    headerTitle: 'Select Chapter',
  };

  constructor(props){
    super(props)

    this.state = {
      bookId: this.props.navigation.state.params.bookId,
      bookName: this.props.navigation.state.params.bookName,
      bookIndex: this.props.navigation.state.params.bookIndex,
      numOfChapters: this.props.navigation.state.params.numOfChapters,
      bookData: Array.from(new Array(this.props.navigation.state.params.numOfChapters), (x,i) => i+1),
    }
  }
  
  render() {
    return (
        <TabNav screenProps={this.state}/>
    );
  }
  
};