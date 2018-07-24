import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DbQueries from '../../utils/dbQueries'
import id_name_map from '../../assets/mappings.json'
import { bookStyle } from './styles.js'
import {getBookNameFromMapping} from '../../utils/UtilFunctions';

export default class BookMarks extends Component {
  static navigationOptions = {
    headerTitle: 'Bookmarks',
  };
  
  constructor(props) {
    super(props)

    this.mappingData = id_name_map;
    this.removeBookmark = this.removeBookmark.bind(this)
    this.refreshData = this.refreshData.bind(this)

    this.state = {
      bookmarkList: [],
      modelData: [],
      isLoading:false
    }
    
    this.styles = bookStyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
    this.refreshData = this.refreshData.bind(this)
  }

  async componentDidMount() {
    this.refreshData()  
  } 

  // getItemLayout = (data, index) => {
  //   return { length: height, offset: height * index, index };
  // }

  // componentWillReceiveProps(props) {
  //   console.log("RECEIVE PROPS ::: " + JSON.stringify(props))
  //   console.log("RECEIVE PROPS BOOK<ARKS ::: " + JSON.stringify(props.screenProps.updateBookmarks))
  //   if (props.screenProps.updateBookmarks == true) {
  //     this.refreshData()
  //   }
  // }


  removeBookmark(bookId, chapterNumber, index) {
    for (var i=0; i<this.state.modelData.length; i++) {
      if (this.state.modelData[i].bookId == bookId) {
          DbQueries.removeBookmarkFromBook(this.state.modelData[i], chapterNumber);
          break;  
      }
    }
    var bookmarkList = [...this.state.bookmarkList]
    bookmarkList.splice(index, 1);
    this.setState({bookmarkList})
  }

  refreshData(){
    this.setState({isLoading: true}, async () => {
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
            var model={bookId: modelData[i].bookId, bookName: getBookNameFromMapping(modelData[i].bookId), 
              chapterNumber: list[j]}
            bookmarkList.push(model)
          }
        }
      }
      this.setState({bookmarkList,isLoading:false})
    }
  )
  }

  updateBookmark(){
    this.refreshData()
  }
  // componentWillUnmount(){
  //   console.log("book mark add")
  //   this.props.navigation.setParams({updateBookmark:this.updateBookmark})
  // }
  
  render() {
    return (
        <View style={this.styles.container}>
        {
        this.state.isLoading ? <ActivityIndicator animate={true}/>
          : 
        <FlatList
          data={this.state.bookmarkList}
          contentContainerStyle={this.state.bookmarkList.length === 0 && this.styles.centerEmptySet}
          // getItemLayout={this.getItemLayout}
          renderItem={({item, index}) => 
            <TouchableOpacity style={this.styles.bookmarksView}
              onPress={()=>this.props.navigation.navigate('Book', {bookId: item.bookId, 
                bookName: item.bookName, chapterNumber: item.chapterNumber,
                updateBookmark:this.updateBookmark
              })}>

              <Text style={this.styles.bookmarksText}>
                {item.bookName} {item.chapterNumber}
              </Text>
              <Icon name='delete-forever' style={this.styles.iconCustom}  size={28} onPress={() => {
                this.removeBookmark(item.bookId, item.chapterNumber, index)
                }
                } 
              />
          
            </TouchableOpacity>
          }
          ListEmptyComponent={

            <View style={this.styles.emptyMessageContainer}>
            <Icon name="collections-bookmark" style={this.styles.emptyMessageIcon}/>
              <Text
                style={this.styles.messageEmpty}
              >
               No Bookmark added
              </Text>
              
            </View>
          }
        />
        }
          
        </View>
    );
  }
}