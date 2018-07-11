import {StyleSheet} from 'react-native'
import { Icon } from 'native-base';

export const styleFile =(colorMode, sizeMode) =>{
    return StyleSheet.create({
       
        HistoryHeader:{ 
            flexDirection:"row",
            alignItems:'center',
            justifyContent:'center',
            marginHorizontal:16
        },
        
        headerStyle:{
            backgroundColor:"#3F51B5"
        }
})
}