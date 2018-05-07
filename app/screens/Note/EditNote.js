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
  Modal,
  TouchableHighlight
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
    console.log(" props notes add "+this.props.navigation.state.params.index)
    this.state = {
        noteBody:this.props.navigation.state.params.item,
        show:false,
        selection: [0,0],
        styleArray:[],
        selected:null
    }
  }
  saveNote = () =>{
    var time =  new Date().toLocaleString()
    console.log("time "+time)
    console.log("time from props"+this.props.navigation.state.params.time)
     
    if(this.props.navigation.state.params.index == -1){
      if(  this.state.noteBody == this.props.navigation.state.params.item){
        this.props.navigation.dispatch(NavigationActions.back())
        return
      }
      console.log("add note"+this.props.navigation.state.params.item)
      DbQueries.addNote(this.state.noteBody,time)
     
    }
    else{
      console.log("update note"+this.props.navigation.state.params.item)
      DbQueries.updateNote(this.state.noteBody,this.props.navigation.state.params.time,time)
    }
    
    // this.props.navigation.state.params.onEdit(this.state.noteBody,time,this.props.navigation.state.params.index);
    this.props.navigation.dispatch(NavigationActions.back())
  }
  onBack = () =>{
      if(this.state.noteBody !== this.props.navigation.state.params.item){
        Alert.alert(
          'Save Changes ? ',
          'Do you want to save the note ',
          [
            {text: 'Ok', onPress: () => this.saveNote()},
            {text: 'No', onPress: () => { this.props.navigation.dispatch(NavigationActions.back()) }},
            {text: 'Cancel', onPress: () => {return}},
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
 
  styleChar(value){
    // let selected = this.state.noteBody.substring(this.state.selection);
    console.log("style array "+JSON.stringify(this.state.styleArray))
        console.log('styleArray 0')
        let styleArray = [ ...this.state.styleArray ];
        var isPresent = false ; 
        for (var i = 0 ; i < styleArray.length ;i++){
         if(styleArray[i] == value){
           isPresent = true;
            styleArray.splice(i,1)
              break;
         }
        }
        if (!isPresent){
          styleArray.push(value)
        }
        this.setState({styleArray})
  }
  checkStyleValuePresent(value){
    let styleArray = [ ...this.state.styleArray ];
        for (var i = 0 ; i < styleArray.length ;i++){
         if(styleArray[i] == value){
           console.log("return vale true"+value)
           return true
         }
        }
           console.log("return vale false"+value)
        
        return false
       
  }
  render() {
    
    return (
     <View style={{flex:1}}>
      <TextInput 
        placeholder="Note" 
        style={{
          fontWeight:this.checkStyleValuePresent(0) ? 'bold' : 'normal',
          fontStyle: this.checkStyleValuePresent(1) ?'italic' :'normal',
          textDecorationLine:this.checkStyleValuePresent(2)  ? 'underline':'none',
          fontSize:24
        }}
        // ref={input => this.myInputText = input}
        underlineColorAndroid='transparent'
        onSelectionChange={this.onSelectionChange} 
        onChangeText = {(text) => this.setState({noteBody:text})}
        value={this.state.noteBody}
      />

      <TouchableOpacity onPress={()=>this.styleChar(0)}>
      <Text>Bold</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.styleChar(1)}>
      <Text>Italic</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.styleChar(2)}>
      <Text>UnderLine</Text>
      </TouchableOpacity>

     </View> 
    )
  }
}
