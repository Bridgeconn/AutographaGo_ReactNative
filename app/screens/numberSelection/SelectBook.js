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
export default class SelectBook extends Component {

  constructor(props){
    super(props)
    console.log("props number : "+JSON.stringify(props))

    this.onBookSelected = this.onBookSelected.bind(this)

    this.state = {
      booksList: this.props.screenProps.booksList,
      selectedIndex: 0,
    }
      this.styles = numberSelection(props.screenProps.colorFile, props.screenProps.sizeFile);   
    
  }

  onBookSelected(index) {
    this.setState({selectedIndex: index})
    // shift to tab 2
    console.log("on select" + index)
    this.props.screenProps.updateSelectedBook(index, this.props.screenProps.booksList[index].bookId)
    this.props.navigation.navigate('TabItemChapter');
  }
  
  render() {
    return (
      <View style={this.style.flexValue}>
        <FlatList
        numColumns={1}
        data={this.state.booksList}
        extraData={this.state.selectedIndex}
        renderItem={({item, index}) => 
        <TouchableOpacity style={[
          this.styles.selectBookTouchable,
          {
          backgroundColor:index == this.state.selectedIndex ? 'blue' : 'transparent'}]}
          onPress={()=>this.onBookSelected(index)} >
            <Text style={this.styles.bookName}>{item.bookName}</Text>
        </TouchableOpacity>
        }
      />
      </View>
    );
  }
};