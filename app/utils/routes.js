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
import Settings from '../screens/Settings'


export const stackNav = StackNavigator(
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