import React, { useState } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/authContext'
import { Link, useHistory } from 'react-router-dom'

export default function Login () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

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
            history.push("/")
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    

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
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign up</Link>
                </div>
            </Form>
        </React.Fragment>
    )
}