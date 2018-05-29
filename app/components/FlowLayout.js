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

	// static propTypes = {
	// 	backgroundColors: PropTypes.array,
	// 	textColors: PropTypes.array,
	// 	text: PropTypes.string,
	// 	isSelected: PropTypes.bool,
	// 	onClick: PropTypes.func,
    // }
    
	static defaultProps = {
		backgroundColors: ['#FFFFFF', '#266A99'],
		textColors: ['#666666', '#FFFFFF'],
	}

	_backgoundColor() {
        return this.props.backgroundColors[0];
	}

	_textColor() {
        return this.props.textColors[0];
	}

	render() {
		return (
			<View>
                {/*
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', margin:4, 
                    borderColor:'gray', borderWidth:1, borderRadius:20, padding:4, alignItems:'center'}}>
                    <Text style={{fontSize:14, marginHorizontal:2}} 
                        onPress={() => {this.props.onTextClick()}} >
                        {this.props.text}
                    </Text>
                    <Icon name="clear" style={{}} size={24} 
                        color="gray" onPress={()=> {this.props.onDeleteClick()}} />
                </View>
                */}
				<TouchableOpacity onPress={()=>{
					this.props.onTextClick();
				}}>
					<View style={[styles.corner,{backgroundColor:this._backgoundColor()}]}>
						<Text style={[styles.text,{color:this._textColor()}]}>{this.props.text}</Text>
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

		this.state = {
			selectedState: new Array(this.props.dataValue.length).fill(false),
		};

	}
	change() {
		for (var i = 0; i < this.state.selectedState.length; i++) {
			let item = this.refs[this.props.dataValue[i]];
			if (item) {
				item.setSelected(this.state.selectedState[i]);
			}
		}
	}

	render() {
		let items = this.props.dataValue.map((value, position) => {
			return (
				<View key={position}>
                    <FlowView  ref ={this.props.dataValue[position]} text={value} 
                        onDeleteClick={()=>{
                            if (this.props.multiselect == false) {
                                for (var i = this.state.selectedState.length - 1; i >= 0; i--) {
                                    if(i==position){
                                        continue;
                                    }
                                    if (this.state.selectedState[i] == true) {
                                        this.state.selectedState[i] = false;
                                        break;
                                    }
                                }
                            }
                            this.state.selectedState[position] = !this.state.selectedState[position];
                            this.change();
                        }}
                        onTextClick={()=>{

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
		borderColor: '#D0D0D0',
		borderWidth: 1 / PixelRatio.get(),
		borderRadius: 5,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
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