import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyD0eglKnQTxAmjaFIX27I6F3OV93aS8Ha8",
  authDomain: "letmeask-9935e.firebaseapp.com",
  databaseURL: "https://letmeask-9935e-default-rtdb.firebaseio.com",
  projectId: "letmeask-9935e",
  storageBucket: "letmeask-9935e.appspot.com",
  messagingSenderId: "582599548463",
  appId: "1:582599548463:web:002505e4361daac379b0da"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const database = firebase.database()