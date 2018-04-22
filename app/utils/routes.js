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
import Splash from '../screens/Splash'
import NumberSelection from '../screens/numberSelection/NumberSelection'
const AsyncStorageConstants = require('./AsyncStorageConstants')
import AsyncStorageUtil from './AsyncStorageUtil';
import {nightColors, dayColors} from './colors.js'
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from './dimens.js'
import { styleFile } from './styles.js'
import BookIdModel from '../models/BookIdModel'

const StackNav = StackNavigator(
{  
  Splash: {
    screen: Splash,
  },
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
    NumberSelection: {
      screen: NumberSelection,
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
        // console.log('in routes'+this.props)
      this.state = {
			colorMode: null,
			sizeMode: null,
      colorFile:null,
      books: null,
      // booksData: BookIdModel[],
		}
		// this.colorFile = this.state.colorMode == AsyncStorageConstants.Values.DayMode
    //   	? dayColors
    //   	: nightColors;

    // var sizeFile;
    // switch(this.props.screenProps.sizeMode) {
    //   case AsyncStorageConstants.Values.SizeModeXSmall: {
    //     sizeFile = extraSmallFont;
    //     break;
    //   }
    //   case AsyncStorageConstants.Values.SizeModeSmall: {
    //     sizeFile = smallFont;
    //     break;
    //   }
    //   case AsyncStorageConstants.Values.SizeModeNormal: {
    //     sizeFile = mediumFont;
    //     break;
    //   }
    //   case AsyncStorageConstants.Values.SizeModeLarge: {
    //     sizeFile = largeFont;
    //     break;
    //   }
    //   case AsyncStorageConstants.Values.SizeModeXLarge: {
    //     sizeFile = extraLargeFont;
    //     break;
    //   }
    // }

    // this.styleFile = settingsPageStyle(this.colorFile);
		this.updateColorMode = this.updateColorMode.bind(this)
    this.updateSizeMode = this.updateSizeMode.bind(this)
    this.updateColorFile = this.updateColorFile.bind(this)
    this.updateBooks = this.updateBooks.bind(this)
    }

    updateColorMode = (colorMode) => {
		this.setState({colorMode})
	}
	
	  updateSizeMode = (sizeMode) => {
		this.setState({sizeMode})
    }

    updateColorFile = (colorFile) => {
      this.setState({colorFile})
      console.log("update color"+colorFile)
      }

      updateBooks = (books) => {
        this.setState({books})
      }

    render(){
      return(
        <StackNav screenProps={{colorMode: this.state.colorMode, sizeMode: this.state.sizeMode, 
          colorFile:this.state.colorFile, books: this.state.books,
          updateColor: this.updateColorMode, updateSize: this.updateSizeMode ,
          updateColorFile:this.updateColorFile, updateBooks: this.updateBooks }}/>
      );
    }
    
    async componentDidMount(){
        const colorMode = await AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.ColorMode, AsyncStorageConstants.Values.DayMode);
        this.setState({colorMode});

        const sizeMode = await AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.SizeMode, AsyncStorageConstants.Values.SizeModeNormal);
		    this.setState({sizeMode})

		    colorFile = this.state.colorMode == AsyncStorageConstants.Values.DayMode
      	? dayColors
        : nightColors;
        this.setState({colorFile})
        console.log('day or night color '+JSON.stringify(colorFile))


    }
}