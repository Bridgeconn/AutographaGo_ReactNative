import {StyleSheet} from 'react-native'
import { Icon } from 'native-base';

export const styleFile =(colorMode, sizeMode) =>{
    return StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:colorMode.backgroundColor 
   },
   textStyle: {
        // color: colorMode.accentColor,   
        // fontSize:sizeMode.fontSize
   },
   IconCustom:{
    // iconColor:colorMode.iconColor
   },
   cardItemStyle:{paddingTop:16,paddingBottom:16}

})
}

