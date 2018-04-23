import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  VirtualizedList,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import DbQueries from '../utils/dbQueries'
import USFMParser from '../utils/USFMParser'
import Realm from 'realm'
import VerseViewBook from '../components/VerseViewBook'
const Constants = require('../utils/constants')

const width = Dimensions.get('window').width;

export default class Book extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.bookName,
  });

  constructor(props) {
    super(props);

    this.queryBookWithId = this.queryBookWithId.bind(this)

    this.state = {
      modelData: [], // array of chapters in a book
      verseList: [], // array of all verses from all chapters
      isLoading: false,
      bookId: this.props.navigation.state.params.bookId,
    }
  }

  componentDidMount() {
      this.queryBookWithId();
  }

  render() {
    // if (this.state.modelData.length == 0) {
    //   return null;
    // }
    return (
      <View style={styles.container}>
      {this.state.isLoading ? 
        <ActivityIndicator 
          animating={this.state.isLoading ? true : false} 
          size="large" 
          color="#0000ff" />
          :
        <FlatList
          data={this.state.modelData}
          renderItem={({item}) => 
            <Text style={{marginLeft:16, marginRight:16}}>
              <Text letterSpacing={24} onPress={() => {this.child.onPress();}} 
                  style={{lineHeight:26, textAlign:'justify'}}>
                  {item.verseComponentsModels.map((verse) => 
                      <VerseViewBook
                          ref={instance => {this.child = instance;}}
                          verseComponent = {verse} />
                  )}
              </Text>
            </Text> 
          }
          // getItem={(data, index) => data[index]}
          keyExtractor={(item, index) => {
            return item.chapterNumber
          }}
          // getItemCount={data => data.length} 
          />
        }
      </View>
    );
  }

  async queryBookWithId() {
    this.setState({isLoading: true})
    let models = await DbQueries.queryBookWithId(this.state.bookId, "ULB", "ENG");
    // let verseModels = []
    if (models && models.length > 0) {
      let chapters = models[0].chapterModels;      
      // for (var i=0; i<chapters.length; i++) {
      //   let verses = chapters[i].verseComponentsModels;
      //   for (var j=0; j<verses.length; j++) {
      //     verseModels.push(verses[j]);
      //   }
      // }
      this.setState({modelData: chapters})
      this.setState({isLoading:false})
      // this.setState({verseList: verseModels})      
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