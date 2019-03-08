const Diff = require('diff')

export const mergeTexts = (firstText, secondText) => {
    let differences = diferrences(firstText, secondText)
    var mergedText = ''
    differences.forEach(element => {
        mergedText += element.value
    })
    return mergedText
}

export const diferrences = (firstText, secondText) => {
    return Diff.diffChars(firstText, secondText)
}

export const differencesWithLocations = ( firstText, secondText) => {
    let allDifferences = diferrences(firstText, secondText)
    let diferrencesBetweenTexts = []
    let helperIndex = 0

    allDifferences.forEach(
        (item) => {
            if( hasChange(item) ) {
                diferrencesBetweenTexts.push({ 
                    ...item, 
                    index: helperIndex,
                    removed: item.removed ? true : false,
                    added: item.added ? true : false
                })
            }
            helperIndex += item.count
        }
    )

    return diferrencesBetweenTexts
}

const hasChange = (diffObject) => {
    return diffObject.added != undefined || diffObject.removed != undefined ? true : false 
}