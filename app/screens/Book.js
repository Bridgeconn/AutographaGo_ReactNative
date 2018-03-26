import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import DbQueries from '../utils/dbQueries'
import USFMParser from '../utils/USFMParser'

export default class Home extends Component {

  constructor(props) {
    super(props);

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
        <Text>
          Hello there
        </Text>
        <Text>
          {this.state.modelData.length}
        </Text>
        <Button
          onPress={this.queryBookWithId}
          title="Book With Id"
          color="#841584"
        />
      </View>
    );
  }

  async queryBookWithId() {
    let models = await DbQueries.queryBookWithId("1jn", "UDB", "ENG");
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
