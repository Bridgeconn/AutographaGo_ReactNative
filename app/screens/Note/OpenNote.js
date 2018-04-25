import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Card, CardItem, Content } from 'native-base';

export default class Notes extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Note',
    })
  constructor(props){
    super(props);
    this.state = {
        show:false
    }
    console.log(" props notes "+JSON.stringify(this.props))
  }

  showMenu(show){
    this.setState({show:!show})
  }
 
 
  render() {
    console.log("props navigation "+JSON.stringify(this.props.navigation.state.params))
    return (
      <View style={{flex:1,margin:8,}}>
       <Text>{this.props.navigation.state.params.item}</Text>
       <View style={{justifyContent:"center", bottom:70, right:30, position:'absolute'}}>
        <Icon name="edit" size={28} onPress={()=>this.showMenu(this.state.show)}/>
      </View>
      {
        this.state.show ? <View style={{justifyContent:'center',height:50, backgroundColor:'blue', bottom:10, right:10, position:'absolute'}}>
          <View style={{flexDirection:"row",alignItems:'center'}}> 
            <View style={{margin:8}}>
            <TouchableOpacity onPress = {()=> this.props.navigation.navigate('AddNotes',{editableData:this.props.navigation.state.params.item,index:this.props.navigation.state.params.index})}>    
                <Text>Edit</Text>
            </TouchableOpacity>
            </View>
            <View style={{margin:8}}>
            <TouchableOpacity>    
                <Text>Share</Text>
            </TouchableOpacity>    
            </View>
            <View style={{margin:8}}>
            <TouchableOpacity>  
                <Text>Delete</Text>
            </TouchableOpacity>  
            </View>
          </View>
          </View> : null
      }
      </View>
    );
  }
}


