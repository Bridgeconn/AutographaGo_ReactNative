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

    let models = DbQueries.getSomeDataFromModelA() // make this asynchoronous call

    // let modelAData = DbQueries.getSomeDataFromModelA()

    this.state = {
        modelData: models
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
        Hello there
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
      </View>
    );
  }

  showRows() {
    console.log("Pressed button SHOW")
    DbQueries.getSomeDataFromModelA()
  }

  addRow() {
    console.log("Pressed button ADD")
    DbQueries.addNewChapter(Math.floor(Math.random() * (20)) + 1, 12);
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
