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
  TouchableHighlight,
  ScrollView
} from 'react-native';
import FlowLayout from '../../components/FlowLayout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import DbQueries from '../../utils/dbQueries'
import dbQueries from '../../utils/dbQueries';

export default class EditNote extends Component {
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Edit Note',
    headerLeft:(<HeaderBackButton style={{color:"#fff"}} onPress={()=>navigation.state.params.handleBack()}/>),
    headerRight:(
      <TouchableOpacity style={{margin:8}} onPress={()=>navigation.state.params.handleAdd()}>
        <Text style={{fontSize:12,color:'#fff'}} >DONE</Text>
      </TouchableOpacity>)
  });

  constructor(props){
    super(props);
    this.state = {
        noteIndex: this.props.navigation.state.params.index,
        noteObject: this.props.navigation.state.params.noteObject,
        noteBody: this.props.navigation.state.params.index == -1 
          ? ''
          : this.props.navigation.state.params.noteObject.body,
        referenceList: this.props.navigation.state.params.index == -1 
          ? [] 
          : this.props.navigation.state.params.noteObject.references,
        show:false,
        selection: [0,0],
        styleArray:[],
        selected:null,

        bold: {type: 'bool', default: false},
        italics: {type: 'bool', default: false},
        underline: {type: 'bool', default: false},

    }

    this.getReference = this.getReference.bind(this)
    this.openReference = this.openReference.bind(this)
    this.deleteReference = this.deleteReference.bind(this)

    let styleArray  = []
    let obj = {bold:false, italics: false, underline: false}
    for (var i=0; i<this.state.noteBody.length; i++) {
      styleArray.push(obj)
    }
    this.setState({styleArray})
  }

  saveNote = () =>{
    var time =  new Date()
    console.log("time "+time)
     
    if (this.state.noteBody == '' && this.state.referenceList.length == 0) {
      if(this.state.noteIndex != -1){
        // delete note
        this.props.navigation.state.params.onDelete(this.state.noteIndex, this.state.noteObject.createdTime)
      }
    } else {
      this.props.navigation.state.params.onRefresh(this.state.noteIndex, this.state.noteBody, 
        this.state.noteIndex == -1 ? time : this.state.noteObject.createdTime, time, this.state.referenceList);
    }
    this.props.navigation.dispatch(NavigationActions.back())
  }

  showAlert() {
    Alert.alert(
      'Save Changes ? ',
      'Do you want to save the note ',
      [
        {text: 'Cancel', onPress: () => {return}},
        {text: 'No', onPress: () => { this.props.navigation.dispatch(NavigationActions.back()) }},
        {text: 'Yes', onPress: () => this.saveNote()},
      ],
    )
  }

  onBack = () =>{
      if (this.state.noteIndex == -1) {
        if (this.state.noteBody != '' || this.state.referenceList.length > 0) {
          this.showAlert();
          return;
        }
      } else {
        if(this.state.noteBody !== this.props.navigation.state.params.noteObject.body
            || !this.checkRefArrayEqual()){
          this.showAlert();
          return
        }
      }
      
    this.props.navigation.dispatch(NavigationActions.back())
  }

  checkRefArrayEqual() {
    let initArray = this.props.navigation.state.params.noteObject.references;
    let nowArray = this.state.referenceList;
    if (initArray.length != nowArray.length) {
      return false;
    }
    for (var i=0; i<initArray.length; i++) {
      if (initArray[i].bookId != nowArray[i].bookId ||
          initArray[i].bookName != nowArray[i].bookName ||
          initArray[i].chapterNumber != nowArray[i].chapterNumber ||
          initArray[i].verseNumber != nowArray[i].verseNumber) {
            return false;
      }
    }
    return true;
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

  checkIfReferencePresent(id, name, cNum, vNum) {
    let referenceList = [...this.state.referenceList]
    for(var i = 0; i < referenceList.length; i++) {
      let ref = referenceList[i];
      if (ref.bookId == id && ref.bookName == name && ref.chapterNumber == cNum && ref.verseNumber == vNum) {
        return true;
      }
    }
    return false;
  }

  getReference = (id, name, cNum, vNum) => {
    if (this.checkIfReferencePresent(id, name, cNum, vNum)) {
      return;
    }
    let refModel = {bookId: id, bookName: name, chapterNumber: cNum, verseNumber: vNum, 
      versionCode: this.props.screenProps.versionCode, languageCode: this.props.screenProps.languageCode};
    let referenceList = [...this.state.referenceList]
    referenceList.push(refModel)
    this.setState({referenceList})
  }

  onAddVersePress() {
    console.log("om add press");
    this.props.navigation.navigate('ReferenceSelection', {getReference: this.getReference})
  }

  openReference(index) {
    // todo open reference in RV page
  }

  deleteReference(index) {
    let referenceList = [...this.state.referenceList]
    referenceList.splice(index, 1);
    this.setState({referenceList})
  }

  render() {
    //dataValue={this.state.monitorValue}/>}
    var bodyText = this.state.noteBody;
    var bodyArray = bodyText.split('');
    const B = (props) => <Text style={{fontStyle: 'italic'}}>{props.children}</Text>
    return (
     <ScrollView style={{flex:1}}>
      <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center', margin:8}}>
        {this.state.referenceList.length == 0 
          ? 
          <Text style={{flex:8}}>Tap button to add references</Text> 
          :  
          <FlowLayout style={{flex:8}} ref="flow" dataValue={this.state.referenceList} 
            openReference={(index) => {this.openReference(index)}} 
            deleteReference={(index) => {this.deleteReference(index)}}
          />
        }
        <Icon name="add-circle" style={{flex:1}} size={28} color="gray" onPress={()=> {this.onAddVersePress()}} />
      </View>
      
      <View style={{height:2, backgroundColor:'gray', marginHorizontal:8}}/>
      <TextInput 
        multiline={true}
        placeholder="New Note" 
        style={{
          fontWeight:this.checkStyleValuePresent(0) ? 'bold' : 'normal',
          fontStyle: this.checkStyleValuePresent(1) ?'italic' :'normal',
          textDecorationLine:this.checkStyleValuePresent(2)  ? 'underline':'none',
          fontSize:24
        }}
        // ref={input => this.myInputText = input}
        underlineColorAndroid='transparent'
        ref={input => this.myInputText = input}
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

     </ScrollView> 
    )
  }
}
