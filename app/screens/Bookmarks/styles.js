import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const bookStyle=(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
    },
    bookmarksView:{
        flexDirection:'row',
        justifyContent: 'space-between',
        margin:16,
        fontSize:sizeFile.fontSize
    },
    bookmarksText:{
        fontSize:sizeFile.fontSize
    }


    })
}
