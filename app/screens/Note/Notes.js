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

export default class Notes extends Component {
  constructor(props){
    super(props);
    // console.log(" props notes "+JSON.stringify(this.props.navigation.state.params.index))
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
    onEdit(body, index){
    if(index == null){
      this.setState({ notesData: [...this.state.notesData, {body:body}] }, ()=> {
        console.log("setstate notesdata"+JSON.stringify(this.state.notesData))
      })
      return
    }
    let notesData = [ ...this.state.notesData ];
    notesData[index] = {...notesData[index], body:body};
    this.setState({notesData})
  };
  
  updateNotesData = () => {
    this.props.navigation.navigate('EditNote',{onEdit: this.onEdit })
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
    this.setState({ notesData: res})
    
    console.log("coming in component mount"+JSON.stringify(this.state.notesData))
  }
 renderItem = ({item,index})=>{
  //  var item = JSON.stringify(item);
  //  console.log("index in render function   0" +index)
   return(
    <TouchableOpacity style={{height:80}} onPress={()=>this.props.navigation.navigate('EditNote',{item:item.body,index,onEdit:this.onEdit})}>
      <Card style={{margin:8}}>
        <CardItem>
          <Text >{item.body}</Text>
          <Right>
          <TouchableOpacity onPress={()=>this.onDelete(index)}>
            <Text>delete</Text>
          </TouchableOpacity>
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


