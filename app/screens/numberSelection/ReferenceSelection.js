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
import SelectBook from './SelectBook'
import SelectChapter from './SelectChapter'
import SelectVerse from './SelectVerse'

const TabNav = TabNavigator({
  TabItemBook: {
    screen: SelectBook,
    navigationOptions: {
        tabBarLabel:"Book"
    }
  },
  TabItemChapter: {
      screen: SelectChapter,
      navigationOptions: {
          tabBarLabel:"Chapter"
      }
  },
  TabItemVerse: {
    screen: SelectVerse,
    navigationOptions: {
        tabBarLabel:"Verse"
    }
  },
}, {
  tabBarOptions: {  
    activeTintColor: '#f2f2f2',
    activeBackgroundColor: '#2EC4B6',
    inactiveTintColor: '#666',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    labelStyle: {
      fontSize: 22,
      padding: 12
    }
  }
});

export default class ReferenceSelection extends Component {
  static navigationOptions = {
    headerTitle: 'Select Reference',
  };

  constructor(props){
    super(props)
    console.log("REFERNCE SELECTION NAVIGATION : " + JSON.stringify(props.navigation))
    console.log("REFERNCE SELECTION SCREEN : " + JSON.stringify(props.screenProps))    

    this.state = {
      languageCode: this.props.screenProps.languageCode, 
      versionCode: this.props.screenProps.versionCode,
      booksList: this.props.screenProps.booksList,
      selectedBookIndex: 0,
      selectedBookId: this.props.screenProps.booksList[0].bookId,
      selectedBookName: this.props.screenProps.booksList[0].bookName,
      numOfChapters: this.props.screenProps.booksList[0].numOfChapters,
      selectedChapterIndex: 0,
      selectedChapterNumber: 1,

      selectedVerseIndex: 0,
      selectedVerseNumber: '',
    }

    this.updateSelectedBook = this.updateSelectedBook.bind(this)
    this.updateSelectedChapter = this.updateSelectedChapter.bind(this)
    this.updateSelectedVerse = this.updateSelectedVerse.bind(this)
  }

  updateSelectedBook = (index, bookId) => {
    this.setState({selectedBookIndex: index, selectedBookId: bookId, 
      selectedBookName: this.state.booksList[index].bookName, 
      numOfChapters: this.state.booksList[index].numOfChapters})
  }

  updateSelectedChapter = (index, chapterNumber) => {
    this.setState({selectedChapterIndex: index, selectedChapterNumber: chapterNumber})
  }

  updateSelectedVerse = (verseNumber, index) => {
    this.setState({selectedVerseIndex: index, selectedVerseNumber: verseNumber})
    // pop current screen, and pass data
    this.props.navigation.state.params.getReference(
      this.state.bookId, 
      this.state.selectedBookName, 
      this.state.selectedChapterNumber, 
      this.state.selectedVerseNumber)    
    this.props.navigation.pop()
  }
  
  render() {
    return (
        <TabNav screenProps={{
          languageCode: this.state.languageCode,
          versionCode: this.state.versionCode,

          booksList: this.state.booksList,
          selectedBookIndex: this.state.selectedBookIndex,
          selectedBookId: this.state.selectedBookId,
          numOfChapters: this.state.numOfChapters,
          selectedChapterIndex: this.state.selectedChapterIndex,
          selectedChapterNumber: this.state.selectedChapterNumber,
          selectedVerseIndex: this.state.selectedVerseIndex,
          selectedVerseNumber: this.state.selectedVerseNumber,
          
          updateSelectedBook: this.updateSelectedBook,
          updateSelectedChapter: this.updateSelectedChapter,
          updateSelectedVerse: this.updateSelectedVerse
        }}/>
    );
  }
  
};