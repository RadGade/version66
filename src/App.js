import React from 'react';
import Auth from './screens/Auth'
import Loading from './screens/Loading'
import './App.css';
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCzzEkw3vZFhrHz2UjWkFTzH1M58a75Tuc",
  authDomain: "blog-2da35.firebaseapp.com",
  databaseURL: "https://blog-2da35.firebaseio.com",
  projectId: "blog-2da35",
  storageBucket: "blog-2da35.appspot.com",
  messagingSenderId: "471114632490",
  appId: "1:471114632490:web:c5089c747223e93cd16253"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

function App () {

  const handelRegister = (email, password, school, teach, teachYear, Year, Subjects) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((User) => {
      if(teach){
        db.collection(`schools/${school}/Teachers`).doc(User.user.uid).set({
          email : email,
          Isteacher : teach,
          TeachingYears : teachYear,
          TeachingSubjects : Subjects
        })
      } else if(!teach) {
        db.collection(`schools/${school}/Students`).doc(User.user.uid).set({
          email : email,
          Isteacher : teach,
          YearLevel : Year,
          Subjects : Subjects
        })
      }
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(error.message)
      // ...
    })
  }




  const handelSignIn = (email, password) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
  }



  return (
    <div className="App">
        <Auth 
        handelRegister = {handelRegister} 
        handelSignIn = {handelSignIn}
        />
    </div>
  );

}

export default App;
