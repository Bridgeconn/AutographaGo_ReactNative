import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import colorConstants from '../../utils/colorConstants.js'

export const homePageStyle =(colorFile, sizeFile,activeTab) =>{
    console.log("style active color "+activeTab)
    return StyleSheet.create({
   container:{
    flex:1,
    flexDirection:'row'
   },
    textStyle: {
        fontSize:sizeFile.titleText,
        color:colorFile.textColor,
        justifyContent:'center'
   },
    sideBarContainer:{
        flexDirection:'column',
        width:width/5,
        backgroundColor:colorConstants.Black
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
    segmentCustom:{
        borderColor:'#3F51B5',
        borderWidth:0.5,
        backgroundColor:activeTab ?  "#fff" : "#3F51B5"
       
    },
    segmentButton1:{
        padding:4,
        height: 45,
        width:width*2/5,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#3F51B5',
        backgroundColor:activeTab ?  "#3F51B5":"#fff"

    },
    segmentButton2:{
        padding:4,
        height: 45,
        width:width*2/5,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#3F51B5',
        backgroundColor:activeTab ?  "#fff" : "#3F51B5"
    },

    tabText:{
        color:colorFile.textColor,
        fontSize:sizeFile.contentText,
        color:activeTab ? "#fff" : "#3F51B5",
        
    },
    bookList:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        paddingHorizontal:16, 
        height:48
      },
    iconCustom:{
        color:colorFile.iconColor,
        fontSize:sizeFile.iconSize
    },
   cardItemStyle:{paddingTop:16,paddingBottom:16},
})
}

