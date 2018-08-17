import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import DownloadUtil from '../../utils/DownloadUtil'
import {Card, CardItem} from 'native-base'
import {downloadPageStyle} from './styles.js'

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
        }
        this.styles = downloadPageStyle(this.props.screenProps.colorFile, this.props.screenProps.sizeFile);
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
            <Card style={this.styles.cardStyle}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('DownloadVersion', {languageName: item})} >
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