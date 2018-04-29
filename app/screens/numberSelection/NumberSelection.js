import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import DbQueries from '../../utils/dbQueries'
import { numberSelectionPageStyle } from './styles.js';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import {nightColors, dayColors} from '../../utils/colors.js'
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from '../../utils/dimens.js'

export default class NumberSelection extends Component {
  static navigationOptions = {
    headerTitle: 'Select Chapter',
  };

  constructor(props){
    super(props)
    console.log("rops number : "+JSON.stringify(props))

    // this.queryBook = this.queryBook.bind(this)

    this.state = {
      bookId: this.props.navigation.state.params.bookId,
      bookName: this.props.navigation.state.params.bookName,
      booksList: this.props.screenProps.booksList,
      bookIndex: this.props.navigation.state.params.bookIndex,
      isLoading: false,
      bookData: this.props.screenProps.booksList[this.props.navigation.state.params.bookIndex].chapterModels,
    }

    console.log("BOOK DATA in number: " + JSON.stringify(this.state.bookData))
  }
  
  // componentDidMount() {
  //   this.queryBook();
  // }

  // async queryBook() {
  //   this.setState({isLoading: true})
  //   let models = await DbQueries.queryBooksWithCode("ULB", "ENG", this.state.bookId);
  //   this.setState({isLoading:false})
  //   if (models && models.length > 0) {
  //     this.setState({bookData: models[0].chapterModels})
  //     this.props.screenProps.updateCurrentBook(JSON.parse(JSON.stringify(models[0])))
  //   }
  // }

  render() {
    return (
      <View style={{flex:1}}>
        <FlatList
        numColumns={4}
        data={this.state.bookData}
        renderItem={({item}) => 
        <TouchableOpacity style={{flex:0.25,borderColor:'black',borderRightWidth:1, borderBottomWidth:1,
          height:width/4, justifyContent:"center"}}
          onPress={
            ()=>this.props.navigation.navigate('Book', {bookId: this.state.bookId, 
              bookName: this.state.bookName, chapterNumber: item.chapterNumber, 
              bookIndex: this.state.bookIndex})
            }
          >
            {/* <View style={{flex:0.25,borderColor:'black',borderRightWidth:1, borderBottomWidth:1,
            height:width/4, justifyContent:"center"}}> */}
                <Text style={{textAlign:"center",alignItems:"center", color:'black'}}>{item.chapterNumber}</Text>
            {/* </View> */}
            </TouchableOpacity>
        }
      />
      </View>
    );
  }
};