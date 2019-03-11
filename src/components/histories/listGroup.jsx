import React from 'react'

export const ListGroup = (props) => {
    return <div className="list-group mt-2"> { props.children } </div>
}

export const ListItem = (props) => {
    return (
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1"> { props.date } </h5>
            </div>
            <small> { props.userName } </small>
        </a>
    )
}