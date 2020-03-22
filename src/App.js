/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import Auth from './screens/Auth'
import Loading from './screens/Loading'
import './App.css';
import * as firebase from 'firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";


let isAuthenticated = false


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



function PrivateRoute ({component: Component, isAuth, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuth === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/auth', state: {from: props.location}}} />}
    />
  )
}


function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}


class App extends React.Component {

state = {
      isAuth : false
    }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        isAuthenticated = true
        this.setState({
          isAuth : true
        })
      } else {
        this.setState({
          isAuth : true
        })
      }
    })
}

componentWillUnmount () {
  this.removeListener()
}

   handelRegister (email, password, school, teach, teachYear, Year, Subjects) {
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




   handelSignIn (email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
  }

  render() {
    return (
      <div className="App">

      <Router>
        <Switch>
        <Route path="/auth">
        <Auth 
        handelRegister = {this.handelRegister} 
        handelSignIn = {this.handelSignIn}
        />
      </Route>
      <PublicRoute authed={this.state.authed} path='/login' component={Login}  />
      <PrivateRoute isAuth={this.state.isAuth} path='/' component={Loading} />
        </Switch>
      </Router>
   

          <button onClick={() => {
            console.log(this.state.isAuth)
          }}>Check</button>
      </div>
    );
  }
}

export default App;
