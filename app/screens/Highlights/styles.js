import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

export const highlightstyle=(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor,
    },
    highlightsView:{
        flexDirection:'row',
        justifyContent: 'space-between',
        margin:16,
        fontSize:sizeFile.fontSize
    },
    hightlightsText:{
        fontSize:sizeFile.titleText,
        color:colorFile.textColor
    },
    flatListContainer:{
        justifyContent:'center',
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
   
    iconCustom:{
        color:colorFile.textColor,
        fontSize:sizeFile.emptyIconSize
    },
    centerEmptySet: { justifyContent: 'center', alignItems: 'center', height: '100%' }

    })
}
