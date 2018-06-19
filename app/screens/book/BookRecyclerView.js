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
import Realm from 'realm'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {createResponder} from 'react-native-gesture-responder';

import DbQueries from '../../utils/dbQueries'
import VerseView from './VerseView'
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
import AsyncStorageConstants from '../../utils/AsyncStorageConstants';
const Constants = require('../../utils/constants')
import { styles } from './styles.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ViewTypes = {
    FULL: 0
};

export default class BookRecyclerView extends Component {

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
    // console.log("BOOK props--" + JSON.stringify(props))

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
    // console.log("props RV chapter=  "  + this.props.navigation.state.params.chapterNumber)
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
      verseInLine: this.props.screenProps.verseInLine,

      colorFile:this.props.screenProps.colorFile,
      sizeFile:this.props.screenProps.sizeFile,

      gestureState: {},
      thumbSize: 100,
      left: width / 2,
      top: height / 2,
    }

    this.pinchDiff = 0
    this.pinchTime = new Date().getTime()
    this.styles = styles(this.state.colorFile, this.state.sizeFile);    

  }

  componentWillReceiveProps(props){
    // console.log("will recievr props"+JSON.stringify(props))
    this.setState({
      colorFile:props.screenProps.colorFile,
      sizeFile:props.screenProps.sizeFile,
    })
    this.styles = styles(props.screenProps.colorFile, props.screenProps.sizeFile);   
  }

  componentDidMount() {

    this.gestureResponder = createResponder({
      onStartShouldSetResponder: (evt, gestureState) => true,
      onStartShouldSetResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: (evt, gestureState) => true,
      onResponderGrant: (evt, gestureState) => {},
      onResponderMove: (evt, gestureState) => {
        let thumbSize = this.state.thumbSize;
        if (gestureState.pinch && gestureState.previousPinch) {
          thumbSize *= (gestureState.pinch / gestureState.previousPinch)
          let currentDate = new Date().getTime()
          let diff = currentDate - this.pinchTime
          console.log("time diff : " + diff + " prev diff : " + this.pinchDiff)
          if (diff > this.pinchDiff) {
              console.log("gesture pinch diff = " + (gestureState.pinch - gestureState.previousPinch))
             if (gestureState.pinch - gestureState.previousPinch > 5) {
                // large
                console.log("large")
                this.props.screenProps.changeSizeByOne(1)              
            } else if (gestureState.previousPinch - gestureState.pinch > 5) {
                console.log("small")
                // small
                this.props.screenProps.changeSizeByOne(-1)              
            }
          }
          this.pinchDiff = diff
          this.pinchTime = currentDate
        }
        let {left, top} = this.state;
        left += (gestureState.moveX - gestureState.previousMoveX);
        top += (gestureState.moveY - gestureState.previousMoveY);
        this.setState({
          gestureState: {
            ...gestureState
          },
          left, top, thumbSize
        })  
      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onResponderRelease: (evt, gestureState) => {
        this.setState({
          gestureState: {
            ...gestureState
          }
        })
      },
      onResponderTerminate: (evt, gestureState) => {},
      
      onResponderSingleTapConfirmed: (evt, gestureState) => {
        console.log('onResponderSingleTapConfirmed...' + JSON.stringify(gestureState));
      },
      
      moveThreshold: 2,
      debug: false
    });

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
      // console.log("mode lnull")
    } else {
      if (model.length > 0) {
        this.setState({modelData: model[0].chapterModels, bookmarksList: model[0].bookmarksList}, () => {
          this.setState({dataProvider: dataProvider.cloneWithRows(this.state.modelData)}, () => {
              this.setState({isBookmark: this.state.bookmarksList.indexOf(this.state.currentVisibleChapter) > -1}, () => {
                this.props.navigation.setParams({isBookmark: this.state.isBookmark})      
              })
          })
        })
      }
    }
  }

  async onBookmarkPress() {
    // var bookmarksList = [...this.state.bookmarksList]
    // console.log("size bookmark " + bookmarksList.length)
    var index = this.state.bookmarksList.indexOf(this.state.currentVisibleChapter);
    // console.log("index bookmark " + index + " :: visible chapter =" + this.state.currentVisibleChapter)    
    // if (index > -1) {
    //     bookmarksList.splice(index, 1)
    //   } else {
    //     bookmarksList.push(this.state.currentVisibleChapter)
    // }
    await DbQueries.updateBookmarkInBook(this.state.bookmarksList, this.state.currentVisibleChapter, index > -1 ? false : true);
    // this.setState({bookmarksList}, () => {
    //   console.log("size now after = " + this.state.bookmarksList.length)
    // })
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
      // console.log("selected size : " + this.state.selectedReferenceSet.length + " :: " + JSON.stringify(this.state.selectedReferenceSet))

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
    // console.log("on list scroll :: " + rawEvent + " :: " + offsetX + " :: " + offsetY);
  }

  onVisibleIndexesChanged = (all, now, notNow) => {
    if (all.length > 0) {
      let cnum = all[0] + 1;
      // console.log("on visible iunde change = " + cnum)
      this.setState({currentVisibleChapter: cnum})
      this.setState({isBookmark: this.state.bookmarksList.indexOf(cnum) > -1}, () => {
        this.props.navigation.setParams({isBookmark: this.state.isBookmark})      
      })
    }
    // console.log("on visible index changed :: " + all + " :: " + now + " :: " + notNow)
  }

  _footerRenderer() {
    return(null);
  }

  _rowRenderer(type, data) {

    if (this.state.verseInLine) {
      return (
        <FlatList
          data={data.verseComponentsModels}
          style={this.styles.chapterList}
          renderItem={({item, index}) => 
              <Text letterSpacing={24}
                  style={this.styles.verseWrapperText}>
                      <VerseView
                        ref={child => (this[`child_${item.chapterNumber}_${index}`] = child)}
                        verseData = {item}
                        index = {index}
                        styles = {this.styles}
                        selectedReferences = {this.state.selectedReferenceSet}
                        getSelection = {(verseIndex, chapterNumber) => {
                          this.getSelectedReferences(verseIndex, chapterNumber)
                        }}
                    />
              </Text>
          }
        />
      )
    } else {
      return (
        <Text style={this.styles.chapterList}>
            <Text letterSpacing={24}
                style={this.styles.verseWrapperText}>
                {data.verseComponentsModels.map((verse, index) => 
                    <VerseView
                        ref={child => (this[`child_${verse.chapterNumber}_${index}`] = child)}
                        verseData = {verse}
                        index = {index}
                        styles = {this.styles}
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
  }

  componentWillUnmount(){
    let lastRead = {
        languageCode:this.state.languageCode,
        versionCode:this.state.versionCode,
        bookId:this.state.bookId,
        chapterNumber:this.state.currentVisibleChapter,
      }
      AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.LastReadReference, lastRead);
  }

  render() {
    const thumbSize = this.state.thumbSize;
      return (
        <View style={this.styles.container} >
        {this.state.dataProvider ? 
          
            <RecyclerListView
                {...this.gestureResponder}
                style={this.styles.recyclerListView}
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
          <View style={this.styles.bottomBar}>
  
            <View style={this.styles.bottomOption}>
            <TouchableOpacity onPress={this.doHighlight}>
              <Text style={this.styles.bottomOptionText}>
                {this.state.bottomHighlightText == true ? 'HIGHLIGHT' : 'REMOVE HIGHLIGHT' }
              </Text>
              <Icon name={'border-color'} color="white" size={24} style={this.styles.bottomOptionIcon} />
              </TouchableOpacity>
            </View>
            
            <View style={this.styles.bottomOptionSeparator} />
            
            <View style={this.styles.bottomOption}>          
              <Text style={this.styles.bottomOptionText}>
                NOTES
              </Text>
              <Icon name={'note'} color="white" size={24} style={this.styles.bottomOptionIcon} />
            </View>
            
            <View style={this.styles.bottomOptionSeparator} />          
  
            <View style={this.styles.bottomOption}>          
              <Text style={this.styles.bottomOptionText}>
                SHARE
              </Text>
              <Icon name={'share'} color="white" size={24} style={this.styles.bottomOptionIcon} />
            </View>
  
          </View>
          : null }
        </View>
      );
  }

}