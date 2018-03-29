import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
} from 'react-native';
import DbQueries from '../utils/dbQueries'
import USFMParser from '../utils/USFMParser'
import Realm from 'realm'
const Constants = require('../utils/constants')

export default class Home extends Component {

  constructor(props) {
    super(props);

    Realm.copyBundledRealmFiles();

    this.state = {
        modelData: [] // array of chapters in a book
    }

    this.queryBookWithId = this.queryBookWithId.bind(this)
  }

  componentDidMount() {
      this.queryBookWithId();
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Text>
          Hello there
        </Text>
        {this.state.modelData.map((chapter) => 
            // <Text>{chapter.chapterNumber}</Text>
          chapter.verseComponentsModels.map((verse) =>
            <Text>{verse.verseNumber} {verse.text}</Text>             
          )
        )}
        </ScrollView>
      </View>
    );
  }

  renderChapter(chapterItem) {
    var res = "";
    chapterItem.verseComponentsModels.map((verseItem) =>{
      switch (verseItem.type){
        case Constants.MarkerTypes.PARAGRAPH: {
            res = res + "\n";
            break;
        }
        case Constants.MarkerTypes.VERSE: {
            res = res + " " + verseItem.verseNumber + " " + verseItem.text;
            break;
        }
      }
    });
    console.log(res);
  }

  async queryBookWithId() {
    let models = await DbQueries.queryBookWithId("1jn", "UDB", "ENG");
    if (models && models.length > 0) {
        this.setState({modelData: models[0].chapterModels})
        this.renderChapter(this.state.modelData[0])
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
