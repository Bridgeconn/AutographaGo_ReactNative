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


export default class SelectVerse extends Component {

  constructor(props){
    super(props)
    console.log("props number : "+JSON.stringify(props.navigation))

    this.onVerseSelected = this.onVerseSelected.bind(this)
    this.queryBook = this.queryBook.bind(this)

    this.state = {
      isLoading: false,      
      selectedBookId: this.props.screenProps.selectedBookId,
      selectedChapterNumber: this.props.screenProps.selectedChapterNumber,
      bookData: [], 
      selectedIndex: 0,
    }
    
  }

  componentDidMount() {
    this.setState({isLoading: true}, () => {
      this.queryBook()
    })
  }

  async queryBook() {
    let model = await DbQueries.queryBookWithId(this.props.screenProps.versionCode, 
      this.props.screenProps.languageCode, this.state.selectedBookId);
    this.setState({isLoading:false})
    if (model == null) {
      console.log("mode lnull")
    } else {
      if (model.length > 0) {
        let verseList = [];
        for (var i=0; i<model[0].chapterModels.length; i++) {
          if (model[0].chapterModels[i].chapterNumber == this.state.selectedChapterNumber) {
            for (var j=0; j<model[0].chapterModels[i].verseComponentsModels.length; j++) {
              if (verseList.length > 0) {
                if (model[0].chapterModels[i].verseComponentsModels[j].verseNumber == verseList[verseList.length - 1]) {
                  continue;
                } else {
                  verseList.push(model[0].chapterModels[i].verseComponentsModels[j].verseNumber)
                }
              } else {
                verseList.push(model[0].chapterModels[i].verseComponentsModels[j].verseNumber)
              }
            }
            break;
          }
        }
        this.setState({bookData: verseList})
      }
    }
  }

  onVerseSelected(item, index) {
    this.setState({selectedIndex: index})
    // shift to tab 2
    console.log("on select" + index)
    this.props.screenProps.updateSelectedVerse(item, index)
  }
  
  render() {
    var styles = this.props.screenProps.styles
    return (
      <View style={styles.tabContainer}>
        <FlatList
        numColumns={4}
        data={this.state.bookData}
        renderItem={({item, index}) => 
        <TouchableOpacity style={[styles.selectGridNum,
          {backgroundColor:'transparent'}]}
          onPress={()=>this.onVerseSelected(item, index)}
          >
                <Text style={[styles.selectText, 
                  {fontWeight: this.state.selectedIndex == index ? "bold" : "normal"}]}>{item}</Text>
            </TouchableOpacity>
        }
      />
      </View>
    );
  }
};