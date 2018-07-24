import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const noteStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    noteCardItem:{
        justifyContent:'space-between', 
        alignItems:'center',
        marginTop:16, 
        flexDirection:'row'
    },
    noteCardCustom:{
        margin:8,flex:1
    },
    notesContentView:{
        flex:1
    },
    noteContent:{
        flex:1
    },
    centerEmptySet: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%' 
    },
    noteFontCustom:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor
    },
    noteFlatlistCustom:{
        
    },
    //editNote


    NoteAddButton:{
        flex:8
    },
    noteTextSize:{
    fontSize:sizeFile.contentText,      
    },
    FlowLayoutCustom:{
        flex:8
    },
    addIconCustom:{
    flex:1,
    fontSize:sizeFile.iconSize,
    color:colorFile.iconColor
    },
    noteTextView:
    {height:2, 
    backgroundColor:'gray', 
    marginHorizontal:8
    },
    containerEditNote:{
        flex:1, 
        flexDirection:'column', 
        backgroundColor:colorFile.backgroundColor

    },
    subContainer:{
        justifyContent:'space-between',
        flexDirection:'row',
         alignItems:'center',
        marginHorizontal:8,
        marginVertical:16
    },
    noteReferenceViewCustom:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        margin:8
    },
    tapButton:{
        flex:8,
        color:colorFile.textColor,
        fontSize:sizeFile.titleText
    },
    emptyMessageContainer:{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    messageEmpty:{
        fontSize:sizeFile.titleText,
        color:colorFile.textColor,
        // textAlign:'center',
    },
    emptyMessageIcon:{
        fontSize:sizeFile.emptyIconSize,
        margin:16,
        color:colorFile.iconColor,
    },
    textEditorView:{
        flexDirection: 'column-reverse'
    },
    richTextEditor:{
        height:height,
        color:colorFile.textColor,
        fontSize:sizeFile.contentText,
        backgroundColor:colorFile.backgroundColor
    },
    iconCustom:{
        margin:8, 
        padding:8, 
    },
    textStyle:{
        color:colorFile.textColor,
        fontSize:sizeFile.contentText
    },
    iconReferClose:{
        color:colorFile.textColor,
        fontSize:sizeFile.contentText
    }

})
}

