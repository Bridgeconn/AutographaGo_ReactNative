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
  ScrollView,
  Image
} from 'react-native';
import FlowLayout from '../../components/FlowLayout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';

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
    }

    this.getReference = this.getReference.bind(this)
    this.openReference = this.openReference.bind(this)
    this.deleteReference = this.deleteReference.bind(this)
    this.onChangeText = this.onChangeText.bind(this)

    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
  }

  async getHTML() {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
    //alert(titleHtml + ' ' + contentHtml)
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
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

  componentDidMount() {
    this.props.navigation.setParams({ handleAdd: this.saveNote})
    this.props.navigation.setParams({ handleBack: this.onBack})
  }

  onChangeText = (text)=>{
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
    return (
     <ScrollView style={{flex:1, flexDirection:'column', backgroundColor:'#ffffff'}}>
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
      
      <RichTextEditor
        style={{flex:1, height:200}}
        ref={(r)=>this.richtext = r}
        contentPlaceholder="New Note"
        initialContentHTML={this.state.noteBody}
        editorInitializedCallback={() => this.onEditorInitialized()}
      />
      <RichTextToolbar
        getEditor={() => this.richtext}
        renderAction={}
        iconMap={}
      />

     </ScrollView> 
    )
  }
}
