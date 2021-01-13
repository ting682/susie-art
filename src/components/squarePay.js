import React, { Component } from 'react'
// import { SqPaymentForm } from 'https://js.squareup.com/v2/paymentform'
import { PaymentPage } from './PaymentPage'

export default class SquarePay extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            paymentForm: ""
        }

        const that = this;
        let sqPaymentScript = document.createElement('script');
        sqPaymentScript.src = "https://js.squareup.com/v2/paymentform";
        sqPaymentScript.type = "text/javascript"
        sqPaymentScript.async = false;
        sqPaymentScript.onload = ()=>{that.setState({
        loaded: true
        })};
        document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
    }

    componentDidMount() {
        
    }

    onGetCardNonce(event) {

        // Don't submit the form until SqPaymentForm returns with a nonce
        event.preventDefault();
        // Request a nonce from the SqPaymentForm object
        this.state.paymentForm.requestCardNonce();
    }

    render() {
        return (
            <React.Fragment>
                <PaymentPage />
            </React.Fragment>
        //   this.state.loaded &&
        //     <PaymentForm
        //       paymentForm={ window.SqPaymentForm }
        //     />
        );
      }
}

