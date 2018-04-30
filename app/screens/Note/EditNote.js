import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import DbQueries from '../../utils/dbQueries'


export default class EditNote extends Component {
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Notes',
    headerLeft:(<HeaderBackButton style={{color:"#fff"}} onPress={()=>navigation.state.params.handleBack()}/>),
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
        selection: [0,0],
    }
  }
  saveNote = () =>{
  if(this.props.navigation.state.params.index == null && !this.state.noteBody){
    ToastAndroid.show('write something to note', ToastAndroid.SHORT)
    return
  }
  DbQueries.addNote(this.state.noteBody)
  DbQueries.updateNote(this.state.noteBody,this.props.navigation.state.params.index)
  this.props.navigation.state.params.onEdit(this.state.noteBody,this.props.navigation.state.params.index);
  this.props.navigation.dispatch(NavigationActions.back())
  }
  onBack = () =>{
      // ToastAndroid.show('save changes', ToastAndroid.SHORT)
      if(this.state.noteBody !== this.props.navigation.state.params.item){
        Alert.alert(
          'Discard Changes ? ',
          'Do you want to discard the note or save ',
          [
            {text: 'Cancel', onPress: () => {return}},
            {text: 'OK', onPress: () => { this.props.navigation.dispatch(NavigationActions.back()) }},
          ],
        )
        return
      }
      
    this.props.navigation.dispatch(NavigationActions.back())
  }
  onSelectionChange = event => {
    const selection = event.nativeEvent.selection;
    this.setState({
      selection: [selection.start, selection.end]
    });
    console.log("on delection change"+this.state.selection)
    
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleAdd: this.saveNote})
    this.props.navigation.setParams({ handleBack: this.onBack})
  }
  render() {
    return (
     <View style={{flex:1}}>
      <TextInput 
        placeholder="Note" 
        style={{borderTopColor:'#000'}}
        ref={input => this.myInputText = input}
        onSelectionChange={this.onSelectionChange} 
        onChangeText = {(text) => this.setState({noteBody:text})}
        value={this.state.noteBody}
        
      />
     </View> 
    )
  }
}
