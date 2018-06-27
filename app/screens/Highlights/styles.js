import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const highlightstyle=(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
    },
    highlightsView:{
        flexDirection:'row',
        justifyContent: 'space-between',
        margin:16,
        fontSize:sizeFile.fontSize
    },
    hightlightsText:{
        fontSize:sizeFile.fontSize
    }

    })
}
