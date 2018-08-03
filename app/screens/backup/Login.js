import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')

export default class Login extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Login',
    });

    constructor(props){
        super(props);
        this.unsubscriber = null;
        this.state = {
            email:'',
            isLoading: true,
            user: null,
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    doSignIn = () => {
        var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: 'http://www.autographa.com/products/',
            // This must be true.
            handleCodeInApp: true,
            iOS: {
              bundleId: 'com.autographago_reactnative.ios'
            },
            android: {
              packageName: 'com.autographago_reactnative',
              installApp: true
            }
        };

        firebase.auth().sendSignInLinkToEmail(this.state.email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                console.log("ON SUCCESS SEND SIGN IN LINK TO MAIL  : " + this.state.email)
                
                AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.BackupRestoreEmail, this.state.email);
            })
            .catch(function(error) {
                // Some error occurred, you can inspect the code: error.code
                console.log("sendSignInLinkToEmail  error : " + error.code)
            });
    }

    render() {
        return (
            <View style={{flex:1,margin:8}}>
                <ActivityIndicator
                    animating={this.state.isLoading} 
                    size="large" 
                    color="#0000ff" /> 
                <Text>Welcome to AutographaGo app!</Text>
                <TextInput 
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                />
                <Button 
                    onPress={this.doSignIn}
                    title="SIGN IN, SEND LINK TO EMAIL"
                    color="#841584" />
            </View>
        );
    }
}