import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firebase from 'react-native-firebase';
import Login from './Login';

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
        }
    }

    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
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