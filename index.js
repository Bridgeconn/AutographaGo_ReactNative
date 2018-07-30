import { AppRegistry } from 'react-native';
import App from './app/utils/routes'
import BackgroundMsg from './app/utils/BackgroundMsg'; 
import React, {Component} from 'react'
import Realm from 'realm'

export default class AutographaGo extends Component {

    constructor(props) {
        super(props)
    }
    
    render(){
        return(
            <App/>
        )
    }
}

AppRegistry.registerComponent('AutographaGo_ReactNative', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => BackgroundMsg); 