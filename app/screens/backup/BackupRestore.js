import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
  Button
} from 'react-native';
import firebase from 'react-native-firebase';
import Login from './Login';
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')
var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs

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
                    // this.setState({})
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

    doBackup = () => {
        // Set the configuration for your app
        // TODO: Replace with your project's config object
        // var config = {
        //     apiKey: 'AIzaSyAcjK4bnL3m852J8x1j9cJVCkHwESsp_aE',
        //     authDomain: '',
        //     databaseURL: '',
        //     storageBucket: 'autographagoreactnative.appspot.com'
        // };
        // firebase.initializeApp(config);

        // Points to the root reference
        var storageRef = firebase.app().storage().ref();
        // Points to 'databases'
        var dbRef = storageRef.child('databases');
        // Points to 'databases/autographa.realm'
        // Note that you can use variables to create child values
        var fileName = 'autographa.realm';
        var spaceRef = dbRef.child(fileName);
        // // File path is 'databases/autographa.realm'
        // var path = spaceRef.fullPath
        // // File name is 'autographa.realm'
        // var name = spaceRef.name
        // // Points to 'databases'
        // var imagesRef = spaceRef.parent;

        // RNFS.readFile(path)
        //         .then((result)=>{
        //             this.parseFileContents(result);
        //         });

        // get a list of files and directories in the main bundle
        // RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        //     .then((result) => {
        //         console.log('GOT RESULT', result);
        //         // stat the first file
        //         return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        //     })
        //     .then((statResult) => {
        //         if (statResult[0].isFile()) {
        //             // if we have a file, read it
        //             return RNFS.readFile(statResult[1], 'utf8');
        //         }
        //         return 'no file';
        //     })
        //     .then((contents) => {
        //         // log the file contents
        //         console.log(contents);
        //     })
        //     .catch((err) => {
        //         console.log(err.message, err.code);
        //     });
        // return;




        var file = RNFetchBlob.wrap(RNFS.DocumentDirectoryPath+'/autographa.realm'); // use the Blob or File API
        const fileURI = RNFS.DocumentDirectoryPath+'/autographa.realm';
        RNFS.readFile(fileURI, 'base64')
            .then((data) => {

            })
        var uploadTask = spaceRef.put(file);
        // console.log("START UPLOAD + " + file)
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {
            // Handle unsuccessful uploads
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    console.log("error : User doesn't have permission to access the object")
                    break;
                case 'storage/canceled':
                    console.log("error : User canceled the upload")
                    break;
                case 'storage/unknown':
                    console.log("error : Unknown error occurred, inspect error.serverResponse")
                    break;
            }
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
            });
        });
    }

    doRestore = () => {

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
                <Button 
                    onPress={this.doBackup}
                    title="BACKUP NOW"
                    color="#841584" />
                <Button 
                    onPress={this.doRestore}
                    title="RESTORE"
                    color="#841584" />
            </View>
        );
    }
}