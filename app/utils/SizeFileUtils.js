
import {extraSmallFont,smallFont,mediumFont,largeFont,extraLargeFont} from './dimens.js'
import { nightColors, dayColors } from './colors.js';
const AsyncStorageConstants = require('./AsyncStorageConstants')

       
export default class  SizeFileUtils {
  onSizeFileChange(value){
    console.log("pressed"+value)
    switch (value) {
      case  AsyncStorageConstants.Values.SizeModeXSmall : {
        console.log("switch case value")
         extraSmallFont
        break;
      } 
      case  AsyncStorageConstants.Values.SizeModeSmall : {
         smallFont
        break;
      }
      case AsyncStorageConstants.Values.SizeModeNormal : {
         mediumFont
        break;
      }
      case AsyncStorageConstants.Values.SizeModeLarge : {
         largeFont
        break;
      }
      case AsyncStorageConstants.Values.SizeModeXLarge : {
         extraLargeFont
        break;
      }
    }
  }

}
   