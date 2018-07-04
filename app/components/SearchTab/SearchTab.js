import React, { Component } from 'react';
import {Button,Segment,Text, Container, Content,Header,Left,Right,Body,Title} from 'native-base'
import { styles } from './styles'

const SearchResultTypes = {
    ALL: 0,
    OT: 1,
    NT: 2
  };

export default class SearchTab extends Component {
   
    constructor(props){
        console.log("props value in searchtab"+props.activeTab)
        super(props);

    }
    render(){
    return (
            <Segment style={styles.container}>
                <Button 
                style={styles.button}
                onPress={() =>this.props.toggleFunction(SearchResultTypes.ALL)} 
                active={this.props.activeTab == SearchResultTypes.ALL ? true : false} 
                >
                <Text>
                    All
                </Text>
                </Button>
                <Button 
                style={styles.button}
                style={{paddingRight:0,paddingLeft:0}}
                onPress={() =>this.props.toggleFunction(SearchResultTypes.OT)}  
                active={this.props.activeTab == SearchResultTypes.OT ? true : false} 
                >
                <Text >
                    Old Testament
                </Text>
                </Button>
                <Button 
                style={styles.button}
                onPress={()=>this.props.toggleFunction(SearchResultTypes.NT)} 
                active={this.props.activeTab == SearchResultTypes.NT ? true : false} 
                >
                <Text >
                    New Testament
                </Text>
                </Button>
            </Segment> 
     )
    }
}
