import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firebase from "firebase/app";
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap'
import FormFileInput from 'react-bootstrap/esm/FormFileInput';
import imageCompression from 'browser-image-compression';

export const AddArt = (props) => {

    
    const [show, setShow] = useState(false)
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [artRoute, setArtRoute] = useState('')
    const [paypalPrice, setPaypalPrice] = useState('')
    const [title, setTitle] = useState('')
    
    const [artImageUrl, setArtImageUrl] = useState('')
    const [artImageAlt, setArtImageAlt] = useState('')
    const [uploadStatus, setUploadStatus] = useState('info')
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const dispatch = useDispatch()
    const arts = useSelector(state => state.arts.arts)
    const artsLoaded = useSelector(state => state.arts.loaded)
    const artIdRef = useRef()
    artIdRef.current = 0
    let maxId = 0;
    if (artsLoaded) {
        for(const [key, value] of Object.entries(arts)) {
            // debugger
            if (value["id"] > maxId) {
                maxId = value["id"]
                artIdRef.current = maxId + 1
            }
        }
    }
    // debugger
    



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

    const handleArtRoute = (event) => {
        setArtRoute(event.target.value)
    }

    const handlePaypalPrice = (event) => {
        setPaypalPrice(event.target.value)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    // const handleArtId = (event) => {
    //     setArtId(event.target.value)
    // }

    const handleFileChange = async (event) => {
        event.preventDefault()
        const imageFile = event.target.files[0]
        // debugger
        const fileRef = firebase.storage().ref('images/' + artRoute).child(imageFile.name)

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          }

        const compressedFile = await imageCompression(imageFile, options);

        let uploadTask = fileRef.put(compressedFile)

        uploadTask.on('state_changed', (snapshot) => {
            setUploadPercentage(parseFloat(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)))


        }, (error) => {
            console.log(error)
        },
        () => {
            setUploadStatus('success')
            

        })

        await fileRef.getDownloadURL().then(function(url) {
            setArtImageAlt(imageFile.name)
            setArtImageUrl(url)
        })
        console.log(artImageUrl)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // debugger
        firebase.database().ref('arts/' + artRoute).set({
            description: description,
            price: price,
            paypalPrice: paypalPrice,
            slug: artRoute,
            title: title,
            id: parseInt(artIdRef.current),
            images: [{url: artImageUrl, alt: artImageAlt}]

        }, error => {
            if (error) {

            } else {
                
                let artsRef = firebase.database().ref('arts/')
            
                artsRef.once('value', (snapshot) => {
                
                    const data = snapshot.val()
                    
                    dispatch({type: 'GET_ARTS', payload: data})
                })

                setShow(false)
            }
        })
    }

    return (
        <div style={{paddingBottom: "30px"}}>
            
            <Button variant="outline-info" onClick={handleClick} >Add art</Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add art</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={handleTitleChange} value={title} type="text"></Form.Control>
                        <Form.Label>Art route (no spaces)</Form.Label>
                        <Form.Control onChange={handleArtRoute} value={artRoute} type="text"></Form.Control>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={handleDescriptionChange} value={description} type="text"></Form.Control>
                        <Form.Label>Price</Form.Label>
                        <Form.Control onChange={handlePriceChange} value={price} type="text"></Form.Control>
                        <Form.Label>Paypal Price</Form.Label>
                        <Form.Control onChange={handlePaypalPrice} value={paypalPrice} type="text"></Form.Control>
                        <Form.Label>Art ID</Form.Label>
                        <Form.Control ref={artIdRef} type="text" defaultValue={maxId + 1}></Form.Control>
                        <FormFileInput onChange={handleFileChange} multiple></FormFileInput>
                        <br></br>
                        <Button type="submit">Add art</Button>
                    </Form>
                    <ProgressBar variant={uploadStatus} animated now={uploadPercentage} label={`${uploadPercentage}%`} />
                </Modal.Body>
            </Modal>
        </div>
    )
}