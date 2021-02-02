import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
import firebase from "firebase/app";
import { Modal, Button, Form } from 'react-bootstrap'
import FormFileInput from 'react-bootstrap/esm/FormFileInput';

export const EditArtImages = (props) => {

    // const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    // let fileList = []

    const handleClick = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleChange = async (event) => {
        const imageFile = event.target.files[0]
        // debugger
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          }

        const compressedFile = await imageCompression(imageFile, options);

        const fileRef = firebase.storage().ref('images/' + props.slug).child(imageFile.name)
        fileRef.put(compressedFile).then(snap => {
            setShow(false)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        debugger
        
    }

    return (
        <div style={{paddingBottom: "30px"}}>
            
            <Button variant="outline-info" onClick={handleClick} >Add art image</Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add image to {props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* <Form.Label>Title</Form.Label>
                        <Form.Control></Form.Control> */}
                        
                        <FormFileInput onChange={handleChange}></FormFileInput>
                        {/* <Button type="submit">Upload art images</Button> */}
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}