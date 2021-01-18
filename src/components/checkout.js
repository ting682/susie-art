import { Form, Table, Col, Row, Button } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PaymentPage from './PaymentPage'

export const Checkout = (props) => {

    const shippingNameRef = useRef()
    const shippingAddress1Ref = useRef()
    const shippingAddress2Ref = useRef()
    const shippingStateRef = useRef()
    const shippingZipRef = useRef()
    const shippingPhoneRef = useRef()
    const billingNameRef = useRef()
    const billingAddress1Ref = useRef()
    const billingAddress2Ref = useRef()
    const billingStateRef = useRef()
    const billingZipRef = useRef()
    const billingPhoneRef = useRef()
    const emailRef = useRef()

    const cart = useSelector(state => state.cart.cart)
    const [sameShippingBilling, setSameShippingBilling] = useState(false)


    const handleShippingBillingCheckbox = (event) => {
        setSameShippingBilling(event.target.checked)
    }

    useEffect(() => {
        // debugger
        if (sameShippingBilling) {
            shippingNameRef.current.value = billingNameRef.current.value
            shippingAddress1Ref.current.value = billingAddress1Ref.current.value
            shippingAddress2Ref.current.value = billingAddress2Ref.current.value
            shippingStateRef.current.value = billingStateRef.current.value
            shippingZipRef.current.value = billingZipRef.current.value
            shippingPhoneRef.current.value = billingPhoneRef.current.value
        }
    },[sameShippingBilling])

    return (
        <>
            <h2>Checkout</h2>
            <Table bordered hover>
                <tr>
                    <td>
                        Items:       

                    </td>
                    <td>
                        ${cart.reduce((acc, item) => {
                            return acc + parseInt(item.price)
                        }, 0)}.00      
                    </td> 
                </tr>
                <tr>
                    <td>
                        Subtotal:       
                    </td> 
                    <td>
                        ${cart.reduce((acc, item) => {
                            return acc + parseInt(item.price)
                        }, 0)}.00 
                    </td> 
                </tr>
                <tr>
                    <td>
                        Shipping:       
                    </td> 
                    <td>
                        $0.00 
                    </td> 
                </tr>
                <tr>
                    <td>
                        Total:       
                    </td> 
                    <td>
                        ${cart.reduce((acc, item) => {
                            return acc + parseInt(item.price)
                        }, 0)}.00 
                    </td> 
                </tr>
            </Table>

            <PaymentPage />

            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Email address</Form.Label>
                    <Col sm="10">
                        <Form.Control ref={emailRef}></Form.Control>
                    </Col>
                    
                </Form.Group>
                
                <h2>Billing address</h2>
                
                <Form.Group as={Row}>
                    
                    <Form.Label column sm="2">Name</Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" ref={billingNameRef}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Address 1</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={billingAddress1Ref}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Address 2</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={billingAddress2Ref}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">State</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={billingStateRef}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Zip code</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={billingZipRef}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Phone</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={billingPhoneRef}></Form.Control>
                    </Col>
                </Form.Group>

                <h2>Shipping address</h2>
                <Form.Check type="checkbox" value={sameShippingBilling} onChange={handleShippingBillingCheckbox} label="Same as billing" defaultChecked={false}></Form.Check>
                <Form.Group as={Row}>
                    
                    <Form.Label column sm="2">Name</Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" ref={shippingNameRef}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Address 1</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={shippingAddress1Ref}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Address 2</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={shippingAddress2Ref}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">State</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={shippingStateRef}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Zip code</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={shippingZipRef}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Phone</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={shippingPhoneRef}></Form.Control>
                    </Col>
                </Form.Group>

                
                
                
                

                <Button>Place order</Button>
            </Form>


        </>
    )
}