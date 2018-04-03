import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
const Constants = require('../utils/constants')
import { TextWithLetterSpacing } from './TextWithLetterSpacing'

export default class VerseViewBook extends Component {

  constructor(props) {
    super(props);

    this.letterSpacing = 24;
    this.state = {
        verseData: this.props.verseComponent,
        isSelected: false,
    }
  }

  onPress() {
    console.log("on press" + this.state.isSelected)
    this.setState({isSelected: !this.state.isSelected})
  }

  render() {
    switch(this.state.verseData.type) {
      case Constants.MarkerTypes.VERSE: {
        if (this.state.verseData.verseNumber == "1" || 
            this.state.verseData.verseNumber.startsWith("1-")) {
              return (
                <TextWithLetterSpacing spacing={this.letterSpacing} children={this.state.verseData.text} />
              );
        }
        return (
          <Text>
            <TextWithLetterSpacing 
              textStyle={{fontSize:10}}
              spacing={this.letterSpacing} 
              children={this.state.verseData.verseNumber} />
            <TextWithLetterSpacing 
              textStyle={{textDecorationLine: this.state.isSelected ? 'underline' : 'none'}}
              spacing={this.letterSpacing} 
              children={ this.state.verseData.text} />            
          </Text>
        );
      }
      case Constants.MarkerTypes.PARAGRAPH: {
        if (this.state.verseData.verseNumber == "1" || 
            this.state.verseData.verseNumber.startsWith("1-")) {
              return null;
        }
        return (
          <TextWithLetterSpacing 
            spacing={this.letterSpacing} 
            children={"\n"} />
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING: {
        return (
          <TextWithLetterSpacing 
            textStyle={{fontSize:20}} 
            spacing={this.letterSpacing} 
            children={this.state.verseData.text} />
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING_ONE: {
        return null;        
      }
      case Constants.MarkerTypes.SECTION_HEADING_TWO: {
        return null;
      }
      case Constants.MarkerTypes.SECTION_HEADING_THREE: {
        return null;
      }
      case Constants.MarkerTypes.SECTION_HEADING_FOUR: {
        return null;        
      }
      default: {
        return null;
      }
    }
  }

}
