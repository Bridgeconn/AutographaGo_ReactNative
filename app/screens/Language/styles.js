import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const languageStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    
    LanguageHeader:{
        flexDirection:"row",
        marginHorizontal:8,
        // justifyContent:'space-between'
    },
    headerText:{
        padding:8,
        fontSize:sizeFile.titleText,
        color:colorFile.textColor
    },
    iconCustom:{
        fontSize:sizeFile.iconSize,
        color:colorFile.iconColor,
        // padding:4
        position:'absolute',
        right:0,
        alignSelf:'center'
    },
    contentText:{
        padding:8,
        fontSize:sizeFile.contentText,
        color:colorFile.textColor,
    },
    VersionView:{
        flexDirection:"row",
        // justifyContent:'center',
        marginHorizontal:16,
        
    },
    checkIcon:{
        fontSize:sizeFile.iconSize,
        color:colorFile.iconColor,
        position:'absolute',
        right:0,
        alignSelf:'center'
    },
    divider:{
        height:0.2,
        backgroundColor:colorFile.iconColor,
        marginLeft:24,
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
        backgroundColor:colorFile.buttonBackgroundColor,
        justifyContent:'center'
    },
    buttonContent:{
        alignItems:'center',
        zIndex:2, 
        alignSelf:'center',
        color:colorFile.buttonColor,
        fontSize:sizeFile.settingsIcon
    },

    })
}
