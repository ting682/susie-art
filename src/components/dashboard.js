import { Alert } from 'react-bootstrap';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useAuth } from '../contexts/authContext'
import { Link, useHistory } from 'react-router-dom'

export default function Dashboard() {

    const { currentUser, logout } = useAuth();

    const [error, setError] = useState('')
    const history = useHistory();

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to logout')
        }
    }

    return (
        <React.Fragment>
            {error && <Alert variant="danger">{error}</Alert>}
            <h1>Welcome page</h1>
            <h1>{currentUser.email}</h1>
            <Link to='/update-profile'>Update profile</Link>
            <Button variant="link" onClick={handleLogout} >Logout</Button>

        </React.Fragment>
        
    )
}