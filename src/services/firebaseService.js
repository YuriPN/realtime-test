import {firebaseDatabase} from '../utils/firebaseUtils'

export default class FirebaseService {

    static getOneData = async (path, id) => {
        const query = firebaseDatabase.ref(path).child(id)

        const snapshot = await query.once('value')
        const value = snapshot.val()

        return value
    }

    static getDocument = async (id) => {
        
        const pathOfCollectionDocuments = 'documents'
        const document = await this.getOneData(pathOfCollectionDocuments, id)

        return document
    };

    static updateDocument = async (idDocument, document) => {
        var pathOfCollectionDocuments = 'documents'

        try {
            
            var collectionDocuments = firebaseDatabase.ref(pathOfCollectionDocuments)
            var documentRef = collectionDocuments.child(idDocument)
            var newDocument = documentRef.push()
            
            newDocument.set({
                content: document,
                created: new Date().toISOString()
            })
        } catch (error) {
            return false
        }

        return true
    }

    static insertHistory = async (idHistory, differences) => {
        var pathOfCollectionHistories = 'histories'
        try {

            var collectionHistories = firebaseDatabase.ref().child(pathOfCollectionHistories)
            var historyRef = collectionHistories.child(idHistory)

            differences.forEach(difference => {
                //console.log(difference)
                let newHistory = historyRef.push()
                newHistory.set(difference)
            });

        } catch (error) {
            return false
        }
        return true
    }

}