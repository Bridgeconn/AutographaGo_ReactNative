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

export default class DownloadBible extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Downloads',
    });

    constructor(props){
        super(props);
        this.state = {
            downloadData:[],
            isLoading: false,
            refreshing: false,
        }
    }

    componentDidMount() {
        this.setState({isLoading:true}, () => {
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
            <Card style={{padding:8}}>
            <TouchableOpacity  >
                    <Text >{item}</Text>
            </TouchableOpacity>
            </Card>
        )
    }

    render() {
        return (
            <View style={{flex:1,margin:8}}>
                <FlatList
                    data={this.state.downloadData}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}