
import './App.css';
// import { FirebaseDatabaseProvider } from "@react-firebase/database";
// import firebase from "firebase/app";
import "firebase/auth";
import React from 'react'
// import fire from './firebaseConfig'
// import Messages from './components/messages'
import 'bootstrap/dist/css/bootstrap.css'
import Signup from './components/signup'
import { AuthProvider } from './contexts/authContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from './components/dashboard'
import Login from './components/login'
import PrivateRoute from './components/privateRoute'
import ForgotPassword from './components/forgotPassword'
import UpdateProfile from './components/updateProfile'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <PrivateRoute path='/update-profile' component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword}></Route>
          </Switch>
          
        </AuthProvider>
      </Router>
      
      
    </div>
  );
}

export default App;
