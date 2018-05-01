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
    this.state = {
      modelData: this.props.screenProps.currentBook.chapterModels,
      isLoading: false,
      showBottomBar: true,
      bookId: this.props.navigation.state.params.bookId,
      bookName: this.props.navigation.state.params.bookName,
      chapterNumber: this.props.navigation.state.params.chapterNumber,
      bookIndex: this.props.navigation.state.params.bookIndex,
    }
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
              <Text letterSpacing={24} ///onPress={() => {this.child.onPress();}} 
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

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});