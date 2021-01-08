import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import { Form, Button } from 'react-bootstrap'

class Contact extends Component {

   constructor(props) {
      super(props)
      this.state = {
         contactName: '',
         contactEmail: '',
         contactSubject: '',
         contactMessage: ''
      }

      this.sendEmail = this.sendEmail.bind(this)
   }

   sendEmail(e) {
      e.preventDefault();
  
      emailjs.sendForm('service_gpm7vva', 'template_jlmg08s', e.target, 'user_IVYbb3zq4ybVNXdN0KuC7')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

      this.setState({
         contactName: '',
         contactEmail: '',
         contactSubject: '',
         contactMessage: ''
      })
    }

    handleChange = (event) => {
       this.setState(previousState => {
          return {
            ...previousState,
            [event.target.name]: event.target.value
          }
       })
    }

  render() {


    return (
        <React.Fragment>
            <h1>Get in touch.</h1>
            <Form onSubmit={this.sendEmail}>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="contactName" type="text" onChange={this.handleChange} placeholder="Enter your name" value={this.state.contactName}/>
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="contactEmail" type="email" onChange={this.handleChange} placeholder="Enter email" value={this.state.contactEmail}/>
                </Form.Group>
                <Form.Group controlId="formGroupSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control name="contactSubject" type="text" onChange={this.handleChange} placeholder="Subject" value={this.state.contactSubject}/>
                </Form.Group>
                <Form.Group controlId="formGroupMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control name="contactMessage" type="text" onChange={this.handleChange} placeholder="Message" value={this.state.contactMessage}/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </React.Fragment>
      
    );
  }
}

export default Contact;
