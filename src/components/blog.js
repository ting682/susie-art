import React from 'react'
import TimeAgo from 'javascript-time-ago'
import Parser from 'html-react-parser'
// English.
import en from 'javascript-time-ago/locale/en'
import { Card } from 'react-bootstrap'
import { EditBlog } from './editBlog'
import { useAuth } from '../contexts/authContext'
TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export const Blog = (props) => {
    const { currentUser } = useAuth()
    return (
        <React.Fragment>
            {!!currentUser && <EditBlog {...props} />}
            <Card>
                    <Card.Title>Created {timeAgo.format(new Date(props.updatedAt))}</Card.Title>
                    <Card.Body>
                    {Parser(props.content)}
                    </Card.Body>
                </Card>
        </React.Fragment>
    )
}