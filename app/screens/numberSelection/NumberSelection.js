import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import DbQueries from '../../utils/dbQueries'
import USFMParser from '../../utils/USFMParser'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Segment,Button,Tab,Tabs} from 'native-base'
import { numberSelectionPageStyle } from './styles.js';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')
import {nightColors, dayColors} from '../../utils/colors.js'
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from '../../utils/dimens.js'

export default class NumberSelection extends Component {
  static navigationOptions = {
    headerTitle: 'Select Chapter',
  };

  constructor(props){
    super(props)
    console.log("rops number : "+JSON.stringify(props))
    this.state = {
      colorFile:this.props.screenProps.colorFile,
      sizeFile:this.props.screenProps.sizeFile,
      number:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      colorMode: this.props.screenProps.colorMode,
      sizeMode:this.props.screenProps.sizeMode,
      bookIndex: this.props.navigation.state.params.bookIndex,
    }

    this.bookData = this.props.screenProps.books[this.props.navigation.state.params.bookIndex]

    this.sizeFile;
    switch(this.props.screenProps.sizeMode) {
      case AsyncStorageConstants.Values.SizeModeXSmall: {
        this.sizeFile = extraSmallFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeSmall: {
        this.sizeFile = smallFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeNormal: {
        this.sizeFile = mediumFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeLarge: {
        this.sizeFile = largeFont;
        break;
      }
      case AsyncStorageConstants.Values.SizeModeXLarge: {
        this.sizeFile = extraLargeFont;
        break;
      }
    }
    this.styleFile = numberSelectionPageStyle(this.state.colorFile, this.sizeFile);
  }

  getItemLayout = (data, index) => (
    { length: 60, offset: 60 * index, index }
  )

  render() {
    return (
      <View style={this.styleFile.container}>
        <FlatList
        numColumns={4}
        data={this.bookData.chapterModels}
        renderItem={({item}) => 
            <View style={{flex:0.25,borderColor:'black',borderRightWidth:1, borderBottomWidth:1,
            height:width/4, justifyContent:"center"}}>
                <Text style={{textAlign:"center",alignItems:"center"}}>{item.chapterNumber}</Text>
            </View>
        }
      />
      </View>
    );
  }
};