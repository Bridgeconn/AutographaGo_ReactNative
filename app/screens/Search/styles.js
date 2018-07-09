import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const searchStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
        container:{
            backgroundColor:colorFile.backgroundColor,
            flex:1
        },
        ListEmptyContainer:{
            alignSelf:'center'
        },
        searchedDataContainer:{
            margin:8,
            backgroundColor:colorFile.backgroundColor
        },
        searchedData:{
            padding:4,
            borderBottomColor: 'silver',
            borderBottomWidth: 0.5,
            margin:4,
            fontSize:sizeFile.titleText,
            color:colorFile.textColor
          },
        textStyle:{
            margin:8,
            fontSize:sizeFile.contentText,
            color : colorFile.textColor
        },
        textLength:{
            alignSelf:"center",
            color:colorFile.textColor
        },
        headerText:{
            width:width,
            color:colorFile.textColor
        },
        placeholderColor:{
            color:colorFile.textColor
        }
    })
}