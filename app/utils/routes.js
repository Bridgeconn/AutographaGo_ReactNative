// all of our routes

import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'
import Home from '../screens/Home'
import About from '../screens/About'
import Book from '../screens/Book'
import Bookmarks from '../screens/Bookmarks'
import EditNote from '../screens/EditNote'
import Highlights from '../screens/Highlights'
import History from '../screens/History'
import Notes from '../screens/Notes'
import Search from '../screens/Search'
import Settings from '../screens/settings/Settings'
import OpenHints from '../screens/OpenHints'
import {
    AsyncStorage,
} from 'react-native';
const AsyncStorageConstants = require('./AsyncStorageConstants')

const StackNav = StackNavigator(
{
  
	Home: {
    	screen: Home,
  	},
  	About: {
    	screen: About,
  	},
  	Book: {
    	screen: Book,
  	},
  	Bookmarks: {
    	screen: Bookmarks,
  	},
  	EditNote: {
    	screen: EditNote,
  	},
  	Highlights: {
    	screen: Highlights,
  	},
  	History: {
    	screen: History,
  	},
  	Notes: {
    	screen: Notes,
  	},
  	Search: {
    	screen: Search,
  	},
  	Settings: {
		screen: Settings,
	},
	OpenHints: {
    	screen: OpenHints,
  	},
},
{
	navigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#3F51B5'
    },
  }
}

)

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
			colorMode: null,
			sizeMode: null,
        }
    }

    render(){
        return(
            <StackNav screenProps={this.state}/>
        );
    }
    async componentDidMount(){
        try {
            const value = await AsyncStorage.getItem(AsyncStorageConstants.Keys.ColorMode);
            if (value !== null){
                // We have data!!
                console.log(value);
                this.setState({colorMode: value})
            } else {
                this.setState({colorMode: AsyncStorageConstants.Values.DayMode})                
            }
        } catch (error) {
            // Error retrieving data
            this.setState({colorMode: AsyncStorageConstants.Values.DayMode})            
		}
		
		try {
            const value = await AsyncStorage.getItem(AsyncStorageConstants.Keys.SizeMode);
            if (value !== null){
                // We have data!!
                console.log(value);
                this.setState({sizeMode: value})
            } else {
                this.setState({sizeMode: AsyncStorageConstants.Values.SizeModeNormal})                
            }
        } catch (error) {
            // Error retrieving data
            this.setState({sizeMode: AsyncStorageConstants.Values.SizeModeNormal})            
        }
    }
}