import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import colorConstants from '../../utils/colorConstants.js'

export const homePageStyle =(colorFile, sizeFile) =>{
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
   headerRightText:{
    color:"#fff",
    margin:16
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
  
    segmentButton:{
        padding:4,
        height: 45,
        width:width*2/5,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#3F51B5',
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

