import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const historyStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    historyHeader:{
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
    emptyPage:{
        textAlign:'center'
    },
    iconCustom:{
        fontSize:sizeFile.iconSize,
        color:colorFile.iconColor
    }
    })
}
