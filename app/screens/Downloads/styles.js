import {StyleSheet,Dimensions} from 'react-native'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const downloadPageStyle = (colorFile, sizeFile) =>{
    return StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:colorFile.backgroundColor
        },
        containerMargin:{
            flex:1,
            margin:8
        },
        cardItemStyle:{
            backgroundColor:colorFile.backgroundColor
        },
        cardStyle:{
             margin:16,
             padding:8
        },
        textStyle:{
            color: colorFile.textColor,   
            fontSize:sizeFile.titleText,
            marginLeft:4,
        },
        loaderStyle:{
            flex:1, 
            alignItems:'center', 
            justifyContent:'center', 
            flexDirection:'row'
        },
        textLoader:{
            color: colorFile.textColor,   
            fontSize:sizeFile.contentText,
        }
    
        
})
}

