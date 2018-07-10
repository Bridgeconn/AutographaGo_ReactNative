import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const languageStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    headerContainer:{
        margin:8
    },
    LanguageHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:8
    },
    headerText:{
        fontSize:sizeFile.titleText,
        color:colorFile.textColor
    },
    contentText:{
        marginHorizontal:16,
        marginVertical:4,
        fontSize:sizeFile.contentText,
        color:colorFile.textColor
    },
    iconCustom:{
        fontSize:sizeFile.iconSize,
        color:colorFile.iconColor
    },
    VersionView:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginHorizontal:16
    },
    checkIcon:{
        fontSize:sizeFile.iconSize,
        color:colorFile.iconColor
    }
    })
}
