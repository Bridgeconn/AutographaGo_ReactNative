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

    this.queryBookWithId = this.queryBookWithId.bind(this)
    console.log("BOOK props--" + JSON.stringify(props))
    this.state = {
      modelData: this.props.screenProps.booksList[this.props.navigation.state.params.bookIndex].chapterModels, // array of chapters in a book
      verseList: [], // array of all verses from all chapters
      isLoading: false,
      showBottomBar: true,
      bookId: this.props.navigation.state.params.bookId,
      bookName: this.props.navigation.state.params.bookName,
      chapterNumber: this.props.navigation.state.params.chapterNumber,
      // bookData: this.props.navigation.state.params.bookData,
      bookIndex: this.props.navigation.state.params.bookIndex,
    }
  }

  componentDidMount() {
      this.queryBookWithId();
  }

  getItemLayout = (data, index) => {
      return { length: height, offset: height * index, index };
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
              <Text letterSpacing={24} onPress={() => {this.child.onPress();}} 
                  style={{lineHeight:26, textAlign:'justify'}}>
                  {item.verseComponentsModels.map((verse) => 
                      <VerseViewBook
                          ref={instance => {this.child = instance;}}
                          verseComponent = {verse} />
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
              HIGHLIGHT
            </Text>
            <Icon name={'border-color'} color="white" size={24} style={{marginHorizontal:8}} />
          </View>
          
          <View style={{width:1, height:48, color:'white', backgroundColor:'white'}} />
          
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>          
            <Text style={{color:'white'}}>
              NOTES
            </Text>
            <Icon name={'note'} color="white" size={24} style={{marginHorizontal:8}} />
          </View>
          
          <View style={{width:1, height:48, color:'white', backgroundColor:'white'}} />          

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

  async queryBookWithId() {
    /*
    this.setState({isLoading: true})
    let models = await DbQueries.queryBookWithId(this.state.bookId, "ULB", "ENG");
    // let verseModels = []
    if (models && models.length > 0) {
      let chapters = models[0].chapterModels;      
      // for (var i=0; i<chapters.length; i++) {
      //   let verses = chapters[i].verseComponentsModels;
      //   for (var j=0; j<verses.length; j++) {
      //     verseModels.push(verses[j]);
      //   }
      // }
      this.setState({modelData: chapters})
      this.setState({isLoading:false})

      // this.setState({verseList: verseModels})      
    }
    */
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