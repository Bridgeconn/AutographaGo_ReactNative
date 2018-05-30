import React, { Component } from 'react';
import {
	StyleSheet,
	PixelRatio,
	Text,
	View,
	TouchableOpacity,
	Platform,
	Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

var {
	width,
	height
} = Dimensions.get('window');


class FlowView extends Component {

	render() {
		return (
			<View>
				<TouchableOpacity onPress={()=>{
					this.props.onTextClick();
				}}>
					<View style={[styles.corner,{backgroundColor:'transparent'}]}>
						<Text style={[styles.text,{color:'#000000'}]}>{this.props.text.bookName} {this.props.text.chapterNumber}:{this.props.text.verseNumber}</Text>
                        <Icon name="clear" style={{}} size={24} 
                        color="gray" onPress={()=> {this.props.onDeleteClick()}} />
					</View>
                </TouchableOpacity>
            
			</View>
		);
	};

}
export default class FlowLayout extends Component {
	
	constructor(props) {
		super(props);
    }

	render() {
		let items = this.props.dataValue.map((value, position) => {
			return (
				<View key={position}>
                    <FlowView  ref ={this.props.dataValue[position]} text={value} 
                        onDeleteClick={()=>{
                            this.props.deleteReference(position);
                        }}
                        onTextClick={()=>{
                            this.props.openReference(position);
                        }}
                    />
				</View>
			);
		});

		return (
			<View style={[styles.container,this.props.style]}>
				{items}
			</View>
		);
	};
}

const styles = StyleSheet.create({
	corner: {
        flexDirection:'row',
		borderColor: 'gray',
		borderWidth: 1, /// PixelRatio.get(),
		borderRadius: 20,
		justifyContent: 'center',
        alignItems: 'center',
		paddingHorizontal: 10,
        paddingVertical: 4,
        padding:10,
		marginRight: 10,
        marginTop: 10,
	},
	text: {
		fontSize: 16,
		textAlign: 'center',
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		width: width,
	},

});