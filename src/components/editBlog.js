import firebase from "firebase/app";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
// import Parser from 'html-react-parser'

export const EditBlog = (props) => {

    const dispatch = useDispatch()

    const blogId = props.blogId

    // const blogContent = useSelector(state => {
        
    //     return state.blogs.blogs[blogId].content
    // })
    
    const loaded = useSelector(state => state.blogs.loaded)

    // debugger
    const [blogContentChange, setblogContentChange] = useState(props.content)

    // debugger
    const [show, setShow] = useState(false)

    // useEffect(() => {
    //     let blogRef = firebase.database().ref('blogs/' + blogId)
    //     // debugger
    //     const getData = async () => {
    //         await blogRef.once('value', snap => {
    //             // debugger
    //             const blogData = snap.val()
    //             // debugger
    //             setblogContentChange(blogData)
    //             dispatch({type: "GET_BLOG", payload: blogData})
    //         })
    //     }
    //     getData()
    // },[dispatch])
    
    const handleClick = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleblogContentChange = (value) => {
        setblogContentChange(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // debugger
        firebase.database().ref('blogs/' + blogId).update({
            content: blogContentChange,
            updatedAt: (new Date()).toString()
        }, error => {
            if (error) {

            } else {
                
                dispatch({type: 'UPDATE_BLOG', payload: {
                    blogId: blogId,
                    content: blogContentChange,
                    updatedAt: (new Date()).toString()
                }})
                setShow(false)
            }
        })
    }

    if (loaded) {
        
        return (
            <React.Fragment>
                
                <Button variant="outline-info" onClick={handleClick} >Edit entry</Button>
                
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit blog entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            {/* <Form.Label>Title</Form.Label>
                            <Form.Control></Form.Control> */}
                            
                            <ReactQuill value={blogContentChange} onChange={handleblogContentChange} modules={{ toolbar: [
                                    
                                    [ 'bold', 'italic', 'underline'],
                                    
                                    
                                    [{ 'header': '1' }, { 'header': '2' }, 'blockquote'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet'}], 
                                    [ 'link', 'image', 'video']]}} />
                            {/* <Form.Control onChange={handleblogContentChange} value={blogContentChange} type="text"></Form.Control> */}
                            <br></br>
                            <Button type="submit">Edit blog entry</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment></React.Fragment>
        )
    }

    
}