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
import {Card} from 'native-base'
import firebase from 'react-native-firebase';
import Login from './Login';
import Icon from 'react-native-vector-icons/MaterialIcons'
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
            isLoading: false,
            user: firebase.auth().currentUser,
            url: props.navigation.getParam('url', null),
            dataSource: [],
        }
    }

    async componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
        
        this.doList()

        const url = this.state.url;
        if (url == null ) { 
            return
        }
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];

        // Confirm the link is a sign-in with email link.
        if (firebase.auth().isSignInWithEmailLink(url)) {
            console.log("it is sign in link : " + url)
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            var email = await AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.BackupRestoreEmail, null)
            console.log("email from async : " + email)
            if (email == null) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
                Alert.alert("Email", "Please enter email");
            } else {
                this.continueSignIn(email, url)
            }
        }
    }

    continueSignIn = (email, url) => {
        firebase.auth().signInWithEmailLink(email, url)
            .then(function(result) {
                AsyncStorageUtil.removeItem(AsyncStorageConstants.Keys.BackupRestoreEmail)
                // You can access the new user via result.user
                this.setState({user: result.user})
            })
            .catch(function(error) {
                // Alert.alert("Error", "There is some error " + error.code)
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
            });
    }

    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps : " + JSON.stringify(props) )
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
          this.unsubscriber();
        }
    }

    getUniqueId() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' 
            + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    startBackup = (uid, emailId) => {
        var self = this;

        // Points to the root reference
        var storageRef = firebase.app().storage().ref();
        // Points to 'databases'
        var dbRef = storageRef.child('databases/' + emailId + '/' + uid);
        // Points to 'databases/autographa.realm'
        // Note that you can use variables to create child values
        var fileName = 'autographa.realm';
        var spaceRef = dbRef.child(fileName);

        const fileURI = RNFS.DocumentDirectoryPath+'/autographa.realm';
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
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                case firebase.storage.TaskState.SUCCESS: 
                    console.log("in success uid = " + uid);
                    console.log("DO WRITE")
                    var fdate = new Date(snapshot.metadata.timeCreated);
                    console.log(" date = "+ fdate)
                    var a = snapshot.metadata.size;
                    var sizeFormat = a;
                    if(0==a) {
                        sizeFormat = "0 Bytes";
                    } else {
                        var c=1024,
                            d=2,
                            e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],
                            f=Math.floor(Math.log(a)/Math.log(c));
                        sizeFormat = parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]
                    }
                    
                    firebase.app().firestore().collection("users/" + emailId 
                        + "/backups").doc(uid)
                        .set({
                            size: sizeFormat,
                            timestamp: fdate,
                            url: snapshot.downloadURL
                        })
                    self.setState({isLoading: false})
                    self.doList();
                    break;
                case firebase.storage.TaskState.CANCELLED: 
                    console.log('in cancelled')
                    break;
                case firebase.storage.TaskState.ERROR: 
                    console.log('in error')
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
        });
    }

    doBackup = () => {
        var emailId = this.state.user == null ? null : this.state.user.email;
        if (emailId == null) {
            Alert.alert("User not found")
            return
        }
        var uid = this.getUniqueId();
        this.setState({isLoading: true}, () => {
            this.startBackup(uid, emailId)
        })
    }

    doList = () => {
        var emailId = this.state.user == null ? null : this.state.user.email;
        if (emailId == null) {
        } else {
            console.log("DO READ.. " + emailId)
            let dataSource = []
            firebase.app().firestore().collection("users/" + emailId + "/backups")
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        dataSource.push(doc.data())
                        console.log(`${doc.id} => ${doc.data().url}`);
                    })
                    this.setState({dataSource})
                })
        }
    }

    startRestore = (item) => {
        console.log('OK Pressed .. ' + item.url)

        RNFS.downloadFile({
                fromUrl: item.url, 
                toFile: RNFS.DocumentDirectoryPath + '/autographa.realm'
            })
            .promise.then(result => {
                console.log("RESTOR DONE, nOW RESTATTS")
                console.log("result byteswritten = " + result.bytesWritten);
                // todo restart app
            });
    }

    doRestore = (item) => {
        console.log("DO RESTORE , show dialog")
        Alert.alert("Restore", 
            "This backup will be restored, and current saved data, if any, will be deleted. Are you sure you want to proceed?", 
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'YES', onPress: () => this.startRestore(item)},
            ],
            { cancelable: true }
        )
    }

    renderItem = ({item,index})=>{
        return(
            <Card style={{padding:8}}>
                <TouchableOpacity onPress={()=> this.doRestore(item)} >
                    <Text style={{margin:8, fontSize:20}}>
                        {item.timestamp.toString()}    Size: {item.size}
                    </Text>
                </TouchableOpacity>
            </Card>
        )
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
                <Text>Welcome to Autographa Go !</Text>
                <Button 
                    onPress={this.doBackup}
                    title="BACKUP NOW"
                    color="#841584" />
                <Icon 
                    onPress={() => {this.doList()}}
                    name={"autorenew"}
                    color={"red"} 
                    size={32} 
                    style={{margin:8, padding:8}}
                />
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    />
            </View>
        );
    }
}