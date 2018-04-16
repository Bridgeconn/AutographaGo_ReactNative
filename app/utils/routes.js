// all of our routes

import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import Home from '../screens/home/Home'
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
import {nightColors, dayColors} from './colors.js'
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from './dimens.js'
import { styleFile } from './styles.js'
import Realm from 'realm'

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

        Realm.copyBundledRealmFiles();

      this.state = {
			colorMode: AsyncStorageConstants.Values.DayMode,
			sizeMode: AsyncStorageConstants.Values.SizeModeNormal,
      colorFile:dayColors,
      sizeFile:mediumFont
    }
    
    this.updateSize = this.updateSize.bind(this)
    this.updateColor = this.updateColor.bind(this)

    }

    updateColor = (colorMode, colorFile) => {
		this.setState({colorMode, colorFile})
	}
	
	  updateSize = (sizeMode, sizeFile) => {
		this.setState({sizeMode, sizeFile})
    }

    
      
    render(){
        return(
          <StackNav 
            screenProps={{
              colorMode: this.state.colorMode, 
              sizeMode: this.state.sizeMode, 
              colorFile:this.state.colorFile,
              sizeFile:this.state.sizeFile,
              updateColor: this.updateColor,
              updateSize: this.updateSize
            }}
          />
        );
    }
    
    async componentDidMount(){
        await AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.ColorMode, AsyncStorageConstants.Values.DayMode).then((colorMode) => {
          this.setState({colorMode})
          var colorFile = this.state.colorMode == 1 ? dayColors : nightColors 
          this.setState({colorFile})
        })
        await AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.SizeMode, 
          AsyncStorageConstants.Values.SizeModeNormal).then((sizeMode) => {
          this.setState({sizeMode})
          switch (sizeMode) {
            case  AsyncStorageConstants.Values.SizeModeXSmall : {
              this.setState({sizeFile:extraSmallFont})
              break;
            } 
            case  AsyncStorageConstants.Values.SizeModeSmall : {
              this.setState({sizeFile:smallFont})
              break;
            }
            case AsyncStorageConstants.Values.SizeModeNormal : {
              this.setState({sizeFile:mediumFont})
              break;
            }
            case AsyncStorageConstants.Values.SizeModeLarge : {
              this.setState({sizeFile:largeFont})
              break;
            }
            case AsyncStorageConstants.Values.SizeModeXLarge : {
              this.setState({sizeFile:extraLargeFont})
              break;
            }
          }
        })

    }
}