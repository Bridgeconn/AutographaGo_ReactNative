import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
const Constants = require('../utils/constants')

export default class VerseViewBook extends Component {

  constructor(props) {
    super(props);

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
                <Text style={{backgroundColor: 'yellow'}}> {this.state.verseData.text}</Text>          
              );
        }
        return (
          <Text>
          <Text style = {{fontSize:10}}> {this.state.verseData.verseNumber}</Text>
          <Text style={{textDecorationLine: this.state.isSelected ? 'underline' : 'none'}}> {this.state.verseData.text}</Text>          
          </Text>
        );
      }
      case Constants.MarkerTypes.PARAGRAPH: {
        if (this.state.verseData.verseNumber == "1" || 
            this.state.verseData.verseNumber.startsWith("1-")) {
              return null;
        }
        return (
          <Text>
            {"\n"}
          </Text>
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING: {
        return (
          <Text style = {{fontSize:20}}>
            {this.state.verseData.text}
          </Text>
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
