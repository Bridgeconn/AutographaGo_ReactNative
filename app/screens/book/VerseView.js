import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
const Constants = require('../../utils/constants')

export default class VerseView extends Component {

  onPress() {
    this.props.getSelection(
        this.props.index, 
        this.props.verseData.chapterNumber,
        this.props.verseData.verseNumber
    );
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
          } else if (temp[i] == ("\\b")) {
            break;
          } else {
            tempRes.push(temp[i] + " ");
          }
          break;
        }
      }
    }
    if (footNote) {
      tempRes.push(Constants.StylingConstants.CLOSE_FOOT_NOTE+" ");
    }
    return tempRes.join("");
  }

  has(selectedReferences, obj) {
    for(var i = 0; i < selectedReferences.length; i++) {
      if (selectedReferences[i] == obj) {
        return true;
      }
    }
    return false;
  }

  render() {
    let obj = this.props.verseData.chapterNumber + '_' + this.props.index + '_' + this.props.verseData.verseNumber;
    let isSelect = this.has(this.props.selectedReferences, obj);
    let isHighlight = this.props.verseData.highlighted;

    switch(this.props.verseData.type) {
      case Constants.MarkerTypes.VERSE: {
        if (this.props.verseData.verseNumber == "1" || 
            this.props.verseData.verseNumber.startsWith("1-")) {
              return (
                <Text onPress={() => {this.onPress()}}
                >
                  <Text style={this.props.styles.verseChapterNumber}> 
                    {"\n"}{this.props.verseData.chapterNumber}{' '}
                  </Text>
                  <Text style={isSelect && isHighlight 
                    ? this.props.styles.verseTextSelectedHighlighted 
                    : !isSelect && !isHighlight 
                    ? this.props.styles.verseTextNotSelectedNotHighlighted
                    : !isSelect && isHighlight
                    ? this.props.styles.verseTextNotSelectedHighlighted
                    : this.props.styles.verseTextSelectedNotHighlighted}
                    >
                    {this.getResultText(this.props.verseData.text)}
                  </Text>
                 </Text>
              );
        }
        return (
          <Text onPress={() => {this.onPress()}}>
            <Text style={this.props.styles.verseNumber} >
              {this.props.verseData.verseNumber}{" "}
            </Text>
            <Text style={isSelect && isHighlight 
                    ? this.props.styles.verseTextSelectedHighlighted 
                    : !isSelect && !isHighlight 
                    ? this.props.styles.verseTextNotSelectedNotHighlighted
                    : !isSelect && isHighlight
                    ? this.props.styles.verseTextNotSelectedHighlighted
                    : this.props.styles.verseTextSelectedNotHighlighted}
                    >
              {this.getResultText(this.props.verseData.text)}
            </Text>         
          </Text>
        );
      }
      case Constants.MarkerTypes.PARAGRAPH: {
        if (this.props.verseData.verseNumber == "1" || 
            this.props.verseData.verseNumber.startsWith("1-")) {
              return (
                <Text style={this.props.styles.paragraphText} >
                  {this.getResultText(this.props.verseData.text)}
                </Text>      
              );
        }
        return (
          <Text style={this.props.styles.paragraphText} >
            {"\n"} {this.getResultText(this.props.verseData.text)}
          </Text>
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING: {
      }
      case Constants.MarkerTypes.SECTION_HEADING_ONE: {
        return (
          <Text style={this.props.styles.headingOne} >
            {this.props.verseData.text}
          </Text>
        );        
      }
      case Constants.MarkerTypes.SECTION_HEADING_TWO: {
        return (
          <Text style={this.props.styles.headingTwo} >
            {this.props.verseData.text}
          </Text>
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING_THREE: {
        return (
          <Text style={this.props.styles.headingThree} >
            {this.props.verseData.text}
          </Text>
        );
      }
      case Constants.MarkerTypes.SECTION_HEADING_FOUR: {
        return (
          <Text style={this.props.styles.headingFour} >
            {this.props.verseData.text}
          </Text>
        );      
      }
      default: {
        return null;
      }
    }
  }
}