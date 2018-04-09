// all of our routes

import React, { Component } from 'react'
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
const AsyncStorageConstants = require('./AsyncStorageConstants')
import AsyncStorageUtil from './AsyncStorageUtil';

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
        console.log('in routes'+this.props)
        this.state = {
			colorMode: null,
			sizeMode: null,
        }
		this.updateColorMode = this.updateColorMode.bind(this)
		this.updateSizeMode = this.updateSizeMode.bind(this)
    }

    updateColorMode = (colorMode) => {
		this.setState({colorMode})
	}
	
	updateSizeMode = (sizeMode) => {
		this.setState({sizeMode})
    }

    render(){
        return(
			<StackNav screenProps={{colorMode: this.state.colorMode, sizeMode: this.state.sizeMode,
				updateColor: this.updateColorMode, updateSize: this.updateSizeMode }}/>
        );
    }
    
    async componentDidMount(){
        const colorMode = await AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.ColorMode, AsyncStorageConstants.Values.DayMode);
        this.setState({colorMode});

        const sizeMode = await AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.SizeMode, AsyncStorageConstants.Values.SizeModeNormal);
		this.setState({sizeMode})
    }
}