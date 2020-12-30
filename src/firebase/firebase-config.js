import FirebaseApp from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// console.log(process.env);

// npm install firebase
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};


/* if (process.env.NODE_ENV === 'test') {
    // testing
    firebase.initializeApp(firebaseConfigTesting);
} else {
    // dev/prod
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
} */
const firebase = FirebaseApp.initializeApp(firebaseConfig);

const db = FirebaseApp.firestore()
const googleAuthProvider = new FirebaseApp.auth.GoogleAuthProvider()

export {
	db,
	googleAuthProvider
}
export default firebase