// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button
// } from 'react-native';
// import DbQueries from '../utils/dbQueries'
// import DbHelper from '../utils/dbHelper';

// export default class Home extends Component {

//   constructor(props) {
//     super(props);

//     DbHelper.setRealm();

//     this.state = {
//         modelData: []
//     }

//     this.showRows = this.showRows.bind(this);
//   }

//   async componentWillMount() {
//     let models = await DbQueries.getSomeDataFromModel()
//     if (models) {
//       this.setState({modelData: models})
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>
//         Hello there
//         </Text>
//         <Text>
//         {this.state.modelData.length}
//         </Text>
//         <Button
//           onPress={this.addRow}
//           title="Add"
//           color="#841584"
//         />
//         <Button
//           onPress={this.showRows}
//           title="Show"
//           color="#841584"
//         />
//         <Button
//           onPress={this.showBooks}
//           title="Book Show"
//           color="#841584"
//         />
//         <Button
//           onPress={this.addBook}
//           title="Book Add"
//           color="#841584"
//         />
//       </View>
//     );
//   }

//   async showRows() {
//     let models = await DbQueries.getSomeDataFromModel();
//     if (models) {
//       this.setState({modelData: models})
//     }
//   }

//   addRow() {
//     var value = {chapterNumber: Math.floor(Math.random() * (20)) + 1, numberOfVerses: 12}
//     DbQueries.addNewChapter(value);
//   }

//   addBook() {
//     var value1 = {chapterNumber: Math.floor(Math.random() * (20)) + 1, numberOfVerses: 10}
//     var value2 = {chapterNumber: Math.floor(Math.random() * (20)) + 1, numberOfVerses: 11}
//     var value3 = [];
//     value3.push(value1)
//     value3.push(value2)
//     var value4 = {bookId: 'BO1', bookName: 'Book 1', bookNumber: 2, section: 'OT', chapterItems: value3}
//     DbQueries.addNewBook(value4)
//   }

//   showBooks() {
//     DbQueries.getLinks();
//   }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Segment,Button,Tab,Tabs} from 'native-base'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class Home extends Component {
static navigationOptions = {
    headerTitle: 'AutographaGo',
};
constructor(){
  super()
  this.state = {
    activeTab: 'Old Testment',
     number:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
  }
}

  toggleButton=(tab)=>{
    this.setState({ activeTab: tab });
  }
  render() {
    const iconName = ['local-library','history','search','note','bookmark','border-color','settings']
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flexDirection:'column',width:width/5,backgroundColor:'black', }}>
        {
          iconName.map((iconName)=>
            <Icon name={iconName} color="white" size={32} style={{alignSelf:'center',padding:16}} />
          )
        }
        </View>
        <View style={{flexDirection:'column',width:width*4/5}}>
            <Segment style={{borderColor:'#3F51B5',borderBottomWidth:1}}>
              <Button first active={this.state.activeTab === 'Old Testment'} style={{backgroundColor:this.state.activeTab === 'Old Testment' ?"#3F51B5" :"#fff", padding: 0,height: 45,width:width*2/5}} onPress={()=>this.toggleButton('Old Testment')}><Text active={this.state.activeTab === 'Old Testment'} >Old Testment</Text></Button>
              <Button last active={this.state.activeTab === 'New Testment'} style={{backgroundColor:this.state.activeTab === 'New Testment' ?"#3F51B5" :"#fff",  padding: 0,height: 45,width:width*2/5}} onPress={()=>this.toggleButton('New Testment')}><Text active={this.state.activeTab === 'New Testment'} >New Testment</Text></Button>
            </Segment>
              <ScrollView>
              {
                this.state.number.map((item)=><View><Text>{item}</Text></View>)
              }
              </ScrollView>
        </View> 
      </View>
    );
  }
};
