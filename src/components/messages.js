import app from '../firebaseConfig';
import React, { Component } from 'react'

export default class Message extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            text: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        app.database().ref('messages').orderByKey().limitToLast(100)
        app.database().ref('messages').push(this.state.text)
    }

    render () {

        return (
            <React.Fragment>
                <input type="text" onChange={this.handleChange} />
                <br></br>
                <button onClick={this.handleSubmit}>Submit</button>
            </React.Fragment>
        )
        
        
    }
}