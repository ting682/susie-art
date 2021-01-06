
import './App.css';
// import { FirebaseDatabaseProvider } from "@react-firebase/database";
// import firebase from "firebase/app";
import "firebase/auth";
import React from 'react'
// import fire from './firebaseConfig'
// import Messages from './components/messages'
import 'bootstrap/dist/css/bootstrap.css'
// import Signup from './components/signup'
import { AuthProvider } from './contexts/authContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import Dashboard from './components/dashboard'
// import Login from './components/login'
// import PrivateRoute from './components/privateRoute'
// import ForgotPassword from './components/forgotPassword'
// import UpdateProfile from './components/updateProfile'
import { Home } from './components/pages/home'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import { About } from './components/pages/about'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">Susie Wang Art</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="/about">About</Nav.Link>
                  
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            {/* <PrivateRoute exact path="/" component={Dashboard}/>
            <PrivateRoute path='/update-profile' component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword}></Route> */}
          </Switch>
          
        </AuthProvider>
      </Router>
      
      
    </div>
  );
}

export default App;
