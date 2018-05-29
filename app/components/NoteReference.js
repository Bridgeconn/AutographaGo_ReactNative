import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class NoteReference extends Component {

  constructor(props) {
    super(props);
    // console.log("props: " + JSON.stringify(props))
    this.state = {
        refText: this.props.refText,
    }
  }

  onPress() {
    console.log("on press in compinene")
    // this.props.getSelection(
    //     // this.props.verseData.selected == null ? true : !this.props.verseData.selected, 
    //     this.props.index, 
    //     this.props.verseData.chapterNumber
    // );
  }

  render() {
    return(
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', margin:4, 
            borderColor:'gray', borderWidth:1, borderRadius:20, padding:4, alignItems:'center'}}>
            <Text style={{fontSize:14, marginHorizontal:2}}>
                {this.state.refText}
            </Text>
            <Icon name="clear" style={{}} size={24} 
                color="gray" onPress={()=> {this.onPress()}} />
        </View>
    );
  }

}
