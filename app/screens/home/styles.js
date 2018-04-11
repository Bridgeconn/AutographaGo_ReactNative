import {StyleSheet} from 'react-native'
import { Icon } from 'native-base';

export const homePageStyle =(colorMode, sizeMode) =>{
    return StyleSheet.create({
   container:{
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

