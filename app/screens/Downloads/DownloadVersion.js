import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import DownloadUtil from '../../utils/DownloadUtil'
import {Card} from 'native-base'
var RNFS = require('react-native-fs');
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'
import USFMParser from '../../utils/USFMParser'
import {downloadPageStyle} from './styles.js'
import firebase from 'react-native-firebase';
import { Platform } from 'react-native';


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
        }
        
        this.downloadZip = this.downloadZip.bind(this)
        this.readDirectory = this.readDirectory.bind(this)
        this.styles = downloadPageStyle(this.props.screenProps.colorFile, this.props.screenProps.sizeFile);

        
    }

    componentDidMount() {
        this.setState({isLoading:true, isLoadingText: 'GET VERSIONS'}, () => {
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
        this.setState({isLoading:true, isLoadingText: 'GET METADATA'}, () => {
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
        console.log("ntoification id download zip "+this.downloadZip)
        notification = new firebase.notifications.Notification()
        .setNotificationId(curTime)
        .setTitle('Downloading')
        .setBody(this.state.languageName +" Bible downloading" )
        .android.setChannelId('channelId')
        .android.setSmallIcon('ic_launcher')
        .android.ongoing(true)

        firebase.notifications().displayNotification(notification)

        this.downloadMetadata(this.state.languageName, version)
        this.setState({isDownloading:true,isLoading:false, isLoadingText: 'GET ZIP'}, () => {
            RNFS.mkdir(RNFS.DocumentDirectoryPath+'/AutoBibles').then(result => {
                RNFS.downloadFile({
                    fromUrl: 
                        'https://raw.githubusercontent.com/friendsofagape/Autographa_Repo/master/Bibles/'
                        +this.state.languageName+'/'+version+'/Archive.zip', 
                    toFile: RNFS.DocumentDirectoryPath+'/AutoBibles/Archive.zip',
                    begin: this._downloadFileBegin,
                })

                    .promise.then(result => {
                        
                        this.setState({isDownloading:false})
                        ToastAndroid.show(version+' Downloaded', ToastAndroid.CENTER);
                        console.log("result "+JSON.stringify(result))
                        console.log("result jobid = " + result.jobId)
                        console.log("result statuscode = " + result.statusCode)
                        console.log("result byteswritten = " + result.bytesWritten)

                        const sourcePath = RNFS.DocumentDirectoryPath +'/AutoBibles/Archive.zip';
                        const targetPath = RNFS.DocumentDirectoryPath + '/AutoBibles/';
                        this.setState({isLoadingText: 'UNZIP ARCHIVE'})
                        unzip(sourcePath, targetPath)
                            .then((path) => {
                                console.log('unzip completed at ' + path)
                                this.readDirectory(curTime);
                            })
                            .catch((error) => {
                                console.log(error)
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
        this.notif(percentage)
        if(data.contentLength == data.bytesWritten){
        console.log("progress bar full "+percentage)
        }
      }
      

        async startParse(path,lcode,lname,vcode,vname,from) {
        await new USFMParser().parseFile(path,lcode,lname,vcode,vname,from);
    }
       
    readDirectory(notifId) {
        console.log("notification id read directory"+notifId)
        RNFS.readDir(RNFS.DocumentDirectoryPath + '/AutoBibles/')
            .then((result) => {
                for (var i=0; i<result.length; i++) {
                    if (result[i].isFile() && result[i].path.endsWith('.usfm')) {
                        this.setState({isLoadingText: 'USM PARSE ' + result[i].path})
                        this.startParse(result[i].path, 
                            this.state.downloadMetadata.languageCode,
                            this.state.downloadMetadata.languageName,
                            this.state.downloadMetadata.versionCode,
                            this.state.downloadMetadata.versionName,
                            false)
                    }
                }
                console.log("download complete : " + notifId)
                firebase.notifications().removeDeliveredNotification(notifId)
                    .then(()=> console.log("Will never be logged"))
                const notification = new firebase.notifications.Notification()
                    .setNotificationId(Date.now().toString() + "_1")
                    .setTitle('downloaded')
                    .setBody('Tap to start reading '+this.state.languageName +" Bible" )
                    .android.setChannelId('channelId')
                    .android.setSmallIcon('ic_launcher')
        
                firebase.notifications().displayNotification(notification)
            
                // stat the first file
                // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            // .then((statResult) => {
            //     if (statResult[0].isFile()) {
            //         // if we have a file, read it
            //         return RNFS.readFile(statResult[1], 'utf8');
            //     }
            //     return 'no file';
            // })
            // .then((contents) => {
            //     // log the file contents
            //     console.log(contents);
            // })
            .catch((err) => {
                console.log(err.message, err.code);
            });
    }
    
    renderItem = ({item,index})=>{
        return(
            <Card style={this.styles.cardStyle}>
            <TouchableOpacity onPress={() => this.downloadZip(item)} style={this.styles.cardItemStyle}>
                <Text style={this.styles.textStyle}>{item}</Text>
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
                <FlatList
                    data={this.state.downloadVersionList}
                    renderItem={this.renderItem}
                />
            }
            {this.state.isDownloading ? 
                <View style={this.styles.loaderStyle}>
                <Text style={this.styles.textLoader}>
                    Downloading
                </Text>
                <ActivityIndicator
                    animating={this.state.isDownloading} 
                    size="large" 
                    color="#0000ff" /> 

                </View>
             : null}
             <Text style={this.styles.textLoader}>
                 {this.state.isLoadingText}
             </Text>
            </View>
            </View>
        );
    }
}