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