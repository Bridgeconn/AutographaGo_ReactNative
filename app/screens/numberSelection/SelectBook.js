import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import DbQueries from '../../utils/dbQueries'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import {nightColors, dayColors} from '../../utils/colors.js'
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from '../../utils/dimens.js'

export default class SelectBook extends Component {

  constructor(props){
    super(props)
    console.log("props number : "+JSON.stringify(props))

    this.onBookSelected = this.onBookSelected.bind(this)

    this.state = {
      booksList: this.props.screenProps.booksList,
      selectedIndex: 0,
    }
    
  }

  onBookSelected(index) {
    this.setState({selectedIndex: index})
    // shift to tab 2
    console.log("on select" + index)
    this.props.screenProps.updateSelectedBook(index, this.props.screenProps.booksList[index].bookId)
    this.props.navigation.navigate('TabItemChapter');
  }
  
  render() {
    var styles = this.props.screenProps.styles
    return (
      <View style={styles.tabContainer}>
        <FlatList
        numColumns={1}
        data={this.state.booksList}
        extraData={this.state.selectedIndex}
        renderItem={({item, index}) => 
        <TouchableOpacity style={[
          styles.selectBookTouchable,
          {
          backgroundColor:'transparent'}]}
          onPress={()=>this.onBookSelected(index)} >
            <Text style={[styles.selectText, 
                  {fontWeight: this.state.selectedIndex == index ? "bold" : "normal"}]}>{item.bookName}</Text>
        </TouchableOpacity>
        }
      />
      </View>
    );
  }
};