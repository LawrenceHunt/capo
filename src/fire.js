import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDs1GQ5vyP7WYWUA5k_Bfe_IY0GxBs_efs",
  authDomain: "capo-eed45.firebaseapp.com",
  databaseURL: "https://capo-eed45.firebaseio.com",
  projectId: "capo-eed45",
  storageBucket: "capo-eed45.appspot.com",
  messagingSenderId: "330984291455"
};
var fire = firebase.initializeApp(config);
export default fire;
