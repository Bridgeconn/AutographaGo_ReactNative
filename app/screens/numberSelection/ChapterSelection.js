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
  }
  
  render() {
    return (
      <View style={{flex:1}}>
        <FlatList
        numColumns={4}
        data={this.state.bookData}
        renderItem={({item}) => 
        <TouchableOpacity style={{flex:0.25,borderColor:'black',borderRightWidth:1, borderBottomWidth:1,
          height:width/4, justifyContent:"center"}}
          onPress={
            ()=>this.props.navigation.replace('RV', {bookId: this.state.bookId, 
              bookName: this.state.bookName, chapterNumber: item })
            }
          >
            {/* <View style={{flex:0.25,borderColor:'black',borderRightWidth:1, borderBottomWidth:1,
            height:width/4, justifyContent:"center"}}> */}
                <Text style={{textAlign:"center",alignItems:"center", color:'black'}}>{item}</Text>
            {/* </View> */}
            </TouchableOpacity>
        }
      />
      </View>
    );
  }
};