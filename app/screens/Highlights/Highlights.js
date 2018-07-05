import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DbQueries from '../../utils/dbQueries'
import {getBookNameFromMapping} from '../../utils/UtilFunctions';
import id_name_map from '../../assets/mappings.json'
import {constantFont} from '../../utils/dimens.js'
import { highlightstyle } from './styles'


export default class HighLights extends Component {
  static navigationOptions = {
    headerTitle: 'Highlights',
  };

  constructor(props) {
    super(props)

    this.mappingData = id_name_map;
    this.removeHighlight = this.removeHighlight.bind(this)

    this.state = {
      modelData: [],
      isLoading:false
    }
    this.styles = highlightstyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
    
  }

  componentDidMount() {
    console.log("value of load..... "+this.state.isLoading)
    
    this.setState({isLoading: true}, async () => {
    this.setState 
    let modelData = await DbQueries.queryHighlights(this.props.screenProps.versionCode, 
    this.props.screenProps.languageCode);
    console.log("routes len =" + modelData)
    console.log("routes len = done " + modelData.length )
    this.setState({modelData,isLoading:false})
    console.log("value of loader......... "+this.state.isLoading)
      
  }
)
console.log("value of loader......... "+this.state.isLoading)

}

  // getItemLayout = (data, index) => {
  //   return { length: height, offset: height * index, index };
  // }

  

  removeHighlight(index) {
    DbQueries.updateHighlightsInVerse(this.props.screenProps.languageCode, 
      this.props.screenProps.versionCode, this.state.modelData[index].bookId, 
      this.state.modelData[index].chapterNumber, this.state.modelData[index].verseNumber, false)

    var modelData = [...this.state.modelData]
    modelData.splice(index, 1);
    this.setState({modelData})
  }

  render() {
    console.log("value of loader "+this.state.isLoading)
    return (
      <View style={this.styles.container}>
      {
      this.state.isLoading ? 
      <ActivityIndicator animate={true}/> 
      : <FlatList
      contentContainerStyle={this.state.modelData.length === 0 && this.styles.centerEmptySet}
      // contentContainerStyle={this.styles.flatListContainer}
      data={this.state.modelData}
      ListEmptyComponent={
          <Text style={this.styles.emptyMessage}>No reference highlighted</Text>
        }
      // getItemLayout={this.getItemLayout}
      renderItem={({item, index}) =>
      <View style={this.styles.highlightsView}>
         <Text style={this.styles.hightlightsText}>{getBookNameFromMapping(item.bookId)} {item.chapterNumber} {':'} {item.verseNumber}</Text>
        <Icon name='delete-forever' size={constantFont.iconMedium} style={this.styles.iconCustom}  onPress={() => {this.removeHighlight(index)}} />
      </View>
    }
      />
        
      }
    
      </View>
    );
  }
}
