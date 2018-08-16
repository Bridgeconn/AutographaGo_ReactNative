import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  NetInfo
} from 'react-native';
import DownloadUtil from '../../utils/DownloadUtil'
import {Card,CardItem} from 'native-base'
import {downloadPageStyle} from './styles.js'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class DownloadLanguage extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Languages',
    });

    constructor(props){
        super(props);
        this.state = {
            downloadData:[],
            isLoading: false,
            refreshing: false,
            isConnected:false
        }
        this.styles = downloadPageStyle(this.props.screenProps.colorFile, this.props.screenProps.sizeFile);
    }

    componentDidMount() {
     this.downloadBible()
    }
    downloadBible(){
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log("connected")
            if(isConnected){
            this.setState({isConnected:true})
            }
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
          });
        
        this.setState({isLoading:true},() => {
            DownloadUtil.getLanguages()
            .then(res => {
                console.log("res = " + JSON.stringify(res))
                console.log("len = " + res.languages_available.length)
                this.setState({isLoading: false, refreshing: false, downloadData: res.languages_available})
            })
            .catch(error => {
                console.log("error in fetch " + error);
                this.setState({isLoading: false, refreshing: false})
            });
        })
    }
    renderItem = ({item,index})=>{
        return(
            <Card style={this.styles.cardStyle}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('DownloadVersion', {languageName: item})}>
                    <CardItem  style={this.styles.cardItemStyle}>
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
                    :  !this.state.isConnected && this.state.downloadData.length == 0 ? 
                    <TouchableOpacity onPress={()=>this.downloadBible()} style={this.styles.emptyMessageContainer}>
                        <Icon name="signal-wifi-off" style={this.styles.emptyMessageIcon}/>
                        <Text style={this.styles.messageEmpty}>
                            No Internet Connection
                        </Text>
                    </TouchableOpacity>
                    :
                <FlatList
                    data={this.state.downloadData}
                    renderItem={this.renderItem}
                />
                }
            </View>
            </View>
        );
    }
}