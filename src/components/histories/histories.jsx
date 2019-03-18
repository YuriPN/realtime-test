import React, { Component } from 'react'

import { isoDateToShortDateWithHours } from '../../utils/document'

import { ListGroup, ListItem } from './listGroup'

export default class Histories extends Component {

    render(){
        const listItems = this.props.documents.map(( document, index ) =>{
            if( index < this.props.limit )
                return <ListItem key={ index } index={ index } userName={ document.user } date={ isoDateToShortDateWithHours(document.created) }/>
            return null
        });
        return (
            <ListGroup>
                { listItems }
            </ListGroup>
        )
    }
}