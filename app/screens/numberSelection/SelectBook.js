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
    return (
      <View style={{flex:1}}>
        <FlatList
        numColumns={1}
        data={this.state.booksList}
        extraData={this.state.selectedIndex}
        renderItem={({item, index}) => 
        <TouchableOpacity style={{flex:1, borderColor:'black', borderRightWidth:1,
          borderBottomWidth:1, borderLeftWidth:1, justifyContent:"center", 
          backgroundColor:index == this.state.selectedIndex ? 'blue' : 'transparent'}}
          onPress={()=>this.onBookSelected(index)} >
            <Text style={{textAlign:"center",alignItems:"center", color:'black', margin:8}}>{item.bookName}</Text>
        </TouchableOpacity>
        }
      />
      </View>
    );
  }
};