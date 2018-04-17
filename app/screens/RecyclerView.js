import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  VirtualizedList,
  Dimensions,
} from 'react-native';
import DbQueries from '../utils/dbQueries'
import USFMParser from '../utils/USFMParser'
import Realm from 'realm'
import VerseViewBook from '../components/VerseViewBook'
const Constants = require('../utils/constants')
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
 
const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};
 
let containerCount = 0;

export default class RV extends Component {

  constructor(props) {
    super(props);

    this.queryBookWithId = this.queryBookWithId.bind(this)

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

    this.state = {
      modelData: [], // array of chapters in a book
      verseList: [], // array of all verses from all chapters
      dataProvider: null
    }
  }

  _rowRenderer(type, data) {
    //   console.log("data::"+data.chapterNumber)
      return (
        <Text style={{marginLeft:16, marginRight:16}}>
            {/* <Text style={{fontSize:26}}>
                {"\n"}{data.chapterNumber}
            </Text> */}
            <Text letterSpacing={24} onPress={() => {this.child.onPress();}} 
                style={{lineHeight:26, textAlign:'justify'}}>
                {data.verseComponentsModels.map((verse) => 
                    <VerseViewBook
                        ref={instance => {this.child = instance;}}
                        verseComponent = {verse} />
                )}
            </Text>
        </Text>
    );
  }

  componentDidMount() {
      this.queryBookWithId();
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

  async queryBookWithId() {
    let dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
      });
    let models = await DbQueries.queryBookWithId("1jn", "ULB", "ENG");
    console.log("calling query")
    let verseModels = []
    if (models && models.length > 0) {
      let chapters = models[0].chapterModels;      
      for (var i=0; i<chapters.length; i++) {
        let verses = chapters[i].verseComponentsModels;
        for (var j=0; j<verses.length; j++) {
          verseModels.push(verses[j]);
        }
      }
      this.setState({modelData: chapters})
      this.setState({verseList: verseModels})
      this.setState({dataProvider: dataProvider.cloneWithRows(chapters)}, () => {
      })
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