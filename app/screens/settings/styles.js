import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const settingsPageStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor 
    },
    containerMargin:{
        flex:1,
        margin:8
    },
    textStyle: {
            color: colorFile.textColor,   
            fontSize:sizeFile.fontSize
    },
    // IconCustom:{
        // color:colorFile.iconColor
    // },
    cardItemStyle:{
       paddingTop:16,
       paddingBottom:16,
       backgroundColor:colorFile.backgroundColor
    },
    cardItemRow:{
        flexDirection:'row'
    },
    nightModeCustom:{
        marginRight:8,
        marginBottom:20
    },
    dayModeCustom:{
        marginRight:8,
    },
    cardItemAlignRight:{
        alignItems:'flex-start'
    },
    segmentCustom:{
        width:width-50, 
        height: 30, 
        borderRadius: 50
    },
    cardItemIconCustom:{
        margin:8,
        color:colorFile.iconColor   
    }
})
}

