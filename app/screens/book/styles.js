import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    verseWrapperText:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor
    },
    chapterList:{
        margin:16
    },
    footerComponent:{
        height:64,
        marginBottom:4
    },
    bottomBar:{
        position:'absolute', 
        bottom:0,
        width: width, 
        height: 62, 
        backgroundColor:'#3F51B5',
        flexDirection:'row',
        justifyContent:'center'

    },
    bottomOption:{
        flexDirection:'row',
        width:width/3,
        justifyContent:'center',
        alignItems:'center',
       
    },
    bottomOptionText:{
        textAlign:'center',
        color:colorFile.backgroundColor,   
        fontSize:sizeFile.bottomBarText 

    },
    bottomOptionIcon:{
        alignSelf:'center',
        color:colorFile.backgroundColor,   
        fontSize:sizeFile.iconSize 
    },
    bottomOptionSeparator:{
        width: 1,
        backgroundColor:'white',
        marginVertical:8,
        
    },
    VerseText:{
    },
    bottomBarPrevView:{
        borderRadius: 40, 
        margin:8, 
        position:'absolute', 
        bottom:0, 
        left:0,
        width: 64, 
        height: 64, 
        // backgroundColor: colorFile.backgroundColor,
        backgroundColor:colorFile.semiTransparentBackground,
        justifyContent:'center'
    },
    bottomBarNextView:{
        borderRadius: 40, 
        margin:8, 
        position:'absolute', 
        bottom:0, 
        right:0,
        width: 64, 
        height: 64, 
        backgroundColor:colorFile.semiTransparentBackground,
        justifyContent:'center'
    },
    bottomBarChevrontIcon:{ 
        alignItems:'center',
        zIndex:2, 
        alignSelf:'center',
        color:colorFile.chevronIconColor,
        fontSize: sizeFile.chevronIconSize
    },
    verseNumber:{
        fontSize:sizeFile.contentText
    },
    verseChapterNumber:{
        fontSize:sizeFile.titleText,
        fontWeight:'bold'
    },
    verseTextSelectedHighlighted:{
        backgroundColor:'yellow',
        textDecorationLine: 'underline',
        
    },
    verseTextNotSelectedNotHighlighted:{

    },
    verseTextNotSelectedHighlighted:{
        backgroundColor:'yellow'
    },
    verseTextSelectedNotHighlighted:{
        textDecorationLine: 'underline',
    },
    addToSharefooterComponent:{

    }

   

    })
}
