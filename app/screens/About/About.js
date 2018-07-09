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
    return (
      <ScrollView style={{margin:12}} showsVerticalScrollIndicator ={false}>
        <Text style={this.styles.textStyle}>

          <Text>Version {packageJson.version}{"\n\n"}</Text>
          <Text>
            <Text style={{fontWeight:'bold',fontStyle:'italic'}}>Autographa </Text>
            literally refers to the original copies of the writings that now form your Bible.{"\n\n"}
          </Text>
          <Text>
            The new
            <Text style={{fontWeight:"bold"}}> Multilingual Autographa Go </Text>
            App is a part of our innovative product line-up which features at{" "}
            <Text
                style={{
                  color: 'red',
                  textDecorationLine:'underline'

              }}
                onPress={() => {Linking.openURL('www.autographa.com')}}
            >www.autographa.com
            </Text>
            .{"\n\n"}
          </Text>
          <Text>
            Now for the first time ever, we have added over forty (and counting) Indian languages that can be freely downloaded.{"\n\n"}
          </Text>
          <Text>
            This Bible App is by default bundled with the English Unlocked Literal Bible (ULB) and the Unlocked Dynamic (UDB) Versions from {" "}
          </Text>
          <Text
            style={{
              color: 'red',
              textDecorationLine:'underline'
              
          }}
            onPress={() =>{Linking.openURL('https://unfoldingword.org/bible/')}}
          >https://unfoldingword.org/bible/{"\n\n"}
          </Text>
        </Text>

        <Text style={{fontWeight:"bold"}}>Key Features:{"\n"}</Text>

        <View style={{flexDirection:"row"}}>
          <Text>{'\u2022  '}</Text>
          <Text>A one-stop collection of major and minor Indian language Bibles{"\n"}</Text>
        </View>
        <View style={{flexDirection:"row"}}>
          <Text>{'\u2022  '}</Text>
          <Text>Minimalistic and user-friendly interface {"\n"}</Text>
        </View>
        <View style={{flexDirection:"row"}}>
          <Text>{'\u2022  '}</Text>
          <Text>Bookmark and highlight your favourite verses {"\n"}</Text>
        </View>
        <View style={{flexDirection:"row"}}>
          <Text>{'\u2022  '}</Text>
          <Text>Note taking feature with clickable references {"\n"}</Text>
        </View >
        <View style={{flexDirection:"row"}}>
          <Text>{'\u2022  '}</Text>
          <Text>Search option {"\n\n"}</Text>
        </View>
        <Text>
          <Text>Published by Friends of Agape 2017 (MIT License) </Text>
          <Text
            style={{
            color: 'red',
            textDecorationLine:'underline'
            
          }}
            onPress={() => {Linking.openURL('www.friendsofagape.org')}}
          >www.friendsofagape.org
          </Text>
          <Text>{"\n\n"}Link to the Github repository for this project: </Text>
          <Text
            style={{color: 'red',
            textDecorationLine:'underline'
            
          }}
            onPress={() => {Linking.openURL('https://github.com/friendsofagape/Autographa-Go ')}}
          >https://github.com/friendsofagape/Autographa-Go{"\n\n"}
          </Text>    
        </Text>
       </ScrollView>
    );
  }
}
