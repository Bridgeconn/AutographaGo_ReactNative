import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  NetInfo
} from 'react-native';
import DownloadUtil from '../../utils/DownloadUtil'
import {Card, CardItem} from 'native-base'
var RNFS = require('react-native-fs');
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'
import USFMParser from '../../utils/USFMParser'
import {downloadPageStyle} from './styles.js'
import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default class DownloadVersion extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Versions',
    });

    constructor(props){
        super(props);
        this.state = {
            downloadVersionList:[],
            isLoading: false,
            refreshing: false,
            languageName: this.props.navigation.state.params.languageName,
            isDownloading: false,
            downloadMetadata: {},
            isLoadingText: '',
            isConnected:false
        }
        
        this.downloadZip = this.downloadZip.bind(this)
        this.readDirectory = this.readDirectory.bind(this)
        this.styles = downloadPageStyle(this.props.screenProps.colorFile, this.props.screenProps.sizeFile);

        
    }

    componentDidMount() {
        this.downloadBibleVer()
    }
    downloadBibleVer(){
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log("connected")
            if(isConnected){
            this.setState({isConnected:true})
            }
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
          });

          this.setState({isLoading:true}, () => {
            DownloadUtil.getVersions(this.state.languageName)
            .then(res => {
                console.log("res = " + JSON.stringify(res))
                console.log("len = " + res.list_of_versions_available.length)
                this.setState({isLoading: false, refreshing: false, downloadVersionList: res.list_of_versions_available})
            })
            .catch(error => {
                console.log("error in fetch " + error);
                this.setState({isLoading: false, refreshing: false})
            });
        })
          
    }

    downloadMetadata(language, version) {
        this.setState({isLoading:true}, () => {
            DownloadUtil.getMetadata(language, version)
            .then(res => {
                console.log("res = " + JSON.stringify(res))
                this.setState({isLoading: false, refreshing: false, downloadMetadata: res.meta_data})
            })
            .catch(error => {
                console.log("error in fetch " + error);
                this.setState({isLoading: false, refreshing: false})
            });
        })
    }

    downloadZip(version) {
        const curTime = Date.now().toString() + "_1"
        console.log("notification "+curTime)
        notification = new firebase.notifications.Notification()
            .setNotificationId(curTime)
            .setTitle('Downloading')
            .setBody(this.state.languageName +" Bible downloading" )
            .android.setChannelId('download_channel')
            .android.setSmallIcon('ic_launcher')
            .android.setOngoing(true)

        firebase.notifications().displayNotification(notification)

        this.downloadMetadata(this.state.languageName, version)
        this.setState({isDownloading:true,isLoading:false, isLoadingText: 'DOWNLOAD BIBLE'}, () => {
            RNFS.mkdir(RNFS.DocumentDirectoryPath+'/AutoBibles').then(result => {
                RNFS.downloadFile({
                    fromUrl: 
                        'https://raw.githubusercontent.com/friendsofagape/Autographa_Repo/master/Bibles/'
                        +this.state.languageName+'/'+version+'/Archive.zip', 
                    toFile: RNFS.DocumentDirectoryPath+'/AutoBibles/Archive.zip',
                    begin: this._downloadFileBegin,
                    progress: this._downloadFileProgress,
                })
                    .promise.then(result => {
                        
                        // this.setState({isDownloading:false})
                        // ToastAndroid.show(version+' Downloaded', ToastAndroid.CENTER);
                        console.log("result "+JSON.stringify(result))
                        console.log("result jobid = " + result.jobId)
                        console.log("result statuscode = " + result.statusCode)
                        console.log("result byteswritten = " + result.bytesWritten)

                        const sourcePath = RNFS.DocumentDirectoryPath +'/AutoBibles/Archive.zip';
                        const targetPath = RNFS.DocumentDirectoryPath + '/AutoBibles/';
                        unzip(sourcePath, targetPath)
                            .then((path) => {
                                console.log('unzip completed at ' + path)
                                this.readDirectory(curTime);
                            })
                            .catch((error) => {
                                console.log(error)
                                // show alert
                                console.log("alert coming")
                            Alert.alert("Something went wrong. Please try again")
                                // delete floder
                            RNFS.unlink(RNFS.DocumentDirectoryPath + '/AutoBibles/')
                                // remove notification
                            firebase.notifications().removeDeliveredNotification(curTime)
                            })
                });
            });
           
        })

    }

    _downloadFileBegin = () =>{
        console.log("Download Begin");
      }
      
      _downloadFileProgress = (data) =>{
        console.log("data byte "+data.bytesWritten +"content length "+data.contentLength) 
        const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
        console.log("progress bar "+percentage)
        this.setState({isLoadingText: 'Downloading ' + percentage + '%'})
        // this.notif(percentage)
        if(data.contentLength == data.bytesWritten){
        console.log("progress bar full "+percentage)
        }
      }
      

    async startParse(path,lcode,lname,vcode,vname, src,lic,year, from) {
        await new USFMParser().parseFile(path,lcode,lname,vcode,vname,src,lic,year,from);
    }
       
    async readDirectory(notifId) {
        console.log("notification id read directory"+notifId)
        RNFS.readDir(RNFS.DocumentDirectoryPath + '/AutoBibles/')
            .then( async (result) => {
                var messageTitle = "";
                var messageBody = "";
                if (this.state.downloadMetadata.languageCode == null || 
                        this.state.downloadMetadata.languageName == null || 
                        this.state.downloadMetadata.versionCode == null || 
                        this.state.downloadMetadata.versionName == null) {
                    messageTitle = "Error";
                    messageBody = "There is some error in downloading, please try again.";
                } else {
                    for (var i=0; i<result.length; i++) {
                        if (result[i].isFile() && result[i].path.endsWith('.usfm')) {
                            await this.startParse(result[i].path, 
                                this.state.downloadMetadata.languageCode,
                                this.state.downloadMetadata.languageName,
                                this.state.downloadMetadata.versionCode,
                                this.state.downloadMetadata.versionName,
                                this.state.downloadMetadata.source,
                                this.state.downloadMetadata.license,
                                this.state.downloadMetadata.year,
                                false)
                        }
                    }
                    messageTitle = "DOWNLOADS";
                    messageBody = this.state.downloadMetadata.languageName + " " + this.state.downloadMetadata.versionName +" Bible download finished.";

                    const notification = new firebase.notifications.Notification()
                        .setNotificationId(Date.now().toString() + "_1")
                        .setTitle('Download finished')
                        .setBody('Tap to start reading '+this.state.languageName +" Bible" )
                        .android.setChannelId('download_channel')
                        .android.setSmallIcon('ic_launcher')
            
                    firebase.notifications().displayNotification(notification)
                }
                RNFS.unlink(RNFS.DocumentDirectoryPath + '/AutoBibles/')

                Alert.alert(messageTitle, messageBody)

                this.setState({isLoading: false, isDownloading:false, isLoadingText:''})
                firebase.notifications().removeDeliveredNotification(notifId)
            })
            .catch((err) => {
                console.log(err.message, err.code);
                Alert.alert("Something went wrong. Please try again")
                // delete floder
                RNFS.unlink(RNFS.DocumentDirectoryPath + '/AutoBibles/')
                // remove notification
                firebase.notifications().removeDeliveredNotification(notifId)
            });
    }
    
    renderItem = ({item,index})=>{
        return(
            <Card style={this.styles.cardStyle}>
                <TouchableOpacity onPress={() => this.downloadZip(item)} >
                    <CardItem style={this.styles.cardItemStyle}>
                        <Text style={this.styles.textStyle}>{item}</Text>
                    </CardItem>
                </TouchableOpacity>
            </Card>
        )
    }

    render() {
        return (
            <View style={this.styles.container}>
            <View style={this.styles.containerMargin}>
            {this.state.isLoading ? 
                <ActivityIndicator
                    animating={this.state.isLoading} 
                    size="large" 
                    color="#0000ff" /> 
                    :
                    !this.state.isConnected && this.state.downloadVersionList.length == 0 ?
                    <TouchableOpacity onPress={()=>this.downloadBibleVer()} style={this.styles.emptyMessageContainer}>
                        <Icon name="signal-wifi-off" style={this.styles.emptyMessageIcon}/>
                        <Text style={this.styles.messageEmpty}>
                            No Internet Connection
                        </Text>
                    </TouchableOpacity>
                    :
                <FlatList
                    data={this.state.downloadVersionList}
                    renderItem={this.renderItem}
                />
            }
            {this.state.isDownloading ? 
                <View style={this.styles.loaderStyle}>
                <Text style={this.styles.textLoader}>
                    {this.state.isLoadingText}
                </Text>
                <ActivityIndicator
                    animating={this.state.isDownloading} 
                    size="large" 
                    color="#0000ff" /> 

                </View>
             : null}
            </View>
            </View>
        );
    }
}