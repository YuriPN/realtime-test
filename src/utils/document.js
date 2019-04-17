export const hasChanges = (changes) => {
    return changes.length === 0 ? true : false
}

export const INITIAL_STATE = {
    databaseDocument: '',
    userDocument: '',
    changes: [],
    user: ''
}

export const getElementOnArrayInReverse = (array, index) => {
    var reverseArray = array.reverse()
    return reverseArray[ index ]
}

export const objectToArray = ( object ) => {
    return Object.values( object )
}

export const isoDateToShortDateWithHours = (dateObject) => {
    let date = new Date( String( dateObject ) )
    let dateShortFormat = date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    let hours = date.getHours() + ':' + date.getMinutes()
    return dateShortFormat + ' ' + hours
}