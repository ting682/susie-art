import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import firebase from "firebase/app";
import { Modal, Button, Form } from 'react-bootstrap'

export const EditArt = (props) => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [description, setDescription] = useState(props.description)
    const [price, setPrice] = useState(props.price)

    const handleClick = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // debugger
        firebase.database().ref('arts/' + props.slug).update({
            description: description,
            price: price
        }, error => {
            if (error) {

            } else {
                
                dispatch({type: 'UPDATE_ART', payload: {
                    slug: props.slug,
                    description: description,
                    price: price
                }})
                setShow(false)
            }
        })
    }

    return (
        <div style={{paddingBottom: "30px"}}>
            
            <Button variant="outline-info" onClick={handleClick} >Edit art</Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* <Form.Label>Title</Form.Label>
                        <Form.Control></Form.Control> */}
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={handleDescriptionChange} value={description} type="text"></Form.Control>
                        <Form.Label>Price</Form.Label>
                        <Form.Control onChange={handlePriceChange} value={price} type="text"></Form.Control>
                        <br></br>
                        <Button type="submit">Edit art</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}