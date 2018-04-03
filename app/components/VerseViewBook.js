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
              var resString = "";
              var initString = this.state.verseData.text;
              var temp = initString.split(' ');
              for (var i=0; i<temp.length; i++) {
                switch (temp[i]) {
                  case Constants.MarkerConstants.MARKER_NEW_PARAGRAPH: {
                    resString = resString + "\n";
                    break;
                  }
                  case Constants.StylingConstants.MARKER_Q: {
                    resString = resString + "\n    ";
                    break;
                  }
                  default: {
                    resString = "";
                    break;
                  }
                }
              }
              return (
                <Text style={{fontSize:16, backgroundColor: 'yellow'}} 
                  letterSpacing={this.letterSpacing} >
                  {this.state.verseData.text}
                </Text>
              );
        }
        return (
          <Text>
            <Text style={{fontSize:10}} letterSpacing={this.letterSpacing} > 
              {this.state.verseData.verseNumber}
            </Text>
            <Text style={{fontSize:16, textDecorationLine: this.state.isSelected ? 'underline' : 'none'}} 
              letterSpacing={this.letterSpacing} >
              { this.state.verseData.text}
            </Text>         
          </Text>
        );
      }
      case Constants.MarkerTypes.PARAGRAPH: {
        if (this.state.verseData.verseNumber == "1" || 
            this.state.verseData.verseNumber.startsWith("1-")) {
              return (
                <Text style={{fontSize:16}} letterSpacing={this.letterSpacing} >
                  {this.state.verseData.text}
                </Text>      
              );
        }
        return (
          <Text style={{fontSize:16}} letterSpacing={this.letterSpacing} >
            {"\n"} {this.state.verseData.text}
          </Text>
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING: {
      }
      case Constants.MarkerTypes.SECTION_HEADING_ONE: {
        return (
          <Text style={{fontSize:24}} letterSpacing={this.letterSpacing} >
            {this.state.verseData.text}
          </Text>
        );        
      }
      case Constants.MarkerTypes.SECTION_HEADING_TWO: {
        return (
          <Text style={{fontSize:22}} letterSpacing={this.letterSpacing} >
            {this.state.verseData.text}
          </Text>
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING_THREE: {
        return (
          <Text style={{fontSize:20}} letterSpacing={this.letterSpacing} >
            {this.state.verseData.text}
          </Text>
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING_FOUR: {
        return (
          <Text style={{fontSize:18}} letterSpacing={this.letterSpacing} >
            {this.state.verseData.text}
          </Text>
        );      
      }
      default: {
        return null;
      }
    }
  }

}
