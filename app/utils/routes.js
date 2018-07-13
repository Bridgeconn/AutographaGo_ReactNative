// all of our routes
import React, { Component } from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import Home from '../screens/Home/Home'
import About from '../screens/About/About'
import Bookmarks from '../screens/Bookmarks/Bookmarks'
import Highlights from '../screens/Highlights/Highlights'
import History from '../screens/History/History'
import Notes from '../screens/Note/Notes'
import EditNote from '../screens/Note/EditNote'
import Search from '../screens/Search/Search'
import Settings from '../screens/settings/Settings'
import Splash from '../screens/Splash/Splash'
import ReferenceSelection from '../screens/numberSelection/ReferenceSelection'
import ChapterSelection from '../screens/numberSelection/ChapterSelection'
import Hints from '../screens/Hints/Hints'
import Language from '../screens/Language/Language'
import Book from '../screens/book/Book'
import DownloadLanguage from '../screens/Downloads/DownloadLanguage'
import DownloadVersion from '../screens/Downloads/DownloadVersion'

const AsyncStorageConstants = require('./AsyncStorageConstants')
import AsyncStorageUtil from './AsyncStorageUtil';
import {nightColors, dayColors, constColors} from './colors.js'
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from './dimens.js'
import { styleFile } from './styles.js'
import DbQueries from '../utils/dbQueries'
import Realm from 'realm'

const StackNavigate = (styles) => StackNavigator(
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
      Settings: {
        screen: Settings,
      },
      ChapterSelection: {
        screen: ChapterSelection,
        navigationOptions: {
            headerTitle:"Select Chapter"
        }
      },
      ReferenceSelection: {
        screen: ReferenceSelection,
      },
      Hints: {
        screen: Hints,
      },
      Book: {
        screen: Book,
      },
      Language:{
        screen:Language
      },
      DownloadLanguage: {
        screen: DownloadLanguage
      },
      DownloadVersion: {
        screen: DownloadVersion
      },
     
      Search: {
        screen: Search,
      },
  },
  {
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: styles.headerStyle
    }
  }
)

export default class App extends Component {

  constructor(props){
    super(props)
    Realm.copyBundledRealmFiles();
      
    this.state = {
        booksList: [],
        isDbLoading: true,
        languageCode: AsyncStorageConstants.Values.DefLanguageCode,
        versionCode: AsyncStorageConstants.Values.DefVersionCode,
        languageName:AsyncStorageConstants.Values.DefLanguageName,
        versionName:AsyncStorageConstants.Values.DefVersionName,

        colorMode: AsyncStorageConstants.Values.DayMode,
        sizeMode: AsyncStorageConstants.Values.SizeModeNormal,
        colorFile:dayColors,
        sizeFile:mediumFont,
        verseInLine:false,
        lastRead:{}
    }

		this.updateBooks = this.updateBooks.bind(this)
    this.updateSize = this.updateSize.bind(this)
    this.updateColor = this.updateColor.bind(this)
    this.updateVerseInLine = this.updateVerseInLine.bind(this)
    this.changeSizeByOne = this.changeSizeByOne.bind(this)
    this.updateLastRead = this.updateLastRead.bind(this)
    this.updateLanguage  = this.updateLanguage.bind(this)

    this.styles = styleFile(this.state.colorFile,this.state.sizeFile)
    this.StackNav = StackNavigate(this.styles)
    console.log("ALL HEADER COLOR /////// "+JSON.stringify(this.styles))
  }

  updateBooks = (booksList) => {
    this.setState({booksList})
  }

  updateVerseInLine = (verseInLine) =>{
    this.setState({verseInLine})
  }

  updateLastRead = (lastRead) => {
    this.setState({lastRead})
  }

  updateColor = (colorMode, colorFile) => {
    this.setState({colorMode, colorFile})
	}
	
  updateSize = (sizeMode, sizeFile) => {
    this.setState({sizeMode, sizeFile})
  }

  changeSizeByOne = (value) => {
    switch (this.state.sizeMode) {
      case AsyncStorageConstants.Values.SizeModeXSmall : {
        if (value == -1) {
          return
        } else {
          AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, AsyncStorageConstants.Values.SizeModeSmall);    
          this.setState({sizeFile:smallFont, sizeMode: AsyncStorageConstants.Values.SizeModeSmall})
        }
        break;
      } 
      case AsyncStorageConstants.Values.SizeModeSmall : {
        if (value == -1) {
          AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, AsyncStorageConstants.Values.SizeModeXSmall);    
          this.setState({sizeFile:extraSmallFont, sizeMode: AsyncStorageConstants.Values.SizeModeXSmall})          
        } else {
          AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, AsyncStorageConstants.Values.SizeModeNormal);    
          this.setState({sizeFile:mediumFont, sizeMode: AsyncStorageConstants.Values.SizeModeNormal})                    
        }
        break;
      }
      case AsyncStorageConstants.Values.SizeModeNormal : {
        if (value == -1) {
          AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, AsyncStorageConstants.Values.SizeModeSmall);    
          this.setState({sizeFile:smallFont, sizeMode: AsyncStorageConstants.Values.SizeModeSmall})          
        } else {
          AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, AsyncStorageConstants.Values.SizeModeLarge);    
          this.setState({sizeFile:largeFont, sizeMode: AsyncStorageConstants.Values.SizeModeLarge})                    
        }
        break;
      }
      case AsyncStorageConstants.Values.SizeModeLarge : {
        if (value == -1) {
          AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, AsyncStorageConstants.Values.SizeModeNormal);    
          this.setState({sizeFile:mediumFont, sizeMode: AsyncStorageConstants.Values.SizeModeNormal})          
        } else {
          AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, AsyncStorageConstants.Values.SizeModeXLarge);    
          this.setState({sizeFile:extraLargeFont, sizeMode: AsyncStorageConstants.Values.SizeModeXLarge})                    
        }
        break;
      }
      case AsyncStorageConstants.Values.SizeModeXLarge : {
        if (value == -1) {
          AsyncStorageUtil.setItem(AsyncStorageConstants.Keys.SizeMode, AsyncStorageConstants.Values.SizeModeLarge);    
          this.setState({sizeFile:largeFont, sizeMode: AsyncStorageConstants.Values.SizeModeLarge})          
        } else {
          return                   
        }
        break;
      }
    }
  }

  updateLanguage = async(languageCode,languageName,versionCode,versionName) =>{
    console.log("in ROTES update language")
    this.setState({languageCode, languageName,versionCode,versionName})

    let models = await DbQueries.queryBookIdModels(this.state.versionCode, this.state.languageCode);
      console.log("routes len =" + models)
      console.log("VERSE VALUE ++++ " + res[2][1])
      // this.setState({isDbLoading: false})
      if (models && models.length > 0) {
        this.setState({booksList: models})
      }

  }

  render(){
    let  StackNav = this.StackNav
    return(
      <StackNav 
        screenProps={{
          colorMode: this.state.colorMode, 
          sizeMode: parseInt(this.state.sizeMode), 
          colorFile:this.state.colorFile,
          sizeFile:this.state.sizeFile,
          booksList: this.state.booksList, 
          isDbLoading: this.state.isDbLoading,
          verseInLine:this.state.verseInLine,
          languageCode: this.state.languageCode,
          languageName:this.state.languageName, 
          versionCode: this.state.versionCode,
          versionName:this.state.versionName,
          lastRead:this.state.lastRead,

          updateColor: this.updateColor,
          updateSize: this.updateSize,
          updateVerseInLine:this.updateVerseInLine,
          updateBooks: this.updateBooks,
          changeSizeByOne: this.changeSizeByOne,
          updateLastRead: this.updateLastRead,
          updateLanguage: this.updateLanguage
        }}
      />
    );
  }
    
  async componentDidMount(){
    let res = await AsyncStorageUtil.getAllItems([
      AsyncStorageConstants.Keys.ColorMode, 
      AsyncStorageConstants.Keys.SizeMode,
      AsyncStorageConstants.Keys.VerseViewMode,
      // AsyncStorageConstants.Keys.LastReadReference,
      AsyncStorageConstants.Keys.LanguageCode,
      AsyncStorageConstants.Keys.VersionCode,
      AsyncStorageConstants.Keys.LanguageName,
      AsyncStorageConstants.Keys.VersionName
    ])
    
    if (res == null) {
      return
    }
    console.log("ROUTES.... color mode "+res[0][1])
    this.setState({sizeMode: res[1][1] == null ? AsyncStorageConstants.Values.SizeModeNormal : parseInt(res[1][1])}, ()=> {
      switch (this.state.sizeMode) {
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
          console.log("SIZEFILEIS XLLLL...")
          this.setState({sizeFile:extraLargeFont})
          break;
        }
      }
    })

    this.setState({
      colorMode: res[0][1]== null ? AsyncStorageConstants.Values.DayMode : parseInt(res[0][1]),
      colorFile: res[0][1] == null ? dayColors : 
      (parseInt(res[0][1]) == AsyncStorageConstants.Values.DayMode ? dayColors : nightColors),
      verseInLine:  res[2][1] == null ? AsyncStorageConstants.Values.VerseInLine : res[2][1],
      languageCode: res[3][1] == null ? AsyncStorageConstants.Values.DefLanguageCode : res[3][1],
      versionCode:  res[4][1] == null ? AsyncStorageConstants.Values.DefVersionCode : res[4][1],
      languageName: res[5][1] == null ? AsyncStorageConstants.Values.DefLanguageName : res[5][1],
      versionName:  res[6][1] == null ? AsyncStorageConstants.Values.DefVersionName : res[6][1],
    }, async ()=> {

      let models = await DbQueries.queryBookIdModels(this.state.versionCode, this.state.languageCode);
      console.log("routes len =" + models)
      console.log("VERSE VALUE ++++ " + res[2][1])
      this.setState({isDbLoading: false})
      if (models && models.length > 0) {
        this.setState({booksList: models})
      }
    })

    await AsyncStorageUtil.getItem(AsyncStorageConstants.Keys.LastReadReference, AsyncStorageConstants.Values.LastReadReference
      ).then((lastRead) => {
          this.setState({lastRead})
    })
  console.log("DSIDI mount value "+typeof this.state.sizeMode)
  }
}