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
import DbQueries from '../../utils/dbQueries'


export default class EditNote extends Component {
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Notes',
    // headerLeft:(<HeaderBackButton style={{color:"#fff"}} onPress={()=>navigation.state.params.handleAdd()}/>),
    headerRight:(
      <TouchableOpacity style={{margin:8}} onPress={()=>navigation.state.params.handleAdd()}>
        <Text style={{fontSize:12,color:'#fff'}} >DONE</Text>
      </TouchableOpacity>)
  
});
  constructor(props){
    super(props);
    console.log(" props notes add "+JSON.stringify(this.props))
    this.state = {
        noteBody: this.props.navigation.state.params.item,
        show:false,
    }
  }
  saveNote = () =>{
  if(this.props.navigation.state.params.index == null){
    DbQueries.addNote(this.state.noteBody)
  }
  DbQueries.updateNote(this.state.noteBody,this.props.navigation.state.params.index)
  this.props.navigation.state.params.onEdit(this.state.noteBody,this.props.navigation.state.params.index);
  this.props.navigation.dispatch(NavigationActions.back())
  }
  componentDidMount() {
    this.props.navigation.setParams({ handleAdd: this.saveNote})
  }
  
  render() {
    return (
     <View style={{flex:1}}>
      <TextInput 
        placeholder="Note" 
        style={{borderTopColor:'#000'}}
        onChangeText = {(text) => this.setState({noteBody:text})}
        value={this.state.noteBody}
      />
      <TouchableOpacity onPress={()=>this.onDelete()}>
        <Text>delete</Text>
      </TouchableOpacity>
     </View> 
    )
  }
}
