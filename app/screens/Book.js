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
import VerseViewBook from '../components/VerseViewBook'
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
            <Text>
              <Text style={{fontSize:26}}> 
                {chapter.chapterNumber}
              </Text>
              <Text onPress={() => {this.child.onPress();}} style={{}}> 
                {chapter.verseComponentsModels.map((verse) =>
                  <VerseViewBook 
                    ref={instance => {this.child = instance;}} 
                    verseComponent = {verse} />
                )}
              </Text>
            </Text>
        )}
        </ScrollView>
      </View>
    );
  }

  async queryBookWithId() {
    let models = await DbQueries.queryBookWithId("1jn", "ULB", "ENG");
    if (models && models.length > 0) {
        this.setState({modelData: models[0].chapterModels})
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
