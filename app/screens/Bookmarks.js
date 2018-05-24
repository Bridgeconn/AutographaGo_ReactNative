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

export default class BookMarks extends Component {
  static navigationOptions = {
    headerTitle: 'Bookmarks',
  };
  
  constructor(props) {
    super(props)

    this.mappingData = id_name_map;
    this.removeBookmark = this.removeBookmark.bind(this)

    this.state = {
      bookmarkList: [],
      modelData: [],
    }
  }

  async componentDidMount() {
    let modelData = await DbQueries.queryBooks(this.props.screenProps.versionCode, 
        this.props.screenProps.languageCode);
    console.log("model len= " + modelData.length)
    this.setState({modelData})
    var bookmarkList = []
    for (var i=0; i<modelData.length; i++) {
      var list = modelData[i].bookmarksList
      if (list) {
        console.log("loist len = "+modelData[i].bookId+" : "+modelData[i].bookmarksList.length)
        for (var j=0; j<list.length; j++) {
          var model={bookId: modelData[i].bookId, bookName: this.getBookNameFromMapping(modelData[i].bookId), 
            chapterNumber: list[j]}
          bookmarkList.push(model)
        }
      }
    }
    this.setState({bookmarkList})
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

  removeBookmark(bookId, chapterNumber, index) {
    for (var i=0; i<this.state.modelData.length; i++) {
      if (this.state.modelData[i].bookId == bookId) {
          DbQueries.updateBookmarkInBook(this.state.modelData[i], chapterNumber, false);
          break;  
      }
    }
    var bookmarkList = [...this.state.bookmarkList]
    bookmarkList.splice(index, 1);
    this.setState({bookmarkList})
  }
  
  render() {
    return (
        <View style={{flex:1}}>
          <FlatList
            data={this.state.bookmarkList}
            // getItemLayout={this.getItemLayout}
            renderItem={({item, index}) => 
              <View style={{flexDirection:'row', justifyContent: 'space-between',margin:16}}>
                <Text style={{fontSize:18}}>{item.bookName} {item.chapterNumber}</Text>
                <Icon name='delete-forever' size={28} onPress={() => {
                  this.removeBookmark(item.bookId, item.chapterNumber, index)
                  }
                  } 
                />
              </View>
            }
          />
        </View>
    );
  }
}