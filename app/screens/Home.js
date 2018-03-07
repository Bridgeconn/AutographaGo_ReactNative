import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import BookItem from '../models/BookItem'
import ChapterItem from '../models/ChapterItem'

const Realm = require('realm');

type Props = {};
export default class Home extends Component<Props> {

  constructor(props) {
    super(props);

    // This is a Results object, which will live-update.
    this.chapterLists = realm.objects('ChapterItem');
    if (this.chapterLists.length < 1) {
        realm.write(() => {
            realm.create('ChapterItem', { chapterNumber: 1, numberOfVerses: 5 });
        });
    }
    this.chapterLists.addListener((chapterNumber, changes) => {
        console.log("changed: " + JSON.stringify(changes));
    });
    console.log("registered listener");

    // Bind all the methods that we will be passing as props.
    this._addNewChapterList = this._addNewChapterList.bind(this);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.onPressLearnMore}
          title="Learn More"
          color="#841584"
        />
      </View>
    );
  }

  onPressLearnMore() {
    console.log("Pressed button learn more")
    this._addNewChapterItem
  }

  _addNewChapterItem(list) {
    let items = list.items;
    realm.write(() => {
        items.push({ text: '' });
    });
  }

  _addNewChapterList() {
    let items = this.chapterLists;
    realm.write(() => {
        // realm.create('ChapterItem', { name: '', creationDate: new Date() });
    });
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
