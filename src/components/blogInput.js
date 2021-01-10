import ReactQuill from 'react-quill'
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import firebase from "firebase/app";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux'

export const BlogInput = () => {

    const [blogContent, setBlogContent] = useState('')

    const dispatch = useDispatch()

    const handleChange = (value) => {
        setBlogContent(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let newUuid = uuidv4()
        let newUpdatedAt = (new Date()).toString()
        firebase.database().ref('blogs/' + newUuid).set({
            content: blogContent,
            updatedAt: newUpdatedAt
        })
        dispatch({type: 'NEW_BLOG', payload: {content: blogContent, updatedAt: newUpdatedAt, blogId: newUuid}})
        setBlogContent('')
    }

    return (
        <Form onSubmit={handleSubmit}>
            
            <ReactQuill value={blogContent} onChange={handleChange} modules={{ toolbar: [
                    
                    [ 'bold', 'italic', 'underline'],
                    
                    
                    [{ 'header': '1' }, { 'header': '2' }, 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet'}], 
                    [ 'link', 'image', 'video']]}} />
            {/* <Form.Control onChange={handleAboutTextChange} value={aboutTextChange} type="text"></Form.Control> */}
            <br></br>
            <Button variant="outline-dark" type="submit">Submit blog entry</Button>
                        
        </Form>
    )
}