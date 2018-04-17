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
        iconView: {
            width: width/5,
            backgroundColor:colorFile.primaryColor
        },
        iconRow:{
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        AnimatedViewCustom:{
            backgroundColor: 'transparent',
            alignItems: "center",
            justifyContent: "center",
            margin:12
        },

        textView: {
            width: width*4/5,
            backgroundColor: colorFile.backgroundColor,
        },
        textRow: {
            justifyContent:'center',
            height:60
        },
        textStyle:{
            color:colorFile.textColor,
            fontSize: 16,
            marginHorizontal:8
        },
        iconColor:{
            color:colorFile.iconColor
        }
})
}

