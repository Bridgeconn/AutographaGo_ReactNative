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

    this.state = {
        verseData: this.props.verseComponent,
        isSelected: false,
    }
  }

  onPress() {
    console.log("on press" + this.state.isSelected)
    this.setState({isSelected: !this.state.isSelected})
  }

  getResultText(text) {
    var initString = text;
    var temp = initString.split(' ');
    var footNote = false;
    var tempRes = [];
    for (var i=0; i<temp.length; i++) {
      switch (temp[i]) {
        case Constants.MarkerConstants.MARKER_NEW_PARAGRAPH: {
          tempRes.push("\n");
          break;
        }
        case Constants.StylingConstants.MARKER_Q: {
          tempRes.push("\n    ");
          break;
        }
        default: {
          if (temp[i].startsWith(Constants.StylingConstants.MARKER_Q)) {
            var str = temp[i];
            var intString = str.replace(/[^0-9]/g, "");
            var number = intString == "" ? 1 : intString;
            tempRes.push("\n");
            for (var o = 0; o < parseInt(number, 10); o++) {
                tempRes.push(Constants.StylingConstants.TAB_SPACE);
            }
          } else if (temp[i].startsWith(Constants.StylingConstants.REGEX_ESCAPE)) {
              break;
          } else if (temp[i].startsWith(Constants.StylingConstants.FOOT_NOTE)) {
              footNote = true;
              tempRes.push(Constants.StylingConstants.OPEN_FOOT_NOTE);
          } else {
            tempRes.push(temp[i] + " ");
          }
          break;
        }
      }
    }
    if (footNote) {
      tempRes.push(Constants.StylingConstants.CLOSE_FOOT_NOTE);
    }
    return tempRes.join("");
  }

  render() {
    switch(this.state.verseData.type) {
      case Constants.MarkerTypes.VERSE: {
        if (this.state.verseData.verseNumber == "1" || 
            this.state.verseData.verseNumber.startsWith("1-")) {
              return (
                <Text style={{fontSize:16, backgroundColor: this.state.isSelected ? 'yellow' : 'none'}} >
                  {this.getResultText(this.state.verseData.text)}
                </Text>
              );
        }
        return (
          <Text>
            <Text style={{fontSize:10}} >
              {this.state.verseData.verseNumber}{" "}
            </Text>
            <Text style={{fontSize:16, textDecorationLine: this.state.isSelected ? 'underline' : 'none'}} >
              {this.getResultText(this.state.verseData.text)}
            </Text>         
          </Text>
        );
      }
      case Constants.MarkerTypes.PARAGRAPH: {
        if (this.state.verseData.verseNumber == "1" || 
            this.state.verseData.verseNumber.startsWith("1-")) {
              return (
                <Text style={{fontSize:16}} >
                  {this.getResultText(this.state.verseData.text)}
                </Text>      
              );
        }
        return (
          <Text style={{fontSize:16}} >
            {"\n"} {this.getResultText(this.state.verseData.text)}
          </Text>
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING: {
      }
      case Constants.MarkerTypes.SECTION_HEADING_ONE: {
        return (
          <Text style={{fontSize:24}} >
            {this.state.verseData.text}
          </Text>
        );        
      }
      case Constants.MarkerTypes.SECTION_HEADING_TWO: {
        return (
          <Text style={{fontSize:22}} >
            {this.state.verseData.text}
          </Text>
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING_THREE: {
        return (
          <Text style={{fontSize:20}} >
            {this.state.verseData.text}
          </Text>
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING_FOUR: {
        return (
          <Text style={{fontSize:18}} >
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
