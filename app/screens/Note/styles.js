import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const NoteStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
    },
    noteCardItem:{justifyContent:'space-between', alignItems:'center',marginTop:16, flexDirection:'row'}
  
})
}

