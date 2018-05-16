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
import DbQueries from '../utils/dbQueries'
import Realm from 'realm'
import VerseViewBook from '../components/VerseViewBook'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorageUtil from '../utils/AsyncStorageUtil';
import AsyncStorageConstants from '../utils/AsyncStorageConstants';
const Constants = require('../utils/constants')

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Book extends Component {

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

    console.log("BOOK props--" + JSON.stringify(props))

    this.getSelectedReferences = this.getSelectedReferences.bind(this)
    this.queryBook = this.queryBook.bind(this)
    this.onBookmarkPress = this.onBookmarkPress.bind(this)
    this.onListScroll = this.onListScroll.bind(this)
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)

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
    }

    this.selectedReferenceSet = new Set();
    this.viewabilityConfig = {
      viewAreaCoveragePercentThreshold: 50,
    }
    // minimumViewTime	No	number
    // viewAreaCoveragePercentThreshold	No	number    required or
    // itemVisiblePercentThreshold	No	number        required
    // waitForInteraction	No	boolean
  }

  componentDidMount() {
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
      console.log("mode lnull")
    } else {
      if (model.length > 0) {
        this.setState({modelData: model[0].chapterModels})
        this.setState({bookmarksList: model[0].bookmarksList})
      }
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

  render() {
    return (
      <View style={styles.container}>
      {this.state.isLoading ? 
        <ActivityIndicator 
          animating={this.state.isLoading ? true : false} 
          size="large" 
          color="#0000ff" />
          :
        <FlatList
          data={this.state.modelData}
          // initialScrollIndex={this.state.chapterNumber - 1}
          // initialNumToRender={2}
          onScroll={() => {
            this.onListScroll()
          }}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          ref={(ref) => { this.flatListRef = ref; }}
          getItemLayout={this.getItemLayout}
          renderItem={({item}) => 
            <Text style={{marginLeft:16, marginRight:16}}>
              <Text letterSpacing={24}
                  style={{lineHeight:26, textAlign:'justify'}}>
                  {item.verseComponentsModels.map((verse, index) => 
                      <VerseViewBook
                          ref={child => (this[`child_${verse.chapterNumber}_${index}`] = child)}
                          verseComponent = {verse}
                          index = {index}
                          getSelection = {(isSelected, verseIndex, chapterNumber) => {
                            this.getSelectedReferences(isSelected, verseIndex, chapterNumber)
                          }} />
                  )}
              </Text>
            </Text> 
          }
          // getItem={(data, index) => data[index]}
          keyExtractor={(item, index) => {
            return item.chapterNumber
          }}
          // getItemCount={data => data.length} 
          />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


