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
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Segment,Button,Tab,Tabs} from 'native-base'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor:"midnightblue"
       },
      })
  constructor(props){
    super(props)
    console.log("props value home page update "+this.props.screenProps.colorMode)
    this.state = {
      colorMode:this.props.screenProps.colorMode,
      sizeMode:this.props.screenProps.sizeMode,
      activeTab1:true,
      activeTab2:false,
      number:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,996,97,98,99],
    }
  }

  toggleButton1(){
  this.setState({activeTab1:true,activeTab2:false})
  this.ScrollViewPosition.scrollTo({x: 0, y: 0, animated: true})
  }
  toggleButton2(){
    this.setState({activeTab1:false,activeTab2:true})
    this.ScrollViewPosition.scrollTo({x: 0, y: 569, animated: false})
  }
  
  handleScroll = (event)=>{
  console.log("handleScroll"+ Math.round(event.nativeEvent.contentOffset.y));
  console.log("maxHeight of window "+height)
  if(Math.round(event.nativeEvent.contentOffset.y)>568){
    console.log("height is more than 568")
    this.setState({activeTab1:false,activeTab2:true})
  }
  else{
    console.log("height is less than 568")
    this.setState({activeTab1:true,activeTab2:false})
  }

  }
  render() {
    const iconName = [
      {icon:'local-library',pressIcon:'EditNote',},
      {icon:'history',pressIcon:'History'},
      {icon:'search',pressIcon:'Search'},
      {icon:'note',pressIcon:'Notes'},
      {icon:'bookmark',pressIcon:'Bookmarks',},
      {icon:'border-color',pressIcon:'Highlights'},
      {icon:'settings',pressIcon:'Settings'}
    ]
    const iconPress = ['EditNote',' history','Search','Note','Bookmarks','Highlights','Settings']
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flexDirection:'column',width:width/5,backgroundColor:'black', }}>
        {
          iconName.map((iconName)=>
            <Icon name={iconName.icon} color="white" size={32} style={{alignSelf:'center',padding:16}} onPress={() =>this.props.navigation.navigate(iconName.pressIcon,{paramColorMode:this.state.colorMode,paramSizeMode:this.state.sizeMode})}/>
          )
        }
        </View>
        <View style={{flexDirection:'column',width:width*4/5}}>
            <Segment style={{borderColor:'#3F51B5',borderBottomWidth:1}}>
              <Button first active={this.state.activeTab1} style={{backgroundColor:this.state.activeTab1==false ? "#fff" : "#3F51B5", padding: 0,height: 45,width:width*2/5}} onPress={this.toggleButton1.bind(this)}><Text active={this.state.activeTab1} style={{color:this.state.activeTab1==false ? "#000" : "#fff"}}>Old Testment</Text></Button>
              <Button last active={this.state.activeTab2} style={{backgroundColor:this.state.activeTab2==false ?  "#fff" : "#3F51B5",  padding: 0,height: 45,width:width*2/5}} onPress={this.toggleButton2.bind(this)}><Text active={this.state.activeTab2} style={{color:this.state.activeTab2==false ? "#000" : "#fff"}}>New Testment</Text></Button>
            </Segment>
             <ScrollView
              onScroll = {this.handleScroll}
              scrollEventThrottle={10}
              ref = {refs => this.ScrollViewPosition =refs }
              >
                {this.state.number.map((item)=><View><TouchableOpacity onPress={()=>this.props.navigation.navigate('Book')}><Text>{item}</Text></TouchableOpacity></View>)}
              </ScrollView>
        </View> 
      </View>
    );
  }
};
