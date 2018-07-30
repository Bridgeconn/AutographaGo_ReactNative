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

    doSignIn() {
        firebase.auth().sendSignInLinkToEmail(this.state.email, actionCodeSettings);
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