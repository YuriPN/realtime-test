import firebase from 'firebase';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyDWPNv8jnHuo17O8SblKeciZTqu0qKNzRk",
    authDomain: "az-editor-online.firebaseapp.com",
    databaseURL: "https://az-editor-online.firebaseio.com",
    projectId: "az-editor-online",
    storageBucket: "gs://az-editor-online.appspot.com/",
    messagingSenderId: "372729218502"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseStorage = firebase.storage();