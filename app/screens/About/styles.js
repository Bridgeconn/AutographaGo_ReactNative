import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const aboutPage =(colorFile, sizeFile) =>{
    return StyleSheet.create({
        textStyle:{
            
                fontSize:sizeFile.contentText,
                color:colorFile.textColor
        }
    })

}