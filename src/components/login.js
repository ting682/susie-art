import React, { useState } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/authContext'
import { Link, useHistory } from 'react-router-dom'
// import firebase from "firebase/app";

export default function Login () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    // let provider = new firebase.auth.GoogleAuthProvider()

    

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {
            setError('')
            setLoading(true)
            await login(email, password)
            history.push("/editproducts")
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    // const handleGoogleLogin = () => {
    //     firebase.auth()
    // .signInWithPopup(provider)
    // .then((result) => {
    //     /** @type {firebase.auth.OAuthCredential} */
    //     var credential = result.credential;

    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     // ...
    // }).catch((error) => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    // });
    // }

    return (
        <React.Fragment>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <h1>{loading}</h1>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleEmailChange} value={email}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handlePasswordChange} value={password}></Form.Control>
                </Form.Group>
                
                <Button type="submit">Login</Button>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot password?</Link>
                </div>
                {/* <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign up</Link>
                </div> */}
            </Form>
            {/* <Button onClick={handleGoogleLogin}>Login with Google</Button> */}
        </React.Fragment>
    )
}