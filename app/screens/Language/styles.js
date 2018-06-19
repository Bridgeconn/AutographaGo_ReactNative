import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const historyStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
    },
    historyHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:8
    },
    headerText:{
        fontSize:sizeFile.fontSize
    }


    })
}
