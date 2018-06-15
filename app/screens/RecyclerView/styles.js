import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const recycleViewStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
    },
    bottomBar:{
        backgroundColor:'blue', 
        height:64, 
        width:'100%', 
        flexDirection:'row', 
        justifyContent:'space-evenly', 
        alignItems:'center', 
        marginTop:4 
    },
    row:{
        flexDirection:'row',
        alignItems:'center', 
        justifyContent:'center'
    },
    iconMargin:{
        marginHorizontal:8
    },
    rowItem:{
        width:1, 
        height:48, 
        backgroundColor:'white'
    },
   listStyle:{
    marginLeft:16, marginRight:16
   },
   listData:{
    lineHeight:26, textAlign:'justify'
   },
   listText:{
       marginLeft:16, 
       marginRight:16,
    },
    textIntoText:{
        lineHeight:26, 
        textAlign:'justify',
    }
    
    })
}
