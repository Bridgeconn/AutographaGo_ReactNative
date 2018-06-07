import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Card, CardItem, Content, Right, Left } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import DbQueries from '../../utils/dbQueries.js'
var moment = require('moment');

export default class Notes extends Component {
  constructor(props){
    super(props);
    this.state = {
      notesData:[],
    }
    this.queryDb = this.queryDb.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Notes',
    headerRight:(
      <TouchableOpacity style={{margin:8}} onPress={() => navigation.state.params.newNote(-1)}>
         <Icon name="note-add" size={24} color="#fff"/>
     </TouchableOpacity>
    )
  });
  
  createNewNote = (index) => {
    this.openEdit(index, null)
  };

  onDelete(index, time) {
    console.log("index in delete function "+index)
    if (index == -1) {
      return;
    }
    DbQueries.deleteNote(time)
    let notesData = [...this.state.notesData]
    notesData.splice(index, 1)
    this.setState({notesData})
  }

  async onRefresh(noteIndex, noteBody, crTime, moTime, refList) {
    console.log("on refresh")
    await DbQueries.addOrUpdateNote(noteIndex, noteBody, crTime, moTime, refList);
    this.queryDb()
  }

  async queryDb() {
    let res = await DbQueries.queryNotes();
    if(res==null){
      return
    }
    this.setState({ notesData: res})
  }

  componentDidMount(){
    this.props.navigation.setParams({ newNote: this.createNewNote})
    this.queryDb()
  }

  openEdit(index, noteObject) {
    this.props.navigation.navigate('EditNote',{index:index, noteObject: noteObject, 
      onDelete: this.onDelete, onRefresh: this.onRefresh})
  }
  
  renderItem = ({item,index})=>{
    var date = new Date(item.modifiedTime);
    console.log("render : "+ item.modifiedTime + " == " + date)
    dateFormate =  date.getHours() < 24  ? moment(item.modifiedTime).fromNow() : moment(item.modifiedTime).format('DD-MMM');  
    console.log("format date "+dateFormate)
    var bodyText = item.body == '' ? 'No additional text' : item.body
    return(
    <TouchableOpacity style={{flex:1}}
        onPress={() =>this.openEdit(index,item)}>
      <Card style={{margin:8,flex:1 }}>
        <CardItem >
        <View style={{flex:1}}> 
          <Text numberOfLines={2}>{bodyText}</Text>
          <View style={{justifyContent:'space-between', alignItems:'center',marginTop:16, flexDirection:'row'}}>
            <Text >{dateFormate}</Text>
            <Icon name="delete-forever" size={24} onPress={()=>this.onDelete(index, item.createdTime)}/>
          </View>
        </View>
        </CardItem>
        
      </Card>
    </TouchableOpacity>
   )
 }

  render() {
    return (
      <View style={{flex:1,margin:8}}>
      <FlatList
        style={{flex:1}}
        data={this.state.notesData}
        renderItem={this.renderItem}
      />
      </View>

    );
  }
}


