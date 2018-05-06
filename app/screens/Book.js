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
} from 'react-native';
import DbQueries from '../utils/dbQueries'
import Realm from 'realm'
import VerseViewBook from '../components/VerseViewBook'
import Icon from 'react-native-vector-icons/MaterialIcons'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Home extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.bookName,
  });

  constructor(props) {
    super(props);

    console.log("BOOK props--" + JSON.stringify(props))

    this.getSelectedReferences = this.getSelectedReferences.bind(this)

    this.state = {
      modelData: this.props.screenProps.currentBook.chapterModels,
      isLoading: false,
      showBottomBar: false,
      bookId: this.props.navigation.state.params.bookId,
      bookName: this.props.navigation.state.params.bookName,
      chapterNumber: this.props.navigation.state.params.chapterNumber,
      bookIndex: this.props.navigation.state.params.bookIndex,
      bottomHighlightText: 'HIGHLIGHT',
    }

    this.selectedReferenceSet = new Set();
  }

  getItemLayout = (data, index) => {
      return { length: height, offset: height * index, index };
  }

  getSelectedReferences(isSelected, vIndex, chapterNum) {
    console.log("getSelectedReferences calle " + isSelected + " : " + vIndex + " :: c=" + chapterNum);
    let obj = {chapterNumber: chapterNum, verseIndex: vIndex};
    if (isSelected) {
      this.selectedReferenceSet.add(obj)
    } else {
      this.selectedReferenceSet.delete(obj)
    }
    console.log("SET=" + JSON.stringify(this.selectedReferenceSet))
      
    this.setState({showBottomBar: this.selectedReferenceSet.size > 0 ? true : false})

    let selectedCount = 0, highlightCount = 0;
    for (var i=0;  i<this.state.modelData.length; i++) {
        for (var j=0; j<this.state.modelData[i].verseComponentsModels.length; j++) {
            if (this.state.modelData[i].verseComponentsModels[j].selected) {
                selectedCount++;
                if (this.state.modelData[i].verseComponentsModels[j].highlighted) {
                    highlightCount++;
                }
            }
        }
    }
    this.setState({bottomHighlightText: selectedCount == highlightCount ? 'REMOVE HIGHLIGHT' : 'HIGHLIGHT'})
  }

  render() {
    // if (this.state.modelData.length == 0) {
    //   return null;
    // }
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
          ref={(ref) => { this.flatListRef = ref; }}
          getItemLayout={this.getItemLayout}
          renderItem={({item}) => 
            <Text style={{marginLeft:16, marginRight:16}}>
              <Text letterSpacing={24} ///onPress={() => {this.child.onPress();}} 
                  style={{lineHeight:26, textAlign:'justify'}}>
                  {item.verseComponentsModels.map((verse, index) => 
                      <VerseViewBook
                          ref={instance => {this.child = instance;}}
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
            <Text style={{color:'white'}}>
              {this.state.bottomHighlightText}
            </Text>
            <Icon name={'border-color'} color="white" size={24} style={{marginHorizontal:8}} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});