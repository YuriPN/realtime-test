import React, { Component } from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'

import { isoDateToShortDateWithHours } from '../../utils/document'
import { diferrences } from '../../utils/text'

import { Modal } from '../modal'

export default class HistoryModal extends Component {
    constructor( props ){
        super(props)

        this.state = {
            documentsDiff: []
        }

        console.log( this.props.documents )

        this.documentWithChanges = this.documentWithChanges.bind(this)
    }

    documentWithChanges(currentDocument, previousDocument){
        diferrences(currentDocument, previousDocument)
    }

    existDocument( documents, index ){
        return documents.lenght === index + 1
    }

    render(){

        const listModal = this.props.documents.map(( document, index, documents ) => {
            let date = isoDateToShortDateWithHours( document.created )

            let currentDocument = document.content
            let previousDocument = this.existDocument( documents, index + 1 ) ? documents[ index + 1 ].content : ''

            this.documentWithChanges( currentDocument, previousDocument)
            return (
                <Modal key={ index } id={ 'modal'+index } title={ date }>
                    { ReactHtmlParser( document.content ) }
                </Modal>
            )
        })

        return (
            <div>
                { listModal }
            </div>
        )
    }
}