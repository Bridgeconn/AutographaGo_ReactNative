import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Card, CardItem, Content } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Notes extends Component {
  constructor(props){
    super(props);
    console.log(" props notes "+JSON.stringify(this.props))
    this.state = {
      notesData:[],
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
  onSelect = (data,index) => {
    console.log(" index value "+index )
    console.log("value "+data)

      // let notesData = [...this.state.notesData];
      // notesData[index] =[...this.state.notesData[index], data]
      // this.setState({ notesData });
      this.setState({ notesData: [...this.state.notesData, data] })
  };
  
  updateNotesData = () => {
    this.props.navigation.navigate('AddNotes',{onSelect: this.onSelect })
  };
  componentDidMount(){
    this.props.navigation.setParams({ updateNotesData: this.updateNotesData})
  }
 
  render() {
    console.log("props navigation "+JSON.stringify(this.props.navigation.state.params))
    return (
      <View style={{flex:1,margin:8}}>
      { 
        this.state.notesData.map((item,index) =>
          <Content key={item}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddNotes',{item,index,onSelect:this.onSelect})}>
            <Card>
              <CardItem >
                <Text>{item}</Text>
              </CardItem>
            </Card>
            </TouchableOpacity>
          </Content>
      )
      }
     
      </View>
    );
  }
}


