import {StyleSheet,AsyncStorage} from 'react-native'
import {dimens} from '../../utils/dimens.js'
import {nightColors, dayColors} from '../../utils/colors.js'
import * as AsyncStorageConstant from '../../utils/AsyncStorageConstant'



// export class  getColor {
//      getBackgroundColor(){
//          AsyncStorage.getItem(AsyncStorageConstant.dayModeBackgroundColor, JSON.stringify(value))
//     }
//   }
  
var value =  AsyncStorage.getItem(AsyncStorageConstant.dayModeBackgroundColor);

export const settingsPageStyle = StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:dayColors.backgroundColor 
   }
    
})