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
            fontSize:sizeFile.contentText,
            marginLeft:4,
            alignSelf:'center'
    },
    
    cardItemStyle:{
       paddingTop:16,
       paddingBottom:16,
       backgroundColor:colorFile.backgroundColor
    },
    switchButtonCard:{
        paddingTop:16,
        paddingBottom:16,
        backgroundColor:colorFile.backgroundColor,
        justifyContent:'space-between',
    },
    cardItemRow:{
        flexDirection:'row'
    },
    nightModeCustom:{
        marginRight:8,
        marginBottom:20,
        color:colorFile.textColor
    },
    dayModeCustom:{
        marginRight:8,
        color:colorFile.textColor
    },
    cardItemAlignRight:{
        alignItems:'flex-start'
    },
    segmentCustom:{
        width:width-50, 
        height: 30, 
        borderRadius: 50,
    },
    cardItemIconCustom:{
        marginHorizontal:4,
        marginVertical:8,
        color:colorFile.settingsIconColor   
    },
    switchIcon:{
        color:colorFile.iconColor,
    }
})
}

