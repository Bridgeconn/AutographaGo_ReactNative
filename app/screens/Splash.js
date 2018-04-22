import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

export default class Splash extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount (){
    setTimeout(() => {
        this.props.navigation.navigate('Home')
    }, 800)
  }

  render() {
    return (
      <View style={{  flex:1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/ic_autographa_go_splash.png')} />
      </View>
    );
  }
}
