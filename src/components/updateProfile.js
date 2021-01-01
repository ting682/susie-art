import { useAuth } from '../contexts/authContext'
import React, { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'

import { Link, useHistory } from 'react-router-dom'


function UpdateProfile()  {

    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [email, setEmail] = useState(currentUser.email)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    
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
        
        const promises = []

        if (email !== currentUser.email) {
            promises.push(updateEmail(email))
        }

        if (password) {
            promises.push(updatePassword(password))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch (() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
        // try {
        //     setError('')
        //     setLoading(true)
        //     await signup(email, password)
        //     history.push("/")
        // } catch {
        //     setError('Failed to signup')
        // }
        // setLoading(false)
    }

    

    return (
        <React.Fragment>
            <Alert variant="danger">{error}</Alert>
            <h1>{loading}</h1>
            
            <h1>{currentUser && currentUser.email}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={handleEmailChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handlePasswordChange} value={password} required placeholder="Leave blank to keep the same"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" name="passwordConfirmation" onChange={handlePasswordConfirmation} value={passwordConfirmation} required placeholder="Leave blank to keep the same"></Form.Control>
                </Form.Group>
                <Button type="submit">Update profile</Button>
                <div className="w-100 text-cetner mt-2">
                    <Link to="/">Cancel</Link>
                </div>
            </Form>
        </React.Fragment>
    )
        
    
}

export default UpdateProfile