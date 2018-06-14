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
import { noteStyle } from './styles.js';

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
    }

    this.styles = noteStyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
    
    this.getReference = this.getReference.bind(this)
    this.openReference = this.openReference.bind(this)
    this.deleteReference = this.deleteReference.bind(this)
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
    return (
     <ScrollView style={{flex:1}}>
      <View style={this.styles.noteReferenceViewCustom}>
        {this.state.referenceList.length == 0 
          ? 
          <Text style={this.styles.NoteAddButton}>Tap button to add references</Text> 
          :  
          <FlowLayout style={this.styles.FlowLayoutCustom} ref="flow" dataValue={this.state.referenceList} 
            openReference={(index) => {this.openReference(index)}} 
            deleteReference={(index) => {this.deleteReference(index)}}
          />
        }
        <Icon name="add-circle" style={this.styles.addIconCustom} size={28} color="gray" onPress={()=> {this.onAddVersePress()}} />
      </View>
      
      <View style={this.styles.noteTextView}/>
      <TextInput 
        multiline={true}
        placeholder="New Note" 
        style={[
          this.styles.noteTextSize,
          {
          fontWeight:this.checkStyleValuePresent(0) ? 'bold' : 'normal',
          fontStyle: this.checkStyleValuePresent(1) ?'italic' :'normal',
          textDecorationLine:this.checkStyleValuePresent(2)  ? 'underline':'none',
          }
        ]}
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

     </ScrollView> 
    )
  }
}
