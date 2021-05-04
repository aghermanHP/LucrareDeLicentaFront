import firebase from 'firebase'

export const firebaseConfig = {
    apiKey: "AIzaSyCkebzRKwLPmNow8rBi2CRaehYzvLCYhnw",
    authDomain: "qa-labs-35bb1.firebaseapp.com",
    databaseURL: "https://qa-labs-35bb1.firebaseio.com",
    projectId: "qa-labs-35bb1",
    storageBucket: "qa-labs-35bb1.appspot.com",
    messagingSenderId: "576902743921",
    appId: "1:576902743921:web:08f10587348448f11898d0",
    measurementId: "G-2BEQ52WXS7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig, {
    serviceAccountId: 'firebase-adminsdk-lxzwg@qa-labs-35bb1.iam.gserviceaccount.com ',
  });
export const firebaseAuth = firebaseApp.auth()


