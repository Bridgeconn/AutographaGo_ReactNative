import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import DbQueries from '../utils/dbQueries'
import DbHelper from '../utils/dbHelper';

type Props = {};

export default class Home extends Component<Props> {

  constructor(props) {
    super(props);

    DbHelper.setRealm();

    this.state = {
        modelData: []
    }

    this.showRows = this.showRows.bind(this);
  }

  async componentWillMount() {
    let models = await DbQueries.getSomeDataFromModel()
    if (models) {
      this.setState({modelData: models})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
        Hello there
        </Text>
        <Text>
        {this.state.modelData.length}
        </Text>
        <Button
          onPress={this.addRow}
          title="Add"
          color="#841584"
        />
        <Button
          onPress={this.showRows}
          title="Show"
          color="#841584"
        />
        <Button
          onPress={this.showBooks}
          title="Book Show"
          color="#841584"
        />
        <Button
          onPress={this.addBook}
          title="Book Add"
          color="#841584"
        />
      </View>
    );
  }

  async showRows() {
    let models = await DbQueries.getSomeDataFromModel();
    if (models) {
      this.setState({modelData: models})
    }
  }

  addRow() {
    var value = {chapterNumber: Math.floor(Math.random() * (20)) + 1, numberOfVerses: 12}
    DbQueries.addNewChapter(value);
  }

  addBook() {
    var value1 = {chapterNumber: Math.floor(Math.random() * (20)) + 1, numberOfVerses: 10}
    var value2 = {chapterNumber: Math.floor(Math.random() * (20)) + 1, numberOfVerses: 11}
    var value3 = [];
    value3.push(value1)
    value3.push(value2)
    var value4 = {bookId: 'BO1', bookName: 'Book 1', bookNumber: 2, section: 'OT', chapterItems: value3}
    DbQueries.addNewBook(value4)
  }

  showBooks() {
    DbQueries.getLinks();
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
