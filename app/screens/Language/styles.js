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
        // justifyContent:'space-between',
        marginHorizontal:16,
        
    },
    checkIcon:{
        fontSize:sizeFile.iconSize,
        color:colorFile.iconColor,
        position:'absolute',
        right:0
    },
    divider:{
        height:0.2,
        backgroundColor:colorFile.iconColor,
        marginLeft:32,
        marginRight:16,
        marginVertical:8
    },
    buttonCustom:{
        borderRadius: 40, 
        margin:8, 
        position:'absolute', 
        bottom:0, 
        right:0,
        width: 64, 
        height: 64, 
        backgroundColor:colorFile.primaryColor,
        justifyContent:'center'
    },
    buttonContent:{
        alignItems:'center',
        zIndex:2, 
        alignSelf:'center',
        color:colorFile.backgroundColor,
        fontSize: sizeFile.settingsIcon
    },

    })
}
