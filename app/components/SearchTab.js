import React, { Component } from 'react';

import {Button,Segment,Text, Container, Content} from 'native-base'


const SearchResultTypes = {
    ALL: 0,
    OT: 1,
    NT: 2
  };

export default class SearchTab extends Component {

    constructor(props){
        super(props);

    }
    render(){
    return (
        <Container>
            <Segment>
                <Button
                onPress={this.props.toggleFunction(SearchResultTypes.ALL)} 
                first active={this.props.activeTab == SearchResultTypes.ALL} 
                >
                <Text >
                    All
                </Text>
                </Button>
                <Button
                onPress={this.props.toggleFunction(SearchResultTypes.OT)}  
                active={this.props.activeTab == SearchResultTypes.OT} 
                
                >
                <Text >
                    Old Testament
                </Text>
                </Button>
                <Button 
                onPress={this.props.toggleFunction(SearchResultTypes.NT)} 
                last active={this.props.activeTab == SearchResultTypes.NT} 
                >
                
                <Text >
                    New Testament
                </Text>
                </Button>
            </Segment> 
    </Container>

     )
    }
}