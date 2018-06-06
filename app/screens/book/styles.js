import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import colorConstants from '../../utils/colorConstants.js'

export const styles =(colorFile, sizeFile) =>{
    return StyleSheet.create({
        
        container: {
            flex: 1,
            width:width,
            height:height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        headerBookmarkIcon: {
            marginHorizontal:8
        },
        chapterList: {
            marginLeft:16, 
            marginRight:16
        },
        verseWrapperText: {
            lineHeight:26, 
            textAlign:'justify'
        },
        recyclerListView: {
            flex:1, 
            width:width, 
            height:height
        },
        bottomBar: {
            backgroundColor:'blue', 
            height:64, 
            width:'100%', 
            flexDirection:'row', 
            justifyContent:'space-evenly', 
            alignItems:'center', 
            marginTop:4
        },
        bottomOption: {
            flexDirection:'row', 
            alignItems:'center', 
            justifyContent:'center'
        },
        bottomOptionText: {
            color:'white'
        },
        bottomOptionIcon: {
            marginHorizontal:8
        },
        bottomOptionSeparator: {
            width:1, 
            height:48, 
            backgroundColor:'white'
        },
        verseChapterNumber: {
            fontSize:26
        },
        verseNumber: {
            fontSize:10
        },
        verseTextSelectedHighlighted: {
            fontSize: sizeFile.verseText, 
            textDecorationLine: 'underline',
            backgroundColor: 'yellow' 
        },
        verseTextSelectedNotHighlighted: {
            fontSize: sizeFile.verseText, 
            textDecorationLine: 'underline',
            backgroundColor: 'transparent' 
        },
        verseTextNotSelectedHighlighted: {
            fontSize: sizeFile.verseText, 
            textDecorationLine: 'none',
            backgroundColor: 'yellow' 
        },
        verseTextNotSelectedNotHighlighted: {
            fontSize: sizeFile.verseText, 
            textDecorationLine: 'none',
            backgroundColor: 'transparent' 
        },
        paragraphText: {
            fontSize: 16
        },
        headingOne: {
            fontSize: 24
        },
        headingTwo: {
            fontSize: 22
        },
        headingThree: {
            fontSize: 20
        },
        headingFour: {
            fontSize: 18
        },

        textStyle: {
            fontSize:sizeFile.fontSize,
            color:colorFile.textColor,
            justifyContent:'center'
        },
        sideBarIconCustom:{
            alignSelf:'center',
            padding:16,
            color:colorConstants.White
        },
        bookNameContainer:{
            flexDirection:'column',
            width:width*4/5,
            backgroundColor:colorFile.backgroundColor
        },
    })
}