import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
// import Car from "../assets/img/car.jpg";
// import Spinner from "./Spinner";

 const CLIENT = {
   sandbox:
     "your_sandbox_key",
   production:
     "your_production_key"
 };

 const CLIENT_ID =
   process.env.NODE_ENV === "production" ? CLIENT.production : process.env.REACT_APP_SANDBOX_CLIENT_ID;
//create button here
let PayPalButton = null;

// next create the class and Bind React and ReactDom to window
//as we will be needing them later

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }
  
  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: this.props.product,
          amount: {
            currency_code: "USD",
            value: parseInt(this.props.paypalPrice)
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
        
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
      <div className="main">
        {loading }

        {showButtons && (
          <div>
            <div>
                <img alt="art image" src={this.props.image} style={{width: "300px"}} />
              <h2>Product: {this.props.product}</h2>
              <h2>Total checkout amount: ${this.props.paypalPrice}</h2>
            </div>

            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <div className="main">
            <img alt={this.props.imageAlt} src={this.props.image} style={{width: "300px"}}/>
            <h2>
              Thank you for purchasing {this.props.product} from Susie Wang Art. We will be notifying you about the shipping information within 48 hours.
            </h2>
          </div>
        )}
      </div>
    );
  }

 }

 export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);