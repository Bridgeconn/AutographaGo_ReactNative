import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
import colorConstants from '../../utils/colorConstants'
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
            user:null,
            isLoading: false,
        }
    }

    doSignIn = () => {
        if (this.state.email == "") {
            Alert.alert("Email", "Email field is empty, please enter email in input box.")
            return
        }
        this.setState({isLoading: true}, () => {
            var actionCodeSettings = {
                url: 'http://www.autographa.com/products/',
                handleCodeInApp: true,
                iOS: {bundleId: 'com.autographago_reactnative.ios'},
                android: {packageName: 'com.autographago_reactnative', installApp: true}
            };
    
            console.log("SENDING")

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
                    Alert.alert("Error", 
                        "There is some error in sending sign in link to your email. " + error.code)
                });
        })
    }

    async componentDidMount() {
        var email = await AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.BackupRestoreEmail, "")
        this.setState({email})        
    }

    render() {
        return (
            <View style={this.props.styles.container}>
                <View style={this.props.styles.containerMargin}>
                    <ActivityIndicator
                        style={this.props.styles.loaderStyle}
                        animating={this.state.isLoading == true ? true : false} 
                        size="large" 
                        color="#0000ff" /> 
                    <Text style={this.props.styles.textStyle}>Welcome to AutographaGo app!</Text>
                    <TextInput 
                        style={this.props.styles.textInputStyle}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                        placeholder="Enter email"
                        placeholderTextColor={colorConstants.Light_Gray}
                    />
                    <Button 
                        style={this.props.styles.buttonStyle}
                        onPress={this.doSignIn}
                        title="SIGN IN, SEND LINK TO EMAIL"
                        color="#841584" />
                </View>
            </View>
        );
    }
}