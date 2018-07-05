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
                style={[
                    {backgroundColor:this.props.activeTab === SearchResultTypes.ALL ?  "#3F51B5":"#fff"},
                    styles.button
                  ]} 
                onPress={() =>this.props.toggleFunction(SearchResultTypes.ALL)} 
                active={this.props.activeTab == SearchResultTypes.ALL ? true : false} 
                >
                <Text
                    active={this.props.activeTab} 
                    style={{
                    color:this.props.activeTab == SearchResultTypes.ALL ? "#fff":"#3F51B5" 
                    }}
                >
                    All
                </Text>
                </Button>
                <Button 
                style={[
                    {backgroundColor:this.props.activeTab  == SearchResultTypes.OT ?  "#3F51B5":"#fff"},
                    styles.buttonCenter
                  ]} 
                onPress={() =>this.props.toggleFunction(SearchResultTypes.OT)}  
                active={this.props.activeTab == SearchResultTypes.OT ? true : false} 
                >
                <Text
                 active={this.props.activeTab} 
                 style={{
                   color:this.props.activeTab == SearchResultTypes.OT ? "#fff":"#3F51B5" 
                 }}
                >
                    Old Testament
                </Text>
                </Button>
                <Button 
                style={[
                    {backgroundColor:this.props.activeTab == SearchResultTypes.NT ?  "#3F51B5":"#fff"},
                    styles.button
                  ]} 
                onPress={()=>this.props.toggleFunction(SearchResultTypes.NT)} 
                active={this.props.activeTab == SearchResultTypes.NT ? true : false} 
                >
                <Text
                 active={this.props.activeTab} 
                 style={{
                   color:this.props.activeTab == SearchResultTypes.NT ? "#fff":"#3F51B5" 
                 }}
                >
                    New Testament
                </Text>
                </Button>
            </Segment> 
     )
    }
}
