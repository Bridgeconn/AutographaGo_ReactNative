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
          color={navigation.state.params.isBookmark ? "white" : "yellow"} 
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

    let model = await DbQueries.queryBookWithId(this.props.screenProps.versionCode, 
        this.props.screenProps.languageCode, this.state.bookId);
    this.setState({isLoading:false})
    if (model == null) {
      console.log("mode lnull")
    } else {
      if (model.length > 0) {
        this.setState({modelData: model[0].chapterModels})
        this.setState({bookmarksList: model[0].bookmarksList})
        this.setState({dataProvider: dataProvider.cloneWithRows(model[0].chapterModels)})
      }
    }
  }

  onBookmarkPress() {
    this.setState({isBookmark: !this.state.isBookmark}, () => {
        this.props.navigation.setParams({isBookmark: this.state.isBookmark})      
    })
  }

  getSelectedReferences(isSelected, vIndex, chapterNum) {
    console.log("in RLV, length="+ this.state.dataProvider.getSize())
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
        
      {/*this[`child_${item}`].doHighlight()*/}

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

        {/*this[`child_${item}`].removeHighlight(this.state.languageCode, this.state.versionCode, 
          this.state.bookId, tempVal[0], 
        modelData[tempVal[0] - 1].verseComponentsModels[tempVal[1]].verseNumber, false)*/}

        // DbQueries.updateBookWithHighlights()
        DbQueries.updateHighlightsInBook(this.state.modelData, tempVal[0] - 1, tempVal[1], false)
        
      }
    }
    this.setState({modelData})
    this.selectedReferenceSet.clear()
    this.setState({showBottomBar: false})
  }

  onListScroll = () => {
    console.log("on list scroll");
  }

  onVisibleIndexesChanged = () => {
    console.log("on visible index changed")
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
                      getSelection = {(isSelected, verseIndex, chapterNumber) => {
                        this.getSelectedReferences(isSelected, verseIndex, chapterNumber)
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