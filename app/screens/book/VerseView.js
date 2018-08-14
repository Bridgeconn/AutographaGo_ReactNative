import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
const Constants = require('../../utils/constants')
import {getResultText} from '../../utils/UtilFunctions';

export default class VerseView extends Component {

  onPress() {
    this.props.getSelection(
        this.props.index, 
        this.props.verseData.chapterNumber,
        this.props.verseData.verseNumber
    );
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
                    {getResultText(this.props.verseData.text)}
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
              {getResultText(this.props.verseData.text)}
            </Text>         
          </Text>
        );
      }
      case Constants.MarkerTypes.PARAGRAPH: {
        if (this.props.verseData.verseNumber == "1" || 
            this.props.verseData.verseNumber.startsWith("1-")) {
              return (
                <Text style={this.props.styles.paragraphText} >
                  {getResultText(this.props.verseData.text)}
                </Text>      
              );
        }
        return (
          <Text style={this.props.styles.paragraphText} >
            {"\n"} {getResultText(this.props.verseData.text)}
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