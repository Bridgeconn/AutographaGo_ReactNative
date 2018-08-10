import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const historyStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor,
        
    },
    historyHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:8
    },
    accordionHeaderText:{
        fontSize:sizeFile.titleText,
        color:colorFile.textColor
    },
    contentText:{
        marginHorizontal:16,
        marginVertical:4,
        fontSize:sizeFile.contentText,
        color:colorFile.textColor
    },
    emptyMessageContainer:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    messageEmpty:{
        fontSize:sizeFile.titleText,
        color:colorFile.textColor,
        // textAlign:'center',
    },
    emptyMessageIcon:{
        fontSize:sizeFile.emptyIconSize,
        margin:16,
        color:colorFile.iconColor,
    },
    iconCustom:{
        fontSize:sizeFile.iconSize,
        color:colorFile.iconColor
    }

    })
}
