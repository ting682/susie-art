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
            <h3 style={{paddingTop: "30px"}}>Get in touch.</h3>
            <Form onSubmit={this.sendEmail}>
                <Form.Group controlId="formGroupName">
                    
                    <input className="nooutline" name="contactName" type="text" onChange={this.handleChange} placeholder="Name" value={this.state.contactName}/>
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    
                    <input className="nooutline" name="contactEmail" type="email" onChange={this.handleChange} placeholder="Email address" value={this.state.contactEmail}/>
                </Form.Group>
                <Form.Group controlId="formGroupSubject">
                    
                    <input className="nooutline" name="contactSubject" type="text" onChange={this.handleChange} placeholder="Subject" value={this.state.contactSubject}/>
                </Form.Group>
                <Form.Group controlId="formGroupMessage">
                    
                    <textarea className="nooutline" name="contactMessage" type="textarea" rows="4" onChange={this.handleChange} placeholder="Type your message here..." value={this.state.contactMessage}/>
                </Form.Group>
                <Button variant="outline-dark" type="submit">Submit</Button>
            </Form>
        </React.Fragment>
      
    );
  }
}

export default Contact;
