import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;

export const splashStyle = StyleSheet.create({
    splashScreen:{
        flex:1, 
        backgroundColor: 'white', 
        justifyContent: 'center', 
        alignItems: 'center' 
    }

    })
