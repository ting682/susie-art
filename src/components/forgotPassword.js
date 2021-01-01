import { Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useAuth } from '../contexts/authContext'

export default function ForgotPassword() {

    const [email, setEmail] = useState('')
    
    
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(email)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    

    return (
        <React.Fragment>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert varient="success">{message}</Alert>}
            <h1>Password Reset</h1>
            <h1>{loading}</h1>
            <h1>{message}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleEmailChange} value={email}></Form.Control>
                </Form.Group>
                
                
                <Button type="submit">Reset Password</Button>
                <div className="w-100 text-center mt-3">
                    <Link to="/login">Login</Link>
                </div>
            </Form>
        </React.Fragment>
    )
}