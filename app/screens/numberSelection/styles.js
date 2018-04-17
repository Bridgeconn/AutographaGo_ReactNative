import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export const numberSelectionPageStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({

   container:{
    flex:1,
    flexDirection:'row'
   },
   textStyle: {
        fontSize:sizeFile.fontSize
   },
    sideBarContainer:{
        flexDirection:'column',
        width:width/5,
        backgroundColor:colorFile.sidebarBackground, 
    },
    sideBarIconCustom:{
        alignSelf:'center',
        padding:16,
        color:colorFile.sidebarIconColor
    },
    bookNameContainer:{
        flexDirection:'column',
        width:width*4/5
    },
    segmentCustom:{
        borderColor:'#3F51B5',
        borderBottomWidth:1
    },
    segmentButton:{
        padding: 0,
        height: 45,
        width:width*2/5
    },
    BookList:{
        flexDirection:'row',
        justifyContent:'space-between', 
        paddingHorizontal:16, 
        paddingVertical:12
      },
   IconCustom:{
    // iconColor:colorMode.iconColor
   },
   cardItemStyle:{paddingTop:16,paddingBottom:16}

})
}