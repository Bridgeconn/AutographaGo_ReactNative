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

export default class SelectChapter extends Component {

  constructor(props){
    super(props)
    console.log("props number : "+JSON.stringify(props.screenProps.numOfChapters))

    this.onChapterSelected = this.onChapterSelected.bind(this)
    
    this.state = {
      numOfChapters: this.props.screenProps.numOfChapters,
      bookData: Array.from(new Array(this.props.screenProps.numOfChapters), (x,i) => i+1),
      selectedIndex: 0,
    }
    this.styles = numberSelection(props.screenProps.colorFile, props.screenProps.sizeFile);   
    
  }

  onChapterSelected(item, index) {
    this.setState({selectedIndex: index})
    // shift to tab 2
    console.log("on select" + index)
    this.props.screenProps.updateSelectedChapter(index, item)
    this.props.navigation.navigate('TabItemVerse');
  }
  
  render() {
    return (
      <View style={this.styles.flexValue}>
        <FlatList
        numColumns={4}
        data={this.state.bookData}
        renderItem={({item, index}) => 
        <TouchableOpacity style={[this.styles.selectGridNum,
          {backgroundColor: this.state.selectedIndex == index ? 'blue' : 'transparent'}]}
          onPress={()=>this.onChapterSelected(item, index)}
          >
                <Text style={this.styles.selectText}>{item}</Text>
            </TouchableOpacity>
        }
      />
      </View>
    );
  }
};