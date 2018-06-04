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
      index:null
    }
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
    this.props.navigation.navigate('EditNote',{index:-1 , item:'' })
  }

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
    dateFormate =  date.getHours() < 24  ? moment(item.modifiedTime).fromNow() : moment(item.modifiedTime).format('DD-MMM');  
      console.log("format date "+dateFormate)
    return(
    <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigation.navigate('EditNote',{item:item.body,time:item.createdTime,index:index})}>
      <Card style={{margin:8,flex:1 }}>
        <CardItem >
        <View style={{flex:1}}> 
          <Text numberOfLines={2}>{item.body}</Text>
          <View style={{justifyContent:'space-between', alignItems:'center',marginTop:16, flexDirection:'row'}}>
            <Text >{dateFormate}</Text>
            <Icon name="delete-forever" size={24} onPress={()=>this.onDelete(index)}/>
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


