import React, { Component } from 'react'

import { ListGroup, ListItem } from './listGroup'

export default class Histories extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const listItems = this.props.documents.map(( document, index ) =>
            <ListItem key={ index } userName={ document.user } date={ document.created }/>
        );
        return (
            <ListGroup>
                { listItems }
            </ListGroup>
        )
    }
}