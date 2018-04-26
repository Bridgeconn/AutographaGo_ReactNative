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
import { Card, CardItem, Content } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import DbQueries from '../../utils/dbQueries.js'

export default class Notes extends Component {
  constructor(props){
    super(props);
    // console.log(" props notes "+JSON.stringify(this.props.navigation.state.params.index))
    this.state = {
      notesData:["esrtdfyg", "aq43ws5e6drtcy"],
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
   onEdit = (data,index) => {
    if(index==null){
      console.log('index null ')
      this.setState({ notesData: [...this.state.notesData, data] }, ()=> {
        console.log("setstate notesdata"+JSON.stringify(this.state.notesData))
      })
      return
    }
    else {
      this.state.notesData[index] = data
    }
  };
  
  updateNotesData = () => {
    this.props.navigation.navigate('EditNote',{onEdit: this.onEdit })
  };
  
  async componentDidMount(){
    this.props.navigation.setParams({ updateNotesData: this.updateNotesData})

    let res = await DbQueries.queryNotes();

    console.log(JSON.stringify("DB NOTES == " + res))
  }
 renderItem = ({item,index})=>{
   console.log("index in render function "+index+"  0" + item)
   return(
  <TouchableOpacity style={{height:80}} onPress={()=>this.props.navigation.navigate('EditNote',{item,index,onEdit: this.onEdit })}>
  <Card>
    <CardItem>
      <Text >{item}</Text>
    </CardItem>
   </Card>
   </TouchableOpacity>
   )
 }
  render() {
    console.log("props navigation "+JSON.stringify(this.props.navigation.state.params))
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


