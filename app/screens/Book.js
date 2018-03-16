import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from 'react-native';

const height = Dimensions.get('window').height-80;
const width = Dimensions.get('window').width;

export default class Book extends Component {
  static navigationOptions = {
    headerTitle: 'Book',
  };
  constructor(){
  super()
  this.state = {
     number:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,996,97,98,99],
  }
}


  render() {
    return (
      <View style={{flex:1}}>
      <View style={{flex:1,flexDirection:'column',justifyContent:"center",alignItems:"center",top:0}}>
        <View style={{flexDirection:'row',height:height/7}}>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>1</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>2</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>3</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>5</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>6</Text></View>
        </View>
        <View style={{flexDirection:'row',height:height/7}}>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>7</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>8</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>9</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>10</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>12</Text></View>
        </View> 
        <View style={{flexDirection:'row',height:height/7}}>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>13</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>14</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>15</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>16</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>17</Text></View>
        </View>
        <View style={{flexDirection:'row',height:height/7}}>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>18</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>19</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>20</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>21</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>22</Text></View>
        </View> 
        <View style={{flexDirection:'row',height:height/7}}>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>23</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>24</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>25</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>26</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>27</Text></View>
        </View>
        <View style={{flexDirection:'row',height:height/7}}>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>28</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>29</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>30</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>31</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>32</Text></View>
        </View>
        <View style={{flexDirection:'row',height:height/7}}>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>34</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>35</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>36</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>37</Text></View>
          <View style={{flex:1,flexDirection:'column',borderColor:'#282d35',borderWidth:1,justifyContent:"center"}}><Text style={{textAlign:"center",alignItems:"center"}}>38</Text></View>
        </View> 
        
      </View>
      </View>
    );
  }
}
