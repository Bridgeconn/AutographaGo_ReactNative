import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';
import Login from './Login';
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')

export default class BackupRestore extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Backup and Restore',
    });

    constructor(props){
        super(props);
        this.unsubscriber = null;
        this.state = {
            downloadData:[],
            isLoading: true,
            user: null,
            url: props.navigation.getParam('url', null),
        }
    }

    async componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });

        const url = this.state.url;
        if (url == null ) { 
            return
        }
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];

        // if (routeName === 'autographagoreactnative.page.link') {
            // Confirm the link is a sign-in with email link.
            if (firebase.auth().isSignInWithEmailLink(url)) {
                console.log("it is sign in link : " + url)
                // Get the email if available. This should be available if the user completes
                // the flow on the same device where they started it.
                var email = await AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.BackupRestoreEmail, null)
                console.log("email from async : " + email)
                if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                    Alert.alert("Please enter email");
                } else {
                    this.setState({})
                }
                // The client SDK will parse the code from the link for you.
                firebase.auth().signInWithEmailLink(email, url)
                .then(function(result) {
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // You can access the new user via result.user
                    // Additional user info profile not available via:
                    // result.additionalUserInfo.profile == null
                    // You can check if the user is new or existing:
                    // result.additionalUserInfo.isNewUser
                })
                .catch(function(error) {
                    // Some error occurred, you can inspect the code: error.code
                    // Common errors could be invalid email and invalid or expired OTPs.
                });
            }
        // };
    }

    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps : " + JSON.stringify(props) )
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
          this.unsubscriber();
        }
      }

    render() {
        if (!this.state.user) {
            return <Login />;
        }
        return (
            <View style={{flex:1,margin:8}}>
                <ActivityIndicator
                    animating={this.state.isLoading} 
                    size="large" 
                    color="#0000ff" /> 
                <Text>Welcome to AutographaGo app {this.state.user.email}!</Text>
            </View>
        );
    }
}