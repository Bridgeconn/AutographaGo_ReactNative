import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  VirtualizedList,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import DbQueries from '../utils/dbQueries'
import USFMParser from '../utils/USFMParser'
import Realm from 'realm'
import VerseViewBook from '../components/VerseViewBook'
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorageUtil from '../utils/AsyncStorageUtil';
import AsyncStorageConstants from '../utils/AsyncStorageConstants';

const Constants = require('../utils/constants')
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};
 
let containerCount = 0;

export default class RV extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.bookName,
        headerRight: (
            <Icon 
                onPress={()=> {navigation.state.params.onIconPress()}} 
                name={'bookmark'} 
                color={navigation.state.params.isBookmark ? "white" : "yellow"} 
                size={24} 
                style={{marginHorizontal:8}} 
            />      
        ),
    });

  constructor(props) {
    super(props);

    let { width, height } = Dimensions.get("window");
    
    this._layoutProvider = new LayoutProvider(
      index => {
          return ViewTypes.FULL;
      },
      (type, dim) => {
          switch (type) {
              case ViewTypes.FULL:
                  dim.width = width;
                  dim.height = height;
                  break;
              default:
                  dim.width = 0;
                  dim.height = 0;
          }
      }
    );
    this._rowRenderer = this._rowRenderer.bind(this);

    console.log("BOOK props--" + JSON.stringify(props))

    this.getSelectedReferences = this.getSelectedReferences.bind(this)
    this.queryBook = this.queryBook.bind(this)
    this.onBookmarkPress = this.onBookmarkPress.bind(this)
    // this.onListScroll = this.onListScroll.bind(this)
    // this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)

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
      dataProvider: null
    }

    this.selectedReferenceSet = new Set();
    
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

    let resultsC = await DbQueries.queryBookWithId(this.props.screenProps.versionCode, 
        this.props.screenProps.languageCode, this.state.bookId);

    this.setState({isLoading:false})
    if (resultsC == null) {
      console.log("mode lnull")
    } else {
        if (resultsC.length > 0) {
            let chapModels = [];
            for (var j=0; j<resultsC[0].chapterModels.length; j++) {
            	let verModels = [];
            	for (var k=0; k<resultsC[0].chapterModels[j].verseComponentsModels.length; k++) {
            		var vModel = {
            			type: resultsC[0].chapterModels[j].verseComponentsModels[k].type, 
            			verseNumber: resultsC[0].chapterModels[j].verseComponentsModels[k].verseNumber, 
            			text: resultsC[0].chapterModels[j].verseComponentsModels[k].text, 
            			highlighted: resultsC[0].chapterModels[j].verseComponentsModels[k].highlighted, 
            			languageCode: resultsC[0].chapterModels[j].verseComponentsModels[k].languageCode, 
            			versionCode: resultsC[0].chapterModels[j].verseComponentsModels[k].versionCode, 
            			bookId: resultsC[0].chapterModels[j].verseComponentsModels[k].bookId, 
            			chapterNumber: resultsC[0].chapterModels[j].verseComponentsModels[k].chapterNumber,
            			selected: false
            		};
            		verModels.push(vModel);
            	}
            	var cModel = {chapterNumber: resultsC[0].chapterModels[j].chapterNumber, 
            		numberOfVerses: resultsC[0].chapterModels[j].numberOfVerses, 
            		verseComponentsModels: verModels};
            	chapModels.push(cModel);
            }
            var bModel = {bookId:resultsC[0].bookId, bookName:resultsC[0].bookName,
            	section: resultsC[0].section, bookNumber: resultsC[0].bookNumber,
                bookmarksList: resultsC[0].bookmarksList, chapterModels: chapModels};
            
            this.setState({modelData: bModel.chapterModels}, ()  => {
                console.log("RECYCLER VIEW DATA :: " + JSON.stringify(this.state.modelData))
            })
            this.setState({dataProvider: dataProvider.cloneWithRows(bModel.chapterModels)})
            this.setState({bookmarksList: bModel.bookmarksList})
        }
        // this.setState({modelData: model[0].chapterModels})
        // this.setState({dataProvider: dataProvider.cloneWithRows(model[0].chapterModels)})
        // this.setState({bookmarksList: model[0].bookmarksList})
    //   }
    }
  }

  onBookmarkPress() {
    this.setState({isBookmark: !this.state.isBookmark}, () => {
        this.props.navigation.setParams({isBookmark: this.state.isBookmark})      
    })
  }

  onListScroll() {
    // this.flatListRef.
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
      console.log("visible length = "+ viewableItems.length)    
      if (viewableItems.length > 0) {
        for (var i=0;i<viewableItems.length;i++) {
          console.log("visible index = "+ i +" == " + viewableItems[i].index)
        }
      } else {
        console.log("visible index = -1")        
      }
      console.log("changed length = "+ changed.length)    
      if (changed.length > 0) {
        for (var i=0;i<changed.length;i++) {
          console.log("changed index = "+ i +" == " + changed[i].index)
        }
      } else {
        console.log("changed index = -1")        
      }
  }

  getItemLayout = (data, index) => {
    return { length: height, offset: height * index, index };
}

getSelectedReferences(isSelected, vIndex, chapterNum) {
  let obj = chapterNum + '_' + vIndex
  if (isSelected) {
    this.selectedReferenceSet.add(obj)
  } else {
    this.selectedReferenceSet.delete(obj)
  }
  
  var modelData = [...this.state.modelData]
  modelData[chapterNum - 1].verseComponentsModels[vIndex].selected = isSelected
  this.setState({modelData})

  this.setState({showBottomBar: this.selectedReferenceSet.size > 0 ? true : false})

  let selectedCount = this.selectedReferenceSet.size, highlightCount = 0;

  for (let item of this.selectedReferenceSet.values()) {
    let tempVal = item.split('_')
    if (this.state.modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].highlighted) {
      highlightCount++
    }
  }
  this.setState({bottomHighlightText: selectedCount == highlightCount ? false : true})
}

doHighlight = () => {
  let modelData = [...this.state.modelData]
  if (this.state.bottomHighlightText == true) {
    // do highlight
    for (let item of this.selectedReferenceSet.values()) {
      let tempVal = item.split('_')
      // modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].highlighted = true
      modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].selected = false
      
      this[`child_${item}`].doHighlight()

      // DbQueries.updateBookWithHighlights(this.state.languageCode, this.state.versionCode, 
      //     this.state.bookId, tempVal[0], 
      //     modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].verseNumber, true)
      DbQueries.updateHighlightsInBook(this.state.modelData, tempVal[0] - 1, tempVal[1], true)
    }
  } else {
    // remove highlight
    for (let item of this.selectedReferenceSet.values()) {
      let tempVal = item.split('_')
      // modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].highlighted = false
      modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].selected = false

      this[`child_${item}`].removeHighlight(this.state.languageCode, this.state.versionCode, 
        this.state.bookId, tempVal[0], 
        modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].verseNumber, false)

      // DbQueries.updateBookWithHighlights()
      DbQueries.updateHighlightsInBook(this.state.modelData, tempVal[0] - 1, tempVal[1], false)
      
    }
  }
  this.setState({modelData})
  this.selectedReferenceSet.clear()
  this.setState({showBottomBar: false})
}

  _rowRenderer(type, data) {
    //   console.log("data::"+data.chapterNumber)
      return (
        <Text style={{marginLeft:16, marginRight:16}}>
            {/* <Text style={{fontSize:26}}>
                {"\n"}{data.chapterNumber}
            </Text> */}
            <Text letterSpacing={24}
                style={{lineHeight:26, textAlign:'justify'}}>
                {data.verseComponentsModels.map((verse, index) => 
                    <VerseViewBook
                        ref={child => (this[`child_${verse.chapterNumber}_${index}`] = child)}
                          index = {index}
                          getSelection = {(isSelected, verseIndex, chapterNumber) => {
                            this.getSelectedReferences(isSelected, verseIndex, chapterNumber)
                          }}
                        verseComponent = {verse} />
                )}
            </Text>
        </Text>
    );
  }

  render() {
    if (this.state.dataProvider) {
        return (
            <RecyclerListView 
                layoutProvider={this._layoutProvider} 
                dataProvider={this.state.dataProvider} 
                rowRenderer={this._rowRenderer}
                forceNonDeterministicRendering={true}
            />
        );
    } else {
        return null;
    }
  }

}

{/*
RecyclerListView.propTypes = {
    //Provides visible index, helpful in sending impression events etc, onVisibleIndexesChanged(all, now, notNow)
    onVisibleIndexesChanged: PropTypes.func,

    //Provide this method if you want to render a footer. Helpful in showing a loader while doing incremental loads.
    renderFooter: PropTypes.func,

    //Specify the initial item index you want rendering to start from. Preferred over initialOffset if both are specified.
    initialRenderIndex: PropTypes.number,
};
*/}
