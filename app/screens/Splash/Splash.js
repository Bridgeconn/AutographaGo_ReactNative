import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
// import DbQueries from '../utils/dbQueries'
import { splashStyle } from './styles.js'
import { NavigationActions } from 'react-navigation'

export default class Splash extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    console.log("SPLASH :: props " + JSON.stringify(props))
    if (!this.props.screenProps.isDbLoading) {
          console.log("NOWWW const")
          this._navigateTo('Home')
    }
  }

  componentWillReceiveProps(props) {
    console.log("SPLASH receive PROPS : " + JSON.stringify(props))
      if (!props.screenProps.isDbLoading) {
        console.log("start home")
          this._navigateTo('Home')
          // this.props.navigation.navigate('Home')
      }
  }

  _navigateTo = (routeName: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName,params:{languageCode:this.props.screenProps.languageCode,versionCode:this.props.screenProps.versionCode} })]

    })
    setTimeout(() => {  
      this.props.navigation.dispatch(resetAction)
    }, 800);
  }

  render() {
    return (
      <View style={splashStyle.splashScreen}>
        <Image source={require('../../assets/ic_autographa_go_splash.png')} />
      </View>
    );
  }
}
