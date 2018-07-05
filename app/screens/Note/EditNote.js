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
  Image,
  Dimensions,
} from 'react-native';
import FlowLayout from '../../components/FlowLayout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import {RichTextEditor, actions} from 'react-native-zss-rich-text-editor';
import RichTextToolbar from '../../utils/RichTextToolbar'
const height = Dimensions.get('window').height;
import { noteStyle } from './styles.js';

export default class EditNote extends Component {
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Edit Note',
    headerLeft:(<HeaderBackButton style={{color:"#fff"}} onPress={()=>navigation.state.params.handleBack()}/>),
    headerRight:(
      <TouchableOpacity style={{margin:8}} onPress={()=>navigation.state.params.handleAdd()}>
        <Text style={{fontSize:12,color:'#fff'}}>DONE</Text>
      </TouchableOpacity>
      ),
      headerTintColor: '#fff'
  });

  constructor(props){
    super(props);
    this.state = {
        noteIndex: this.props.navigation.state.params.index,
        noteObject: this.props.navigation.state.params.noteObject,
        noteBody: this.props.navigation.state.params.index == -1 
          ? ''
          : this.props.navigation.state.params.noteObject.body == '' ? '' : JSON.parse(this.props.navigation.state.params.noteObject.body),
        referenceList: this.props.navigation.state.params.index == -1 
          ? [] 
          : this.props.navigation.state.params.noteObject.references,
        // todo here fix reference list
        referenceList2: this.props.navigation.state.params.referenceList,
    }

    this.styles = noteStyle(props.screenProps.colorFile, props.screenProps.sizeFile);   
    
    this.getReference = this.getReference.bind(this)
    this.openReference = this.openReference.bind(this)
    this.deleteReference = this.deleteReference.bind(this)
    this.onChangeText = this.onChangeText.bind(this)

    this.getHtml = this.getHtml.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    // this.getHtml();
  }

  async getHtml() {
    const body = await this.richtext.getContentHtml();
    return JSON.stringify(body)
  }

  setFocusHandlers() {
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }

  saveNote = async () =>{
    var time =  new Date()
    console.log("time "+time)
    var contentBody = await this.getHtml()
    if (contentBody == '' && this.state.referenceList.length == 0) {
      if(this.state.noteIndex != -1){
        // delete note
        this.props.navigation.state.params.onDelete(this.state.noteIndex, this.state.noteObject.createdTime)
      }
    } else {
      this.props.navigation.state.params.onRefresh(this.state.noteIndex, contentBody, 
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

  onBack = async () =>{
    var contentBody = await this.getHtml()
      if (this.state.noteIndex == -1) {
        if (contentBody != '' || this.state.referenceList.length > 0) {
          this.showAlert();
          return;
        }
      } else {
        if(contentBody !== this.props.navigation.state.params.noteObject.body
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

    this.addRef2()
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

  addRef2() {
    if (this.state.referenceList2) {
      if (this.state.noteIndex == -1) {
        this.setState({referenceList: this.state.referenceList2})
      } else {
        let referenceList = [...this.state.referenceList]        
        for (var i=0; i<this.state.referenceList2.length; i++) {
          let item = this.state.referenceList2[i]
          if (!this.checkIfReferencePresent(item.bookId, item.bookName, item.chapterNumber, item.verseNumber)) {
            referenceList.push(item)
          }
        }
        this.setState({referenceList})
      }
    }
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
     <ScrollView style={this.styles.containerEditNote}>
      <View style={this.styles.subContainer}>
        {this.state.referenceList.length == 0 
          ? 
          <Text style={this.styles.tapButton}>Tap button to add references</Text> 
          : 
          <FlowLayout style={this.styles.tapButton} ref="flow" dataValue={this.state.referenceList} 
            openReference={(index) => {this.openReference(index)}} 
            deleteReference={(index) => {this.deleteReference(index)}}
          />
        }
        <Icon name="add-circle" style={this.styles.addIconCustom} size={28} color="gray" onPress={()=> {this.onAddVersePress()}} />
      </View>
      
      <View style={this.styles.textEditorView}>

        <RichTextEditor
          style={this.styles.richTextEditor}
          ref={(r)=>this.richtext = r}
          hiddenTitle={true}
          contentPlaceholder="New Note"
          initialContentHTML={this.state.noteBody}
          editorInitializedCallback={() => this.onEditorInitialized()}
        />

        <RichTextToolbar
          ref={(r)=>this.toolbar = r}
          getEditor={() => this.richtext}
          renderAction={this._renderToolbarItem}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.insertBulletsList,
            actions.insertOrderedList
          ]}
        />
      </View>

     </ScrollView> 
    )
  }

  _renderToolbarItem (action,selected, method){
    let iconName = 'format-bold'
    switch(action) {
      case actions.setBold: {
        iconName = "format-bold"
        break
      }
      case actions.setItalic: {
        iconName = "format-italic"
        break
      }
      case actions.setUnderline: {
        iconName = "format-underlined"
        break
      }
      case actions.setStrikethrough: {
        iconName = "format-strikethrough"
        break
      }
      case actions.insertBulletsList: {
        iconName = "format-list-bulleted"
        break
      }
      case actions.insertOrderedList: {
        iconName = "format-list-numbered"
        break
      }
    }

    return(
      <Icon name={iconName} 
      size={28} 
      color={selected ? 'black' : 'white'} 
      style={[
        // this.styles.iconCustom,
        {backgroundColor: selected ? 'white': 'transparent', margin:8, 
        padding:8, }
      ]}
        onPress={method} 
      />
    );
  }

  
}