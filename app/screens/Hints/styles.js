import {StyleSheet,Dimensions} from 'react-native'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const HintStyle = (colorFile, sizeFile) =>{
    return StyleSheet.create({
        container:{
            flex:1,
            flexDirection:'row',
            backgroundColor:colorFile.backgroundColor
        },
        textView: {
            width: width*4/5,
            backgroundColor: colorFile.backgroundColor,
            flexDirection:'column',
        },
        textRow: {
            justifyContent:'center',
            height:64
        },
        textStyle:{
            color:colorFile.textColor,
            fontSize: sizeFile.contentText,
            marginHorizontal:8
        },
        iconColor:{
            color:colorFile.iconColor
        }
})
}

