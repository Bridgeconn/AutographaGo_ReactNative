import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const aboutPage =(colorFile, sizeFile) =>{
    return StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:colorFile.backgroundColor,
        },
        textStyle:{
                fontSize:sizeFile.contentText,
                color:colorFile.textColor
        },
        featureList:{
            fontSize:sizeFile.contentText,
            color:colorFile.textColor,
            fontWeight:"bold"
        },
        italicText:{
            fontWeight:'bold',fontStyle:'italic'
        },
        boldText:{
            fontWeight:"bold"
        },
        linkText:{
                color: 'red',
                textDecorationLine:'underline'
        },
        featureView:{
            flexDirection:'row'
        }
    })

}