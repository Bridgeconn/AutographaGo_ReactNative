import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
  Button,
  FlatList,
} from 'react-native';
import firebase from 'react-native-firebase';
import Login from './Login';
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
const AsyncStorageConstants = require('../../utils/AsyncStorageConstants')
var RNFS = require('react-native-fs');

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
            dataSource: [],
        }
    }

    async componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });

        this.doList();

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
        // Points to the root reference
        var storageRef = firebase.app().storage().ref();
        // Points to 'databases'
        var dbRef = storageRef.child('databases');
        // Points to 'databases/autographa.realm'
        // Note that you can use variables to create child values
        var fileName = 'autographa.realm';
        var spaceRef = dbRef.child(fileName);

        const fileURI = RNFS.DocumentDirectoryPath+'/autographa.realm';
        const file1 = '/storage/emulated/0/DCIM/Camera/IMG_20170506_113514857.jpg'
        var uploadTask = spaceRef.putFile(fileURI)

        console.log("START UPLOAD ...")
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            console.log("SNAPSHOT STATAE = " + snapshot.state)
            if (progress == 100) {

            }
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                case 'progress': 
                    console.log('in progress')
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
        }
        );
    }

    doRestore = () => {
        console.log("DO WRITE")
        firebase.app().firestore().collection("users/prerna11082@iiitd.ac.in/backups")
            .add({
                size: "1234",
                timestamp: "213454687980",
                url: "dafrg.rhtwr"
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }

    doList = () => {
        console.log("DO READ")
        let dataSource = []
        firebase.app().firestore().collection("users/prerna11082@iiitd.ac.in/backups")
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    dataSource.push(doc.data())
                    console.log(`${doc.id} => ${doc.data().url}`);
                })
                this.setState({dataSource})
            })
    }

    render() {
        // if (!this.state.user) {
        //     return <Login />;
        // }
        return (
            <View style={{flex:1,margin:8}}>
                <ActivityIndicator
                    animating={this.state.isLoading} 
                    size="large" 
                    color="#0000ff" /> 
                <Text>Welcome to AutographaGo app !</Text>
                <Button 
                    onPress={this.doBackup}
                    title="BACKUP NOW"
                    color="#841584" />
                <Button 
                    onPress={this.doRestore}
                    title="RESTORE"
                    color="#841584" />
                <Button 
                    onPress={this.doList}
                    title="LIST"
                    color="#841584" />
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.url}</Text>}
                    />
            </View>
        );
    }
}