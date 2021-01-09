import React, { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/authContext'
import { useHistory } from 'react-router-dom'

function Signup()  {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handlePasswordConfirmation = (event) => {
        setPasswordConfirmation(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        if (password !== passwordConfirmation) {
            return setError("Passwords do not match")
        }

        try {
            setError('')
            setLoading(true)
            await signup(email, password)
            history.push("/editproducts")
        } catch {
            setError('Failed to signup')
        }
        setLoading(false)
    }

    

    return (
        <React.Fragment>
            <Alert variant="danger">{error}</Alert>
            <h1>{loading}</h1>
            <h1>{currentUser && currentUser.email}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleEmailChange} value={email}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handlePasswordChange} value={password}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" name="passwordConfirmation" onChange={handlePasswordConfirmation} value={passwordConfirmation}></Form.Control>
                </Form.Group>
                <Button type="submit">Signup</Button>
            </Form>
        </React.Fragment>
    )
        
    
}

export default Signup