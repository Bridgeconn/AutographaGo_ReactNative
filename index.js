import { AppRegistry } from 'react-native';
import App from './app/utils/routes'
import React, {Component} from 'react'


export default class AutographaGo extends Component {
    render(){
        return(
            <App/>
        )
    }
}
AppRegistry.registerComponent('AutographaGo_ReactNative', () => AutographaGo);
