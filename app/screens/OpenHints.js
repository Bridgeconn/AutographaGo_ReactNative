import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Segment,Button,Tab,Tabs} from 'native-base'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
export default class Home extends Component {
static navigationOptions = {
    headerTitle: 'Hints',
};
constructor(){
  super()
  this.animatedValue = new Animated.Value(0)
  this.state = {
    index:null,
    iconName: [
        {icon:'local-library',hint:'Continue reading where you last left', visible:false,size: new Animated.Value(0.3),},
        {icon:'history',hint:'See all your reading history', visible:false,size: new Animated.Value(0.3)},
        {icon:'search',hint:'Search for text', visible:false,size: new Animated.Value(0.3)},
        {icon:'note',hint:'Manage all your notes', visible:false,size: new Animated.Value(0.3),},
        {icon:'bookmark',hint:'See all your bookmarks', visible:false,size: new Animated.Value(0.3),},
        {icon:'settings',hint:'Manage app settings', visible:false,size: new Animated.Value(0.3),}
      ],
  }
  // this.handlePressOut =  this.handlePressOut.bind(this);
  // this.handlePressIn = this.handlePressIn.bind(this);
  // this.showHints = this.showHints.bind(this)
}
  showHints(index){
    console.log("hints param"+index)
    // this.setState({visible[index]:true})
    let visibility = [ ...this.state.iconName ];
    visibility[index] = {...visibility[index], visible: true};
    this.setState({ iconName: visibility}, () =>   {
    console.log("visible text"+this.state.iconName.visibility)
    });
    this.handlePressIn(index)
    this.handlePressOut()
    // let size = [this.state.iconName];
    // size[index] = {...visibility[index]};
    // console.log("size ...."+JSON.stringify(size[index].size))
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }
  
  handlePressIn(index) {
  this.setState({index})
    Animated.spring(this.animatedValue, {
      toValue: .5
    }).start()
  }
  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
    }).start()
  }
  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue}]
    }
    return (
      <ScrollView>
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flexDirection:'column'}}>
          {this.state.iconName.map((iconValue,index)=>
          <View style={{flexDirection:'row'}}>
                <TouchableWithoutFeedback
                      onPress={this.showHints.bind(this,index)}
                      onPressIn={this.handlePressIn.bind(this,index)}
                      onPressOut={this.handlePressOut.bind(this)}
                    >
                      <Animated.View style={[{
                        backgroundColor: "#fff",
                        width: 80,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }, index == this.state.index ? animatedStyle : null]}>
                        <Icon name={iconValue.icon} size={36}/>
                      </Animated.View>
                    </TouchableWithoutFeedback>
                    <Text>{iconValue.visible ? iconValue.hint : null}</Text>
              </View> 
              )} 
         </View>
       </View>
       </ScrollView>
     );
   }
 }





// import React, { Component } from 'react';
// import { AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'

// export default class OpenHints extends Component {
//   constructor(props) {
//     super(props);

//     this.handlePressIn = this.handlePressIn.bind(this);
//     this.handlePressOut = this.handlePressOut.bind(this);
//   }
  
  
//   render() {
//     const animatedStyle = {
//       transform: [{ scale: this.animatedValue}]
//     }
//     return (
//       <View style={styles.container}>
//         <TouchableWithoutFeedback
//           onPressIn={this.handlePressIn}
//           onPressOut={this.handlePressOut}
//         >
//           <Animated.View style={[styles.button, animatedStyle]}>
//             <Icon name="settings" size={36}/>
//           </Animated.View>
//         </TouchableWithoutFeedback>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: 
//   text: {
//     color: "#FFF"
//   }
// });
