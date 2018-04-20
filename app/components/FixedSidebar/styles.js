import {StyleSheet,Dimensions} from 'react-native'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

   export const sidebarStyle =  StyleSheet.create({
        container:{
            backgroundColor:"#000",
                width: width/5,
                flexDirection:'column',
        },
        AnimatedViewCustom:{
            backgroundColor: 'transparent',
            alignItems: "center",
            justifyContent: "center",
            // margin:12
        },
        iconColor:{
            color:"#fff",
            padding:16,
        }

   
})

