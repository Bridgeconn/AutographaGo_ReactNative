import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  VirtualizedList,
} from 'react-native';
import DbQueries from '../utils/dbQueries'
import USFMParser from '../utils/USFMParser'
import Realm from 'realm'
import VerseViewBook from '../components/VerseViewBook'
const Constants = require('../utils/constants')

export default class Home extends Component {

  constructor(props) {
    super(props);

    Realm.copyBundledRealmFiles();

    this.queryBookWithId = this.queryBookWithId.bind(this)

    this.state = {
      modelData: [], // array of chapters in a book
      verseList: [], // array of all verses from all chapters
    }
  }

  componentDidMount() {
      this.queryBookWithId();
  }

  render() {
    if (this.state.modelData.length == 0) {
      return null;
    }
    return (
      <View style={styles.container}>      
        <ScrollView>
          <Text>
            Hello there
          </Text>
          {this.state.modelData.map((chapter) => 
            <Text>
              <Text style={{fontSize:26}}>
                {"\n"}{chapter.chapterNumber}
              </Text>
              <Text letterSpacing={24} onPress={() => {this.child.onPress();}} 
                style={{lineHeight:26, textAlign:'justify'}}>
                  {chapter.verseComponentsModels.map((verse) => 
                    <VerseViewBook
                      ref={instance => {this.child = instance;}}
                      verseComponent = {verse} />
                  )}
              </Text>
            </Text>
          )}
        </ScrollView>
        {/* <VirtualizedList
          data={this.state.verseList}
          renderItem={({item}) => <VerseViewBook verseComponent = {item} /> }
          getItem={(data, index) => data[index]}
          getItemCount={data => data.length} /> */}
      </View>
    );
  }

  async queryBookWithId() {
    let models = await DbQueries.queryBookWithId("gen", "ULB", "ENG");
    let verseModels = []
    if (models && models.length > 0) {
      let chapters = models[0].chapterModels;      
      // for (var i=0; i<chapters.length; i++) {
      //   let verses = chapters[i].verseComponentsModels;
      //   for (var j=0; j<verses.length; j++) {
      //     verseModels.push(verses[j]);
      //   }
      // }
      this.setState({modelData: chapters})
      this.setState({verseList: verseModels})      
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
