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
        fontSize:sizeFile.fontSize,
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
        borderBottomWidth:1
    },
    segmentButton:{
        padding: 0,
        height: 45,
        width:width*2/5,
        
    },
    bookList:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        paddingHorizontal:16, 
        height:48
      },
    iconCustom:{
        color:colorFile.iconColor
    },
   cardItemStyle:{paddingTop:16,paddingBottom:16},
   

})
}

