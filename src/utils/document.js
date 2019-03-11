export const hasChanges = (changes) => {
    return changes.length === 0 ? true : false
}

export const INITIAL_STATE = {
    databaseDocument: '',
    userDocument: '',
    changes: [],
    user: ''
}

export const getElementOfAJsonObjectInReverse = (json, index) => {
    var lastKey = Object.keys(json).sort().reverse()[index];
    return json[lastKey];
}