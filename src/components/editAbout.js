import firebase from "firebase/app";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import Parser from 'html-react-parser'

export const EditAbout = () => {

    const dispatch = useDispatch()

    const aboutText = useSelector(state => state.about.about)
    
    const loaded = useSelector(state => state.about.loaded)

    const [aboutTextChange, setAboutTextChange] = useState(aboutText)

    // debugger
    const [show, setShow] = useState(false)

    useEffect(() => {
        let aboutRef = firebase.database().ref('about/abouttext')
        // debugger
        const getData = async () => {
            await aboutRef.once('value', snap => {
                // debugger
                const aboutData = snap.val()
                // debugger
                setAboutTextChange(aboutData)
                dispatch({type: "GET_ABOUT", payload: aboutData})
            })
        }
        getData()
    },[dispatch])
    
    const handleClick = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleAboutTextChange = (value) => {
        setAboutTextChange(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // debugger
        firebase.database().ref('about/').update({
            abouttext: aboutTextChange
        }, error => {
            if (error) {

            } else {
                
                dispatch({type: 'UPDATE_ABOUT_TEXT', payload: {
                    about: aboutTextChange
                }})
                setShow(false)
            }
        })
    }

    if (loaded) {
        return (
            <React.Fragment>
                <img src="images/about_3.jpg" alt="about Susie" style={{width: "100%", maxWidth: "600px", paddingBottom: "30px"}}>
                    
                </img>
                {Parser(aboutText)}
                <Button variant="outline-info" onClick={handleClick} >Edit about</Button>
                
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit about text</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            {/* <Form.Label>Title</Form.Label>
                            <Form.Control></Form.Control> */}
                            
                            <ReactQuill value={aboutTextChange} onChange={handleAboutTextChange} modules={{ toolbar: [
                                    
                                    [ 'bold', 'italic', 'underline'],
                                    
                                    
                                    [{ 'header': '1' }, { 'header': '2' }, 'blockquote'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet'}], 
                                    [ 'link', 'image', 'video']]}} />
                            {/* <Form.Control onChange={handleAboutTextChange} value={aboutTextChange} type="text"></Form.Control> */}
                            <br></br>
                            <Button type="submit">Edit about text</Button>
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