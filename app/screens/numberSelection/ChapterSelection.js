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
import { numberSelection } from './styles.js';

export default class ChapterSelection extends Component {

  constructor(props){
    super(props)
    console.log("props number : "+JSON.stringify(props.navigation))

    this.state = {
      bookId: this.props.navigation.state.params.bookId,
      bookName: this.props.navigation.state.params.bookName,
      bookIndex: this.props.navigation.state.params.bookIndex,
      numOfChapters: this.props.navigation.state.params.numOfChapters,
      bookData: Array.from(new Array(this.props.navigation.state.params.numOfChapters), (x,i) => i+1),
    }

    this.styles = numberSelection(props.screenProps.colorFile, props.screenProps.sizeFile);   
  }

  onNumPress(item) {
    this.props.navigation.replace('RV', {bookId: this.state.bookId, 
    bookName: this.state.bookName, chapterNumber: item })
    var time =  new Date()
    DbQueries.addHistory(this.props.screenProps.languageCode, this.props.screenProps.versionCode, 
    this.state.bookId, item, time);
  }
  
  render() {
    return (
      <View style={this.styles.flexValue}>
        <FlatList
        numColumns={4}
        data={this.state.bookData}
        renderItem={({item}) => 
        <TouchableOpacity style={this.styles.chapterSelectionTouchable}
          onPress={
            ()=> this.onNumPress(item)
            }
          >
            {/* <View style={{flex:0.25,borderColor:'black',borderRightWidth:1, borderBottomWidth:1,
            height:width/4, justifyContent:"center"}}> */}
                <Text style={this.styles.chapterNum}>{item}</Text>
            {/* </View> */}
            </TouchableOpacity>
        }
      />
      </View>
    );
  }
};