import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { notDeepEqual } from 'assert';

class Register extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        axios.post(`${__SERVER__}/api/register`, {
            email: data.get('email'),
            password: data.get('password')
        }, {
            withCredentials: true
        })
        .then(response => {
            const { data } = response;
            console.log(response)
            if(data.error === false) {
                this.props.history.push('/profile')
            }
            
        })
        .catch(e => console.log(e));

    }

    render () {
        return (
            <Fragment>
                <h1>Register</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="email">Email:  </label>
                    <input type="text" id="email" name="email"/>
                    <br />
                    <br />
                    <label htmlFor="password">Password:  </label>
                    <input type="password" id="password" name="password"/>
                    <br />
                    <br />
                    <button>Submit</button>
                </form>
            </Fragment>                    
        )
    }
}

export default Register; 