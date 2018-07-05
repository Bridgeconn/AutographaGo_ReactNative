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
        fontSize:sizeFile.fontSize,
        color:colorFile.textColor
    },
    flatListContainer:{
        justifyContent:'center',
    },
    emptyMessage:{
        fontSize:sizeFile.titleText,
        color:colorFile.textColor,
        textAlign: 'center',
    },
    iconCustom:{
        color:colorFile.textColor,
        fontSize:sizeFile.contentText
    },
    centerEmptySet: { justifyContent: 'center', alignItems: 'center', height: '100%' }

    })
}
