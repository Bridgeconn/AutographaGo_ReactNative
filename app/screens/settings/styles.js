import {StyleSheet} from 'react-native'

export const settingsPageStyle =(colorMode, sizeMode) =>{
    return StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:colorMode.backgroundColor 
   },
   textStyle: {
       fontSize: 30,
        color: colorMode.accentColor,   
   }
})}
