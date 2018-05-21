import React, { Component } from 'react';

import {Button,Segment,Text, Container, Content,Header,Left,Right,Body,Title} from 'native-base'


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
                <Segment style={{height:32,marginHorizontal:6,top:0}}>
                    <Button 
                    style={{paddingRight:0,paddingLeft:0}}
<<<<<<< HEAD
                    onPress={() =>this.props.toggleFunction(SearchResultTypes.ALL)} 
=======
                    onPress={() =>{this.props.toggleFunction(SearchResultTypes.ALL)} }
>>>>>>> 5dd986b434b9f11c73cd52e789333ae7a8eed892
                    active={this.props.activeTab == SearchResultTypes.ALL ? true : false} 
                    >
                    <Text>
                        All
                    </Text>
                    </Button>
                    <Button 
                    style={{paddingRight:0,paddingLeft:0}}
<<<<<<< HEAD
                    onPress={() =>this.props.toggleFunction(SearchResultTypes.OT)}  
=======
                    onPress={() =>{this.props.toggleFunction(SearchResultTypes.OT)} } 
>>>>>>> 5dd986b434b9f11c73cd52e789333ae7a8eed892
                    active={this.props.activeTab == SearchResultTypes.OT ? true : false} 
                    >
                    <Text >
                        Old Testament
                    </Text>
                    </Button>
                    <Button 
                    style={{paddingRight:0,paddingLeft:0}}
<<<<<<< HEAD
                    onPress={()=>this.props.toggleFunction(SearchResultTypes.NT)} 
=======
                    onPress={() =>{this.props.toggleFunction(SearchResultTypes.NT)} }
>>>>>>> 5dd986b434b9f11c73cd52e789333ae7a8eed892
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