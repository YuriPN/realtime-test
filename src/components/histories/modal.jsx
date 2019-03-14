import React, { Component } from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'

import { isoDateToShortDateWithHours } from '../../utils/document'
import { diferrences, mergeTextsWithColor } from '../../utils/text'

import { Modal } from '../modal'

export default class HistoryModal extends Component {
    constructor( props ){
        super(props)

        this.state = {
            documentsDiff: []
        }

        this.documentWithChanges = this.documentWithChanges.bind(this)
    }

    documentWithChanges(currentDocument, previousDocument){
        return diferrences(currentDocument, previousDocument)
    }
    
    existDocument( documents, index ){
        return documents.length > index + 1
    }

    render(){

        const listModal = this.props.documents.map(( document, index, documents ) => {
            let date = isoDateToShortDateWithHours( document.created )

            if( index < this.props.limit ){
                let currentDocument = document.content
                let previousDocument = this.existDocument( documents, index + 1 ) ? documents[ index + 1 ].content : ''

                //console.log(currentDocument)
                //console.log(previousDocument)
                let mergedText = mergeTextsWithColor( previousDocument, currentDocument)

                return (
                    <Modal key={ index } id={ 'modal'+index } title={ date }>
                        { ReactHtmlParser( mergedText ) }
                    </Modal>
                )
            }
        })

        return (
            <div>
                { listModal }
            </div>
        )
    }
}