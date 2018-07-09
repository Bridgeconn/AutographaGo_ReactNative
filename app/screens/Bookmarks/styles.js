import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const bookStyle=(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor,
    },
    bookmarksView:{
        flexDirection:'row',
        justifyContent: 'space-between',
        margin:16,
        fontSize:sizeFile.fontSize
    },
    bookmarksText:{
        fontSize:sizeFile.fontSize,
        color:colorFile.iconColor
    },
    iconCustom:{
        color:colorFile.textColor,
        fontSize:sizeFile.iconSize
    },
    emptyMessageContainer:{
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
    centerEmptySet: { justifyContent: 'center', alignItems: 'center', height: '100%' }


    })
}
