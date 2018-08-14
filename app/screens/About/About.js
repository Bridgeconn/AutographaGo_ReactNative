import React, { Component } from 'react';
import {
  Text,
  View,
  Linking,
  ScrollView
} from 'react-native';
import packageJson from '../../../package.json'
import { aboutPage } from './styles.js'


export default class About extends Component {
  static navigationOptions = {
    headerTitle: 'About',
  };
  constructor(props){
    super(props);
    this.styles = aboutPage(props.screenProps.colorFile, props.screenProps.sizeFile);   
  }
  render() {
    const bulletIcon = '\u2022  '
    return (
      <ScrollView  contentContainerStyle={this.styles.container}>
      <View style={this.styles.textContainer}>
        <Text style={this.styles.textStyle}>
          <Text>Version {packageJson.version}{"\n\n"}</Text>
          <Text>
            <Text style={this.styles.italicText}>Autographa </Text>
            literally refers to the original copies of the writings that now form your Bible.{"\n\n"}
          </Text>
          <Text>
            The new
            <Text style={this.styles.boldText}> Multilingual Autographa Go </Text>
            App is a part of our innovative product line-up which features at{" "}
            <Text
                style={this.styles.linkText}
                onPress={() => {Linking.openURL('www.autographa.com')}}
            >www.autographa.com
            </Text>
            .{"\n\n"}
          </Text>
          <Text>
            Now for the first time ever, we have added over forty (and counting) Indian languages that can be freely downloaded.{"\n\n"}
          </Text>
          <Text>
            This Bible App is by default bundled with the English unfoldingWord Literal Text (ULT) and the unfoldingWord Simplified Text (UST) Versions from {" "}
          </Text>
          <Text
            style={this.styles.linkText}
            onPress={() =>{Linking.openURL('https://unfoldingword.org/bible/')}}
          >https://unfoldingword.org/bible/{"\n\n"}
          </Text>
        </Text>

        <Text style={this.styles.featureList}>Key Features:{"\n"}</Text>
        
        <View style={this.styles.featureView}>
          <Text style={this.styles.textStyle}>{bulletIcon}</Text>
          <Text style={this.styles.textStyle}>A one-stop collection of major and minor Indian language Bibles{"\n"}</Text>
        </View>
        <View style={this.styles.featureView}>
          <Text style={this.styles.textStyle}>{bulletIcon}</Text>
          <Text style={this.styles.textStyle}>Minimalistic and user-friendly interface {"\n"}</Text>
        </View>
        <View style={this.styles.featureView}>
          <Text style={this.styles.textStyle}>{bulletIcon}</Text>
          <Text style={this.styles.textStyle}>Bookmark and highlight your favorite verses {"\n"}</Text>
        </View>
        <View style={this.styles.featureView}>
          <Text style={this.styles.textStyle}>{bulletIcon}</Text>
          <Text style={this.styles.textStyle}>Note taking feature with clickable references {"\n"}</Text>
        </View >
        <View style={this.styles.featureView}>
          <Text style={this.styles.textStyle}>{bulletIcon}</Text>
          <Text style={this.styles.textStyle}>Search option {"\n\n"}</Text>
        </View>
        <Text>
          <Text  style={this.styles.textStyle}>Published by Friends of Agape 2017 (MIT License) </Text>
          <Text
            style={this.styles.linkText}
            onPress={() => {Linking.openURL('www.friendsofagape.org')}}
          >www.friendsofagape.org
          </Text>
          <Text  style={this.styles.textStyle} >{"\n\n"}Link to the Github repository for this project: </Text>
          <Text
            style={this.styles.linkText}
            onPress={() => {Linking.openURL('https://github.com/friendsofagape/Autographa-Go ')}}
          >https://github.com/friendsofagape/Autographa-Go{"\n\n"}
          </Text>    
        </Text>
        </View>
       </ScrollView>
    );
  }
}
