import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const languageStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
    },
    LanguageHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:8
    },
    headerText:{
        fontSize:sizeFile.fontSize
    }


    })
}
