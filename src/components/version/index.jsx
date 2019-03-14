import React from 'react'

const HistoryVersion = ( props ) => {
    let documentId = props.match.params.documentId
    let currentDocumentId = props.match.params.currentDocumentId
    let previousDocumentId = props.match.params.previousDocumentId
    return (
        <div className="container m-2">
            Document { documentId }, History Version { currentDocumentId } - { previousDocumentId }
        </div>
    )
}

export default HistoryVersion