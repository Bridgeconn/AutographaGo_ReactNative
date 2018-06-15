import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import DownloadUtil from '../../utils/DownloadUtil'
import {Card} from 'native-base'
var RNFS = require('react-native-fs');
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'
import USFMParser from '../../utils/USFMParser'

export default class DownloadVersion extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Versions',
    });

    constructor(props){
        super(props);
        this.state = {
            downloadData:[],
            isLoading: false,
            refreshing: false,
            languageName: this.props.navigation.state.params.languageName,
            isDownloading: false,
        }
        this.downloadZip = this.downloadZip.bind(this)
        this.readDirectory = this.readDirectory.bind(this)
    }

    componentDidMount() {
        this.setState({isLoading:true}, () => {
            DownloadUtil.getVersions(this.state.languageName)
            .then(res => {
                console.log("res = " + JSON.stringify(res))
                console.log("len = " + res.list_of_versions_available.length)
                this.setState({isLoading: false, refreshing: false, downloadData: res.list_of_versions_available})
            })
            .catch(error => {
                console.log("error in fetch " + error);
                this.setState({isLoading: false, refreshing: false})
            });
        })
    }

    downloadZip(version) {
        this.setState({isDownloading:true}, () => {
            RNFS.mkdir(RNFS.DocumentDirectoryPath+'/AutoBibles').then(result => {
                RNFS.downloadFile({
                    fromUrl: 
                        'https://raw.githubusercontent.com/friendsofagape/Autographa_Repo/master/Bibles/'
                        +this.state.languageName+'/'+version+'/Archive.zip', 
                    toFile: RNFS.DocumentDirectoryPath+'/AutoBibles/Archive.zip'})
                    .promise.then(result => {
                        this.setState({isDownloading:false})
                        console.log("result jobid = " + result.jobId);
                        console.log("result statuscode = " + result.statusCode);
                        console.log("result byteswritten = " + result.bytesWritten);

                        const sourcePath = RNFS.DocumentDirectoryPath +'/AutoBibles/Archive.zip';
                        const targetPath = RNFS.DocumentDirectoryPath + '/AutoBibles/';
                        unzip(sourcePath, targetPath)
                            .then((path) => {
                                console.log('unzip completed at ' + path)
                                this.readDirectory();
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                });
            });
            
        })
    }

    readDirectory() {
        RNFS.readDir(RNFS.DocumentDirectoryPath + '/AutoBibles/')
            .then((result) => {
                console.log('GOT RESULT', result);

                // stat the first file
                return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((statResult) => {
                if (statResult[0].isFile()) {
                // if we have a file, read it
                return RNFS.readFile(statResult[1], 'utf8');
                }

                return 'no file';
            })
            .then((contents) => {
                // log the file contents
                console.log(contents);
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
    }
    
    renderItem = ({item,index})=>{
        return(
            <Card style={{padding:8}}>
            <TouchableOpacity onPress={() => this.downloadZip(item)} >
                <Text >{item}</Text>
            </TouchableOpacity>
            </Card>
        )
    }

    render() {
        return (
            <View style={{flex:1,margin:8}}>
            {this.state.isLoading ? 
                <ActivityIndicator
                    animating={this.state.isLoading} 
                    size="large" 
                    color="#0000ff" /> 
                    :
                <FlatList
                    data={this.state.downloadData}
                    renderItem={this.renderItem}
                />
            }
            {this.state.isDownloading ? 
                <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Text>
                    Downloading
                </Text>
                <ActivityIndicator
                    animating={this.state.isDownloading} 
                    size="large" 
                    color="#0000ff" /> 

                </View>
             : null}
            </View>
        );
    }
}