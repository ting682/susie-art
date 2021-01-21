import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { Form, Table, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import {
  SquarePaymentForm,
  ApplePayButton,
  CreditCardCVVInput,
  CreditCardExpirationDateInput,
  CreditCardNumberInput,
  CreditCardPostalCodeInput,
  CreditCardSubmitButton,
  GooglePayButton,
  MasterpassButton,
} from './squarePayIndex';
import '../components/squarepay/default.css';

const APPLICATION_ID = process.env.REACT_APP_SQUAREPAY_SANDBOX_ID;
const LOCATION_ID = process.env.REACT_APP_SQUAREPAY_LOCATION_ID;

export const PaymentPage = () => {

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

  const jwtCart = useSelector(state => state.cart.jwtCart)

    let cart = []

    for(const [key, value] of Object.entries(jwtCart)) {
      if (value["item"]) {
          cart.push(value["item"])
      }
      
  }

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

  const [errorMessages, setErrorMessages] = useState([]);

  function cardNonceResponseReceived(errors, nonce, cardData, buyerVerificationToken) {
    if (errors) {
      setErrorMessages(errors.map(error => error.message));
      return;
    }

    setErrorMessages([]);

    // alert('nonce created: ' + nonce + ', buyerVerificationToken: ' + buyerVerificationToken);
    
    // API.post('/payments', data: { nonce: nonce, buyerVerificationToken: buyerVerificationToken }) // implement this
    const idempotency_key = uuidv4();

    if (errors) {
      // Log errors from nonce generation to the browser developer console.
      console.error('Encountered errors:');
      errors.forEach(function (error) {
          console.error('  ' + error.message);
      });
      alert('Encountered errors, check browser developer console for more details');
       return;
  }
  //TODO: Replace alert with code in step 2.1
  return fetch('https://us-central1-susie-wang-art.cloudfunctions.net/payments/', {
    // fetch('https://connect.squareupsandbox.com/v2/payments', {
    method: 'POST',
    headers: {
        
        'Square-Version': "2020-12-16",
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.REACT_APP_SQUAREPAY_SANDBOX_ACCESS_TOKEN,
        
        
    },
    body: JSON.stringify({
        
        idempotency_key: idempotency_key,
        location_id: LOCATION_ID,
        nonce: nonce,
        amount: 10000
    })   
    })
    .catch(err => {
    alert('Network error: ' + err);
    })
    .then(response => {
        console.log(response)
        
    if (!response.ok) {
        return response.json().then(
        errorInfo => Promise.reject(errorInfo));
    }
    return response.json();
    })
    .then(data => {
    console.log(data);
    alert('Payment complete successfully!\nCheck browser developer console for more details');
    })
    .catch(err => {
    console.log(err);
    alert('Payment failed to complete!\nCheck browser developer console for more details');
    });
  }

  function createPaymentRequest() {
    return {
      requestShippingAddress: false,
      requestBillingInfo: true,
      currencyCode: 'USD',
      countryCode: 'US',
      total: {
        label: 'MERCHANT NAME',
        amount: '1',
        pending: false,
      },
      lineItems: [
        {
          label: 'Subtotal',
          amount: '1',
          pending: false,
        },
      ],
    };
  }

  function createVerificationDetails() {
    return {
      amount: '100.00',
      currencyCode: 'USD',
      intent: 'CHARGE',
      billingContact: {
        familyName: 'Smith',
        givenName: 'John',
        email: 'jsmith@example.com',
        country: 'GB',
        city: 'London',
        addressLines: ["1235 Emperor's Gate"],
        postalCode: 'SW7 4JA',
        phone: '020 7946 0532',
      },
    };
  }

  function postalCode() {
    const postalCode = '12345'; // your logic here
    return postalCode;
  }

  function focusField() {
    return 'cardNumber';
  }

  const loadingView = <div className="sq-wallet-loading"></div>;
  const unavailableApple = (
    <div className="sq-wallet-unavailable">Apple pay unavailable. Open safari on desktop or mobile to use.</div>
  );
  const unavailableGoogle = <div className="sq-wallet-unavailable">Google pay unavailable.</div>;
  const unavailableMasterpass = <div className="sq-wallet-unavailable">Masterpass unavailable.</div>;
  
  // function handleSubmit() {
  //   debugger
  // }

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
              </Form>

    <SquarePaymentForm
      sandbox={true}
      applicationId={APPLICATION_ID}
      locationId={LOCATION_ID}
      cardNonceResponseReceived={cardNonceResponseReceived}
      createPaymentRequest={createPaymentRequest}
      createVerificationDetails={createVerificationDetails}
      postalCode={postalCode}
      focusField={focusField}
    >
      <ApplePayButton loadingView={loadingView} unavailableView={unavailableApple} />
      <GooglePayButton loadingView={loadingView} unavailableView={unavailableGoogle} />
      <MasterpassButton loadingView={loadingView} unavailableView={unavailableMasterpass} />

      <div className="sq-divider">
        <span className="sq-divider-label">Or</span>
        <hr className="sq-divider-hr" />
      </div>

      <fieldset className="sq-fieldset">
        <CreditCardNumberInput />

        <div className="sq-form-third">
          <CreditCardExpirationDateInput />
        </div>

        <div className="sq-form-third">
          <CreditCardPostalCodeInput />
        </div>

        <div className="sq-form-third">
          <CreditCardCVVInput />
        </div>
      </fieldset>

      <CreditCardSubmitButton>Pay $1.00</CreditCardSubmitButton>

      <div className="sq-error-message">
        {errorMessages.map(errorMessage => (
          <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
        ))}
      </div>
    </SquarePaymentForm>

    </>
  );
};

export default PaymentPage;
