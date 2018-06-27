import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const numberSelection =(colorFile, sizeFile) =>{
    return StyleSheet.create({

   container:{
        flex:1,
        flexDirection:'row'
   },
   containerBook:{
        flex:1
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
   chapterSelectionTouchable:{
        flex:0.25,
        borderColor:'black',
        borderRightWidth:1, 
        borderBottomWidth:1,
        height:width/4, 
        justifyContent:"center"
    },
    chapterNum:{
        fontSize:sizeFile.fontSize,
        textAlign:"center",
        alignItems:"center", 
        color:'black'
    },
   cardItemStyle:{
       paddingTop:16,
       paddingBottom:16
    },
    //SELECT BOOK STYLE
    selectBookTouchable:{
        flex:1, 
        borderColor:'black', 
        borderRightWidth:1,
        borderBottomWidth:1, 
        borderLeftWidth:1, 
        justifyContent:"center", 
    },
    bookName:{
        textAlign:"center",alignItems:"center", color:'black', margin:8
    },
    //SelectChapter

    selectGridNum:{
        flex:0.25,
        borderColor:'black',
        borderRightWidth:1, 
        borderBottomWidth:1,
        height:width/4,
        justifyContent:"center"
    },
    selectText:{
        textAlign:"center",
        alignItems:"center", 
        color:'black',
        fontSize:sizeFile.fontSize
    }
    
})
}