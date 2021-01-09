
import './App.css';
// import { FirebaseDatabaseProvider } from "@react-firebase/database";
// import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';
import React from 'react'
// import fire from './firebaseConfig'
// import Messages from './components/messages'

// import Signup from './components/signup'
import { AuthProvider } from './contexts/authContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import Dashboard from './components/dashboard'
import Login from './components/login'
import PrivateRoute from './components/privateRoute'
import ForgotPassword from './components/forgotPassword'
import UpdateProfile from './components/updateProfile'
import { Home } from './components/pages/home'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import { About } from './components/pages/about'
import { ArtsContainer } from './components/artsContainer';
import { ArtShow } from './components/artShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { EditArtsContainer } from './components/editArtsContainer'
import { EditAbout } from './components/editAbout'

const App = () => {

  return (
    <div className="App" style={{fontFamily: "'Times New Roman', serif"}}>
      
      
        <Router>
          <AuthProvider>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                  <a href="https://www.facebook.com/Susie.Ketty.Riley"><FontAwesomeIcon icon={faFacebook} /> </a>
                  <a href="https://twitter.com/SusieWangCFA"><FontAwesomeIcon icon={faTwitter} /> </a>
                  <a href="https://www.instagram.com/susie_wang26/"><FontAwesomeIcon icon={faInstagram} /> </a>
                </Navbar.Brand>
                <FontAwesomeIcon icon={faShoppingCart} />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/products">Products</Nav.Link>
                    {/* {!! currentUser && <Nav.Link href="/editproducts">Edit art</Nav.Link>} */}
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
              <Route exact path='/products' component={ArtsContainer} />
              <Route path='/products/:artTitle' component={ArtShow} />
              <PrivateRoute exact path="/editproducts" component={EditArtsContainer}/>
              <PrivateRoute exact path="/editabout" component={EditAbout}/>
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              {/* <Route path="/signup" component={Signup} /> */}
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword}></Route>
            </Switch>
            
          </AuthProvider>
        </Router>
      
      
    </div>
  );
}

export default App;
