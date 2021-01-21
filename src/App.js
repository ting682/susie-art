
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
import Login from './components/login'
import PrivateRoute from './components/privateRoute'
import ForgotPassword from './components/forgotPassword'
import UpdateProfile from './components/updateProfile'
import { Home } from './components/pages/home'
import { Nav, Navbar } from 'react-bootstrap'
import { About } from './components/about'
import { ArtsContainer } from './components/artsContainer';
import { ArtShow } from './components/artShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { EditArtsContainer } from './components/editArtsContainer'
import { EditAbout } from './components/editAbout'
import { BlogsContainer } from './components/blogsContainer';
import { Link } from 'react-router-dom'
import Dashboard from './components/dashboard';
import SquarePay from './components/squarePay';
import { ShoppingCart } from './components/shoppingCart';
// import { Checkout } from './components/checkout';
import PaymentPage from './components/PaymentPage';
// import { useAuth } from './contexts/authContext'
// import { v4 as uuidv4 } from 'uuid'
// import { useDispatch } from 'react-redux'

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
                <Link to='/shoppingcart'><FontAwesomeIcon icon={faShoppingCart} /></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                    {/* {!! currentUser && <Nav.Link href="/editproducts">Edit art</Nav.Link>} */}
                  </Nav>
                  {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                  </Form> */}
                </Navbar.Collapse>
            </Navbar>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route exact path='/products' component={ArtsContainer} />
              <Route path='/products/:artTitle' component={ArtShow} />
              <PrivateRoute exact path="/editproducts" component={EditArtsContainer}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/editabout" component={EditAbout}/>
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <PrivateRoute exact path="/squarepay" component={SquarePay}/>
              <Route exact path='/blog' component={BlogsContainer} />
              <Route exact path='/shoppingcart' component={ShoppingCart} />
              <Route exact path='/checkout' component={PaymentPage} />
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
