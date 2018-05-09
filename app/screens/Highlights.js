import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DbQueries from '../utils/dbQueries'
import id_name_map from '../assets/mappings.json'

export default class HighLights extends Component {
  static navigationOptions = {
    headerTitle: 'Highlights',
  };

  constructor(props) {
    super(props)

    this.mappingData = id_name_map;
    this.removeHighlight = this.removeHighlight.bind(this)

    this.state = {
      modelData: [],
    }
  }

  async componentDidMount() {
    let modelData = await DbQueries.queryHighlights(this.props.screenProps.versionCode, 
        this.props.screenProps.languageCode);
    console.log("routes len =" + modelData)
    console.log("routes len = done " + modelData.length )
    this.setState({modelData})

  }

  // getItemLayout = (data, index) => {
  //   return { length: height, offset: height * index, index };
  // }

  getBookNameFromMapping(bookId) {
    var obj = this.mappingData.id_name_map;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key == bookId) {
                var val = obj[key];
                return val.book_name;
            }
        }
    }
    return null;
  }

  removeHighlight(index) {
    DbQueries.updateHighlightsInVerse(this.props.screenProps.languageCode, 
      this.props.screenProps.versionCode, this.state.modelData[index].bookId, 
      this.state.modelData[index].chapterNumber, this.state.modelData[index].verseNumber, false)

    var modelData = [...this.state.modelData]
    modelData.splice(index, 1);
    this.setState({modelData})
  }

  render() {
    return (
      <View style={{flex:1}}>

      <FlatList
          data={this.state.modelData}
          // getItemLayout={this.getItemLayout}
          renderItem={({item, index}) => 
            <View style={{flexDirection:'row', justifyContent: 'space-between',margin:16}}>
              <Text style={{fontSize:18}}>{this.getBookNameFromMapping(item.bookId)} {item.chapterNumber} {':'} {item.verseNumber}</Text>
              <Icon name='delete-forever' size={28} onPress={() => {this.removeHighlight(index)}} />
            </View>
          }
          />
      </View>
    );
  }
}
