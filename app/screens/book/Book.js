import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {createResponder } from 'react-native-gesture-responder';

import DbQueries from '../../utils/dbQueries'
import VerseView from './VerseView'
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
import AsyncStorageConstants from '../../utils/AsyncStorageConstants';
const Constants = require('../../utils/constants')
import { styles } from './styles.js';
import id_name_map from '../../assets/mappings.json'
import {NavigationActions} from 'react-navigation'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Book extends Component {

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

    this.mappingData = id_name_map;
    this.getSelectedReferences = this.getSelectedReferences.bind(this)
    this.queryBook = this.queryBook.bind(this)
    this.onBookmarkPress = this.onBookmarkPress.bind(this)

    this.updateCurrentChapter = this.updateCurrentChapter.bind(this)
    this.state = {
      languageCode: this.props.screenProps.languageCode,
      versionCode: this.props.screenProps.versionCode,
      modelData: [],
      isLoading: false,
      showBottomBar: false,
      bookId: this.props.navigation.state.params.bookId,
      bookName: this.props.navigation.state.params.bookName,
      bottomHighlightText: true,
      bookmarksList: [],
      isBookmark: false,
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
    let model = await DbQueries.queryBookWithId(this.props.screenProps.versionCode, 
        this.props.screenProps.languageCode, this.state.bookId);
    this.setState({isLoading:false})
    if (model == null) {
      // console.log("mode lnull")
    } else {
      if (model.length > 0) {
        this.setState({modelData: model[0].chapterModels, bookmarksList: model[0].bookmarksList}, () => {
              this.setState({isBookmark: this.state.bookmarksList.indexOf(this.state.currentVisibleChapter) > -1}, () => {
                this.props.navigation.setParams({isBookmark: this.state.isBookmark})      
              })
        })
      }
    }
  }

  async onBookmarkPress() {
    var index = this.state.bookmarksList.indexOf(this.state.currentVisibleChapter);
    await DbQueries.updateBookmarkInBook(this.state.bookmarksList, this.state.currentVisibleChapter, index > -1 ? false : true);
    this.setState({isBookmark: index > -1 ? false : true}, () => {
        this.props.navigation.setParams({isBookmark: this.state.isBookmark})      
    })

  }

  getSelectedReferences(vIndex, chapterNum, vNum) {
    let obj = chapterNum + '_' + vIndex + '_' + vNum
    
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
      let selectedCount = this.state.selectedReferenceSet.length, highlightCount = 0;
      for (let item of this.state.selectedReferenceSet) {
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
        await DbQueries.updateHighlightsInBook(this.state.modelData, tempVal[0] - 1, tempVal[1], true)
      }
    } else {
      // remove highlight
      for (let item of this.state.selectedReferenceSet) {
        let tempVal = item.split('_')
        await DbQueries.updateHighlightsInBook(this.state.modelData, tempVal[0] - 1, tempVal[1], false)
      }
    }
    this.setState({modelData, selectedReferenceSet: [], showBottomBar: false})
  }

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
 
  addToNotes = () => {
    let refList = []
    let id = this.state.bookId
    let name = this.getBookNameFromMapping(this.state.bookId)
    for (let item of this.state.selectedReferenceSet) {
      let tempVal = item.split('_')
      let refModel = {bookId: id, bookName: name, chapterNumber: parseInt(tempVal[0]), verseNumber: tempVal[2], 
        versionCode: this.props.screenProps.versionCode, languageCode: this.props.screenProps.languageCode};
      refList.push(refModel)
    }
    this.props.navigation.navigate('Notes', {referenceList: refList})
    this.setState({selectedReferenceSet: [], showBottomBar: false})
  }

  getVerseText(cNum, vIndex) {
    return this.state.modelData[cNum - 1].verseComponentsModels[vIndex].text
  }

  addToShare = () => {
    let bookName = this.getBookNameFromMapping(this.state.bookId)
    let shareText = ''
    for (let item of this.state.selectedReferenceSet) {
      let tempVal = item.split('_')
      let chapterNumber= parseInt(tempVal[0])
      let vIndex= parseInt(tempVal[1])
      let verseNumber= tempVal[2]
      shareText = shareText.concat(bookName + " " + chapterNumber + ":" + verseNumber + " ");
      shareText = shareText.concat(this.getVerseText(chapterNumber, vIndex));
      shareText = shareText.concat("\n");
    }
    Share.share({message: shareText})
    this.setState({selectedReferenceSet: [], showBottomBar: false})
  }

  componentWillUnmount(){
    let lastRead = {
        languageCode:this.state.languageCode,
        versionCode:this.state.versionCode,
        bookId:this.state.bookId,
        chapterNumber:this.state.currentVisibleChapter,
    }
    AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.LastReadReference, lastRead);
    this.props.screenProps.updateLastRead(lastRead);
    console.log("this.props.navigation back book page "+JSON.stringify(this.props))
    // sceneProps.scene.route.routeName 

    if(this.props.navigation.state.params.prevScreen =='bookmark'){
      this.props.navigation.state.params.updateBookmark()
    }
    else if(this.props.navigation.state.params.prevScreen == 'highlights'){
      this.props.navigation.state.params.updateHighlights()
    }
   
  }

  updateCurrentChapter(val) {
    let currChapter = this.state.currentVisibleChapter + val;
    this.setState({currentVisibleChapter: currChapter, 
        isBookmark: this.state.bookmarksList.indexOf(currChapter) > -1}, () => {
            this.props.navigation.setParams({isBookmark: this.state.isBookmark})
            this.scrollViewRef.scrollTo({x: 0, y: 0, animated: false})
    })
  }

 
  render() {
    const thumbSize = this.state.thumbSize;
      return (
        <View style={this.styles.container} >
        {this.state.modelData.length>0 ? 
            <View>

                <ScrollView
                    {...this.gestureResponder}
                    style={this.styles.recyclerListView}
                    ref={(ref) => { this.scrollViewRef = ref; }}                    
                >
                 {    (this.state.verseInLine) ?
                            <FlatList
                           
                            data={this.state.modelData[this.state.currentVisibleChapter - 1].verseComponentsModels}
                            renderItem={({item, index}) => 
                                <Text letterSpacing={24}
                                    style={this.styles.verseWrapperText}>
                                        <VerseView
                                            ref={child => (this[`child_${item.chapterNumber}_${index}`] = child)}
                                            verseData = {item}
                                            index = {index}
                                            styles = {this.styles.VerseText}
                                            selectedReferences = {this.state.selectedReferenceSet}
                                            getSelection = {(verseIndex, chapterNumber, verseNumber) => {
                                            this.getSelectedReferences(verseIndex, chapterNumber, verseNumber)
                                            }}
                                        />
                                </Text>
                            }
                            ListFooterComponent={<View style={styles.addToSharefooterComponent} />}
                            />
                        :
                            <View style={this.styles.chapterList}>
                                
                                    {this.state.modelData[this.state.currentVisibleChapter - 1].verseComponentsModels.map((verse, index) => 
                                        <View>
                                            <Text letterSpacing={24}
                                                style={this.styles.verseWrapperText}>
                                                <VerseView
                                                    ref={child => (this[`child_${verse.chapterNumber}_${index}`] = child)}
                                                    verseData = {verse}
                                                    index = {index}
                                                    styles = {this.styles}
                                                    selectedReferences = {this.state.selectedReferenceSet}
                                                    getSelection = {(verseIndex, chapterNumber, verseNumber) => {
                                                    this.getSelectedReferences(verseIndex, chapterNumber,verseNumber)
                                                    }}
                                                />
                                            </Text>
                                            {index == this.state.modelData[this.state.currentVisibleChapter - 1].verseComponentsModels.length - 1
                                            ? <View style={{height:64, marginBottom:4}} />
                                            : null
                                            }
                                                </View>
                                    )}
                                
                            </View>
                        }
                </ScrollView>
                
                {this.state.showBottomBar || this.state.currentVisibleChapter == 1
                ? null :
                <View style={this.styles.bottomBarPrevView}>
                    <Icon name={'chevron-left'} color="black" size={36} 
                        style={this.styles.bottomBarChevrontIcon} 
                        onPress={()=> this.updateCurrentChapter(-1)}
                        />
                </View>
                }
                {this.state.showBottomBar || this.state.currentVisibleChapter == this.state.modelData.length 
                ? null :
                <View style={this.styles.bottomBarNextView}>
                    <Icon name={'chevron-right'} 
                        style={this.styles.bottomBarChevrontIcon} 
                        onPress={()=> this.updateCurrentChapter(1)}
                        />
                </View>
                }
            </View>

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
            <TouchableOpacity onPress={this.doHighlight}  
            >
              <Text style={this.styles.bottomOptionText}>
                {this.state.bottomHighlightText == true ? 'HIGHLIGHT' : 'REMOVE HIGHLIGHT' }
              </Text>
              <Icon name={'border-color'} color="white" size={24} style={this.styles.bottomOptionIcon} />
              </TouchableOpacity>
            </View>
            
            <View style={this.styles.bottomOptionSeparator} />
            
            <View style={this.styles.bottomOption}>  
              <TouchableOpacity onPress={this.addToNotes} 
              >        
                <Text style={this.styles.bottomOptionText}>
                  NOTES
                </Text>
                <Icon name={'note'} color="white" size={24} 
                style={this.styles.bottomOptionIcon} 
                />
              </TouchableOpacity>
            </View>
            
            <View style={this.styles.bottomOptionSeparator} />          
  
            <View style={this.styles.bottomOption}>   
              <TouchableOpacity onPress={this.addToShare}  
              >       
                <Text style={this.styles.bottomOptionText}>
                  SHARE
                </Text>
                <Icon name={'share'} color="white" size={24} style={this.styles.bottomOptionIcon} />
              </TouchableOpacity>
            </View>
  
          </View>
          : null }
        </View>
      );
  }

}