import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const styles =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    verseWrapperText:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor
    },
    chapterList:{
        margin:16
    },
    footerComponent:{
        height:64,
        marginBottom:4
    },
    bottomBar:{

    },
    bottomOption:{

    },
    bottomOptionText:{

    },
    bottomOptionSeparator:{

    },

    bottomBarPrevView:{
        borderRadius: 40, 
        margin:8, 
        position:'absolute', 
        bottom:0, 
        left:0,
        width: 64, 
        height: 64, 
        backgroundColor: colorFile.backgroundColor,
        justifyContent:'center'
    },
    bottomBarNextView:{
        borderRadius: 40, 
        margin:8, 
        position:'absolute', 
        bottom:0, 
        right:0,
        width: 64, 
        height: 64, 
        backgroundColor: colorFile.backgroundColor,
        justifyContent:'center'
    },
    bottomBarChevrontIcon:{ 
        alignItems:'center',
        zIndex:2, 
        alignSelf:'center',
        color:colorFile.chevronIconColor,
        fontSize: sizeFile.chevronIconSize
    }

   

    })
}
