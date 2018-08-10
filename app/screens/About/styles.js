import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const aboutPage =(colorFile, sizeFile) =>{
    return StyleSheet.create({
        container:{
            backgroundColor:colorFile.backgroundColor,
        },
        textStyle:{
                fontSize:sizeFile.contentText,
                color:colorFile.textColor,
        },
        
        textContainer:{
            margin:16,
            padding:8
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
                textDecorationLine:'underline',
                fontSize:sizeFile.contentText
        },
        featureView:{
            flexDirection:'row'
        }
    })

}