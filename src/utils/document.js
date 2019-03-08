export const hasChanges = (changes) => {
    return changes.length === 0 ? true : false
}

export const INITIAL_STATE = {
    databaseDocument: '',
    userDocument: '',
    changes: [],
    user: ''
}