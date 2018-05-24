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
  TouchableOpacity,
} from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import DbQueries from '../utils/dbQueries'
import Realm from 'realm'
import VerseViewBook from '../components/VerseViewBook'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorageUtil from '../utils/AsyncStorageUtil';
import AsyncStorageConstants from '../utils/AsyncStorageConstants';
const Constants = require('../utils/constants')

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ViewTypes = {
    FULL: 0
};
 
export default class RV extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.bookName,
    headerRight: (
      <Icon 
          onPress={()=> {navigation.state.params.onIconPress()}} 
          name={'bookmark'} 
          color={navigation.state.params.isBookmark ? "red" : "white"} 
          size={24} 
          style={{marginHorizontal:8}} 
      />      
    ),
  });

  constructor(props) {
    super(props);
    console.log("BOOK props--" + JSON.stringify(props))

    let { width, height } = Dimensions.get("window");

    this._layoutProvider = new LayoutProvider(
      index => {
          return ViewTypes.FULL;
      },
      (type, dim) => {
          dim.width = width;
          dim.height = height;
      }
    );

    this.getSelectedReferences = this.getSelectedReferences.bind(this)
    this.queryBook = this.queryBook.bind(this)
    this.onBookmarkPress = this.onBookmarkPress.bind(this)

    this._rowRenderer = this._rowRenderer.bind(this);
    this.onListScroll = this.onListScroll.bind(this)
    this.onVisibleIndexesChanged = this.onVisibleIndexesChanged.bind(this)
    this._footerRenderer = this._footerRenderer.bind(this)
    console.log("props RV chapter=  "  + this.props.navigation.state.params.chapterNumber)
    this.state = {
      languageCode: this.props.screenProps.languageCode,
      versionCode: this.props.screenProps.versionCode,
      modelData: [],
      isLoading: false,
      showBottomBar: false,
      bookId: this.props.navigation.state.params.bookId,
      bookName: this.props.navigation.state.params.bookName,
      chapterNumber: this.props.navigation.state.params.chapterNumber,
      bottomHighlightText: true,
      bookmarksList: [],
      isBookmark: false,
      dataProvider: null,
      currentVisibleChapter: this.props.navigation.state.params.chapterNumber,
      selectedReferenceSet: [],
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({onIconPress: this.onBookmarkPress})    
    this.props.navigation.setParams({isBookmark: this.state.isBookmark})
    this.setState({isLoading: true}, () => {
      this.queryBook()
    })
  }

  async queryBook() {
    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    let model = await DbQueries.queryBookWithId(this.props.screenProps.versionCode, 
        this.props.screenProps.languageCode, this.state.bookId);
    this.setState({isLoading:false})
    if (model == null) {
      console.log("mode lnull")
    } else {
      if (model.length > 0) {
        this.setState({modelData: model[0].chapterModels, bookmarksList: model[0].bookmarksList ? model[0].bookmarksList : []}, () => {
          this.setState({dataProvider: dataProvider.cloneWithRows(this.state.modelData)}, () => {
              this.setState({isBookmark: this.state.bookmarksList.indexOf(this.state.currentVisibleChapter) > -1}, () => {
                this.props.navigation.setParams({isBookmark: this.state.isBookmark})      
              })
          })
        })
      }
    }
  }

  onBookmarkPress() {
    var bookmarksList = [...this.state.bookmarksList]
    console.log("size bookmark " + bookmarksList.length)
    var index = bookmarksList.indexOf(this.state.currentVisibleChapter);
    console.log("index bookmark " + index + " :: visible chapter =" + this.state.currentVisibleChapter)    
    if (index > -1) {
        bookmarksList.splice(index, 1)
        DbQueries.updateBookmarkInBook(this.state.modelData, this.state.currentVisibleChapter, false);
      } else {
        bookmarksList.push(this.state.currentVisibleChapter)
        DbQueries.updateBookmarkInBook(this.state.modelData, this.state.currentVisibleChapter, true);
    }
    this.setState({bookmarksList}, () => {
      console.log("size now after = " + this.state.bookmarksList.length)
    })
    this.setState({isBookmark: index > -1 ? false : true}, () => {
        this.props.navigation.setParams({isBookmark: this.state.isBookmark})      
    })
  }

  getSelectedReferences(vIndex, chapterNum) {
    let obj = chapterNum + '_' + vIndex
    
    let selectedReferenceSet = [...this.state.selectedReferenceSet]
    
    var found = false;
    for(var i = 0; i < selectedReferenceSet.length; i++) {
      if (selectedReferenceSet[i] == obj) {
        found = true;
        selectedReferenceSet.splice(i, 1);
        break;
      }
    }
    if (!found) {
      selectedReferenceSet.push(obj)
    }

    this.setState({selectedReferenceSet}, () => {
      console.log("selected size : " + this.state.selectedReferenceSet.length + " :: " + JSON.stringify(this.state.selectedReferenceSet))

      let selectedCount = this.state.selectedReferenceSet.length, highlightCount = 0;
      
      for (let item of this.state.selectedReferenceSet) {
        // for (let item of this.state.selectedReferenceSet.values()) {
          let tempVal = item.split('_')
          if (this.state.modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].highlighted) {
            highlightCount++
          }
      }
      this.setState({showBottomBar: this.state.selectedReferenceSet.length > 0 ? true : false, bottomHighlightText: selectedCount == highlightCount ? false : true})
    })
  }

  doHighlight = async () => {
    let modelData = [...this.state.modelData]
    if (this.state.bottomHighlightText == true) {
      // do highlight
      for (let item of this.state.selectedReferenceSet) {
        let tempVal = item.split('_')
        // modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].highlighted = true
        // modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].selected = false
        
      {/*this[`child_${item}`].doHighlight()*/}

        await DbQueries.updateHighlightsInBook(this.state.modelData, tempVal[0] - 1, tempVal[1], true)
      }
    } else {
      // remove highlight
      for (let item of this.state.selectedReferenceSet) {
        let tempVal = item.split('_')
        // modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].highlighted = false
        // modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].selected = false

        {/*this[`child_${item}`].removeHighlight()*/}

        await DbQueries.updateHighlightsInBook(this.state.modelData, tempVal[0] - 1, tempVal[1], false)
      }
    }
    this.setState({modelData, selectedReferenceSet: [], showBottomBar: false})
  }

  onListScroll = (rawEvent, offsetX, offsetY) => {
    console.log("on list scroll :: " + rawEvent + " :: " + offsetX + " :: " + offsetY);
  }

  onVisibleIndexesChanged = (all, now, notNow) => {
    if (all.length > 0) {
      let cnum = all[0] + 1;
      console.log("on visible iunde change = " + cnum)
      this.setState({currentVisibleChapter: cnum})
      this.setState({isBookmark: this.state.bookmarksList.indexOf(cnum) > -1}, () => {
        this.props.navigation.setParams({isBookmark: this.state.isBookmark})      
      })
    }
    console.log("on visible index changed :: " + all + " :: " + now + " :: " + notNow)
  }

  _footerRenderer() {
    return(null);
  }

  _rowRenderer(type, data) {
    return (
      <Text style={{marginLeft:16, marginRight:16}}>
          <Text letterSpacing={24}
              style={{lineHeight:26, textAlign:'justify'}}>
              {data.verseComponentsModels.map((verse, index) => 
                  <VerseViewBook
                      ref={child => (this[`child_${verse.chapterNumber}_${index}`] = child)}
                      verseData = {verse}
                      index = {index}
                      selectedReferences = {this.state.selectedReferenceSet}
                      getSelection = {(verseIndex, chapterNumber) => {
                        this.getSelectedReferences(verseIndex, chapterNumber)
                      }} 
                  />
              )}
          </Text>
      </Text> 
    )
  }

  componentWillUnmount(){
    let lastRead = {
      langCode:'ENG',
      versionCode:'UDB',
      bookId:'GEN',
      chapterNum:'5',
      verseNum:'7'
    }
    // AsyncStorage.setItem(AsyncStorageConstants.Keys.LastReadReference, lastRead);
  }

  render() {
      return (
        <View style={styles.container}>
        {this.state.dataProvider ? 
          
            <RecyclerListView
                style={{flex:1, width:width, height:height}}
                layoutProvider={this._layoutProvider} 
                dataProvider={this.state.dataProvider} 
                rowRenderer={this._rowRenderer}
                forceNonDeterministicRendering={true}
                initialRenderIndex={this.state.chapterNumber - 1}
                onScroll={this.onListScroll}
                onVisibleIndexesChanged={this.onVisibleIndexesChanged}
                renderFooter={this._footerRenderer}
                ref={(ref) => { this.flatListRef = ref; }}
                extendedState={this.state.selectedReferenceSet}
            />
            :
            <ActivityIndicator 
            animating={this.state.isLoading ? true : false} 
            size="large" 
            color="#0000ff" />
            
          }
          {this.state.showBottomBar 
          ? 
          <View style={{backgroundColor:'blue', height:64, width:'100%', 
            flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', marginTop:4 }}>
  
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity onPress={this.doHighlight}>
              <Text style={{color:'white'}}>
                {this.state.bottomHighlightText == true ? 'HIGHLIGHT' : 'REMOVE HIGHLIGHT' }
              </Text>
              <Icon name={'border-color'} color="white" size={24} style={{marginHorizontal:8}} />
              </TouchableOpacity>
            </View>
            
            <View style={{width:1, height:48, backgroundColor:'white'}} />
            
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>          
              <Text style={{color:'white'}}>
                NOTES
              </Text>
              <Icon name={'note'} color="white" size={24} style={{marginHorizontal:8}} />
            </View>
            
            <View style={{width:1, height:48, backgroundColor:'white'}} />          
  
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>          
              <Text style={{color:'white'}}>
                SHARE
              </Text>
              <Icon name={'share'} color="white" size={24} style={{marginHorizontal:8}} />
            </View>
  
          </View>
          : null }
        </View>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    height:height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});