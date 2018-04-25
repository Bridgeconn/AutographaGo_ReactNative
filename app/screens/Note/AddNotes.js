import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import NotesModel from '../../models/NotesModel'
import DbQueries from '../../utils/dbQueries'

var Realm = require('realm');

export default class AddNotes extends Component {
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Notes',
    headerLeft:(<HeaderBackButton style={{color:"#fff"}} onPress={()=>navigation.state.params.handleAdd()}/>),
    headerRight:(
      <TouchableOpacity style={{margin:8}} onPress={()=>navigation.state.params.handleAdd()}>
        <Text style={{fontSize:12,color:'#fff'}} >DONE</Text>
      </TouchableOpacity>)
  
});
  constructor(props){
    super(props);
    console.log(" props notes add "+JSON.stringify(this.props))
    this.state = {
        noteBody:this.props.navigation.state.params.item,
        noteIndex:this.props.navigation.state.params.index,
        show:false,
        // text:this.props.navigation.state.params.item
    }

    realm = new Realm({
      schema: [{name: 'Notes', 
      properties: 
      {
        note:'string'
      }}]
    });

  }

  
  onTextInputChange = (text) =>{
    this.setState ({noteBody:text})
    console.log("note body "+this.state.noteBody)
  }
   addNote = () =>{
    realm.write(() => {
      var ID = realm.objects('Notes').length + 1;
       realm.create('Notes', {
        note:this.state.noteBody
        });
        
    });
 
    // Alert.alert("Note Added Successfully.")
    this.props.navigation.state.params.onSelect(this.state.noteBody,this.state.noteIndex);
    this.props.navigation.dispatch(NavigationActions.back())
   }
  componentDidMount () {
    this.props.navigation.setParams({ handleAdd: this.addNote})
  }
  UpdatedData(){
    
  }
  render() {
    var A = realm.objects('Notes');
 
    var myJSON = JSON.stringify(A);
    return (
     <View style={{flex:1}}>
      <TextInput 
        placeholder="Note" 
        style={{borderTopColor:'#000'}}
        onChangeText = {(text) => this.setState({noteBody:text})}
        value={this.state.noteBody}
      />
     </View> 
    )
  }
}
