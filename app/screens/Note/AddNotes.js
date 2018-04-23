import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import NotesModel from '../../models/NotesModel'
import DbQueries from '../../utils/dbQueries'

const setParamsAction = ({noteBody}) => NavigationActions.setParams({
  params: { noteBody },
  key: 'Notes',
});
export default class AddNotes extends Component {
  
  constructor(props){
    super(props);
    console.log(" props notes add "+JSON.stringify(this.props))
    this.state = {
        noteBody:null
    }

  }
  // static navigationOptions = ({navigation}) =>{
  //   const { params = {} } = navigation.state;
  //   return {
  //     headerTitle: 'Notes',
  //     headerLeft:<HeaderBackButton style={{color:"#fff"}} onPress={()=>console.log("navigation"+JSON.stringify(navigation))}/>,
  //     headerRight:
  //       <TouchableOpacity style={{margin:8}} onPress={()=>navigation.state.params.handleAdd()}>
  //         <Text style={{fontSize:12,color:'#fff'}} >DONE</Text>
  //       </TouchableOpacity>
    
  //   }
    
  // };
  
  onTextInputChange =  (text) =>{
    this.setState ({noteBody:text})
    console.log("note body "+this.state.noteBody)
  }
  async addNote(){
    // this.props.navigation.navigate('Notes',{noteBody:this.state.noteBody})
    // this.props.navigation.dispatch(setParamsAction(this.state.noteBody))
    let notes = await DbQueries.addNotes(this.state.noteBody);
 
    Alert.alert("Student Details Added Successfully.")
    // console.log("header left button"+this.state.noteBody)
  }

  // componentDidMount () {
  //   this.props.navigation.setParams({ handleAdd: this.addNote})
  // }

  render() {
    
    return (
     <View style={{flex:1}}>

      <TextInput 
        placeholder="Note" 
        style={{borderTopColor:'#000'}}
        onChangeText = {(text) => this.setState({noteBody:text})}
      />
      <Button title='add note' onPress={this.addNote()}  />
     </View> 
    )
  }
}
