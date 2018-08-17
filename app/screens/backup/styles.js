import {StyleSheet,Dimensions} from 'react-native'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const backupPageStyle = (colorFile, sizeFile) =>{
    return StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:colorFile.backgroundColor
        },
        containerMargin:{
            margin:8,
        },
        textStyle:{
            color: colorFile.textColor,   
            fontSize:sizeFile.titleText,
            marginLeft:4,
        },
        cardItemStyle:{
            backgroundColor:colorFile.backgroundColor
        },
        cardStyle:{
             margin:16,
             padding:8
        },
        loaderStyle:{
            flex:1, 
            alignItems:'center', 
            justifyContent:'center', 
            flexDirection:'row',
            color:"#0000ff"
        },
        buttonStyle:{
            color:"#841584" 
        },
        iconStyle:{
            margin:8, 
            padding:8,
            fontSize:sizeFile.iconSize,
            color:colorFile.iconColor
        },
        textInputStyle:{
            height: 40, 
            borderColor: 'gray', 
            borderWidth: 1,
            marginVertical:8
        },
        placeholderColor:{
            color: colorFile.textColor, 
        }
        
})
}

