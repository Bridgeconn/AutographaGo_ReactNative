import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const noteStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
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
    notesView:{
        flex:1
    },
    noteFlatlistCustom:{
        flex:1
    },
    noteFontCustom:{
        fontSize:sizeFile.fontSize
    },
  
    //editNote
    noteReferenceViewCustom:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        margin:8
    },
    NoteAddButton:{
        flex:8
    },
    noteTextSize:{
    fontSize:sizeFile.fontSize,      
    },
    FlowLayoutCustom:{
        flex:8
    },
    addIconCustom:{
    flex:1
    },
    noteTextView:
    {height:2, 
    backgroundColor:'gray', 
    marginHorizontal:8
    },

    
})
}

