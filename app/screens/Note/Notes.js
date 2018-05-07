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
import { Card, CardItem, Content, Right } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import DbQueries from '../../utils/dbQueries.js'
var moment = require('moment');
export default class Notes extends Component {
  constructor(props){
    super(props);
    this.state = {
      notesData:[],
      index:null
    }
    this.onEdit = this.onEdit.bind(this)
  }

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Notes',
    headerRight:(
      <TouchableOpacity style={{margin:8}} onPress={() => navigation.state.params.updateNotesData()}>
         <Icon name="note-add" size={24} color="#fff"/>
     </TouchableOpacity>
)
  });
  
  updateNotesData = () => {
    this.props.navigation.navigate('EditNote',{onEdit: this.onEdit, index:-1 , item:'' })
  };
  onDelete(index){
    console.log("index in delete function "+this.state.index)
    let updateAfterDelete = [...this.state.notesData]; // make a separate copy of the array
    updateAfterDelete.splice(index, 1);
    this.setState({notesData:updateAfterDelete});
    DbQueries.deleteNote(index)
  }
  async componentDidMount(){
    this.props.navigation.setParams({ updateNotesData: this.updateNotesData})
    let res = await DbQueries.queryNotes();
    if(res==null){
      return
    }
    this.setState({ notesData: res})
    console.log("coming in component mount"+JSON.stringify(this.state.notesData))
    console.log("coming in component mount result "+JSON.stringify(res))
  }
 renderItem = ({item,index})=>{
    var date = new Date(item.createdTime);
    var modifiedDate = new Date(item.modifiedTime);
   return(
    <TouchableOpacity style={{height:80}} onPress={()=>this.props.navigation.navigate('EditNote',{item:item.body,time:item.createdTime,index:index,onEdit:this.onEdit})}>
      <Card style={{margin:8}}>
        <CardItem>
          <Text>{item.body}</Text>
          <Text style = {{marginHorizontal:8}}>{date.getHours() +"-"+ date.getMinutes() +' '+date.getSeconds()}</Text>
          <Right>
          <TouchableOpacity onPress={()=>this.onDelete(index)}>
            <Text>delete</Text>
          </TouchableOpacity>
          <Text style = {{marginHorizontal:8}}>{modifiedDate.getHours() +"-"+ modifiedDate.getMinutes() +' '+modifiedDate.getSeconds()}</Text>
          </Right>
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


