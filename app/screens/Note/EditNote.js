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
import dbQueries from '../../utils/dbQueries';


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

        bold: {type: 'bool', default: false},
        italics: {type: 'bool', default: false},
        underline: {type: 'bool', default: false},

        selected:null
    }

    let styleArray  = []
    let obj = {bold:false, italics: false, underline: false}
    for (var i=0; i<this.state.noteBody.length; i++) {
      styleArray.push(obj)
    }
    this.setState({styleArray})
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
      this.props.navigation.dispatch(NavigationActions.back())
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
      selection: [selection.start, selection.end]
    // console.log("selection changed works or not "+this.state.selection.update(selection.start, selection.end))
    console.log("on delection change"+this.state.selection)
  }
   
  componentDidMount() {
    this.props.navigation.setParams({ handleAdd: this.saveNote})
    this.props.navigation.setParams({ handleBack: this.onBack})
  }
 
  async styleChar(value){
    const B = (props) => <Text style={{fontSize: 'bold'}}>{props.children}</Text>
    const I = (props) => <Text style={{fontStyle: 'italic'}}>{props.children}</Text>
    console.log("bold string "+this.state.noteBody.bold());  
    console.log("italics"+this.state.noteBody.italics())
    // this.setState({styleArray:value})

    let styleArray  = [...this.state.styleArray]
    for (var i=this.state.selection[0]; i<this.state.selection[1]; i++) {
      switch(value) {
        case 0: {
          styleArray[i].bold = !styleArray[i].bold;
          break
        }
        case 1: {
          styleArray[i].italics = !styleArray[i].italics;          
          break
        }
        case 2: {
          styleArray[i].underline = !styleArray[i].underline;          
          break
        }
      }
    }
    this.setState({styleArray})

    let selected= this.state.noteBody.substring(this.state.selection[0],this.state.selection[1]);
    console.log("selected value in stylechar "+selected)
    console.log("state value of selected "+this.state.selection)
    if(this.state.selection != null){
    let selectedText = this.state.noteBody.substring(this.state.selection[0],this.state.selection[1])

      if(value == 0){
      //  return <B>selectedText.bold()</B>
      }
      if(value ==1){
      //  return <I>selectedText.italics()</I>
      }
    }
    await dbQueries.notesCharStyle(value, selected)
        // let styleArray = [ ...this.state.styleArray ];
        // var isPresent = false ; 
        // for (var i = 0 ; i < styleArray.length ;i++){
        //  if(styleArray[i] == value){
        //    isPresent = true;
        //     styleArray.splice(i,1)
        //       break;
        //  }
        // }
        // if (!isPresent){
        //   styleArray.push(value)
        // }
        // this.setState({styleArray})

  }
  // checkStyleValuePresent(value){
    // let styleArray = [ ...this.state.styleArray ];
    //     for (var i = 0 ; i < styleArray.length ;i++){
    //      if(styleArray[i] == value){
    //        console.log("return vale true"+value)
    //        return true
    //      }
    //     }
    //        console.log("return vale false"+value)
        
    //     return false
       
  // }
  textStyling(){
    console.log("hi comming")
  }
  onChangeText(text){
    this.setState({noteBody:text})


  }
  render() {
    var bodyText = this.state.noteBody;
    var bodyArray = bodyText.split('');
    const B = (props) => <Text style={{fontStyle: 'italic'}}>{props.children}</Text>
    return (
     <View style={{flex:1}}>
      <TextInput 
        placeholder="Note" 
        
        ref={input => this.myInputText = input}
        underlineColorAndroid="transparent"
        onSelectionChange={this.onSelectionChange} 
        onChangeText = {this.onChangeText.bind(this,text)}
        // value={this.state.noteBody}
      >
      {bodyArray.map((item, index) =>
        <Text style={{
          textDecorationLine: this.state.styleArray[index].underline ? 'underline' : 'none',
          fontStyle: this.state.styleArray[index].italics ? 'italic' : 'normal',
          fontWeight: this.state.styleArray[index].bold ? 'bold' : 'normal'
        }}>item</Text>
      )
      }
      <Text>{this.state.noteBody}</Text>
      </TextInput>
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
