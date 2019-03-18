import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'

import { isoDateToShortDateWithHours } from '../../utils/document'

import { Modal } from '../modal'

import diff from './htmldiff'

export default class HistoryModal extends Component {
    constructor( props ){
        super(props)

        this.state = {
            documentsDiff: []
        }
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
                let mergedText = diff( previousDocument, currentDocument)

                return (
                    <Modal key={ index } id={ 'modal'+index } title={ date }>
                        { ReactHtmlParser( mergedText ) }
                    </Modal>
                )
            }
            return null
        })

        return (
            <div>
                { listModal }
            </div>
        )
    }
}