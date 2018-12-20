import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        axios.post(`${__SERVER__}/api/login`, {
                email: data.get('email'),
                password: data.get('password')
            }, {
                withCredentials: true
            })
            .then(response => {
                const { data } = response;
                console.log(response, data)
                if(data.error === false) {
                    this.props.history.push('/profile');
                    // this.setState(Object.assign({}, this.state, {
                    //     registered: true
                    // }))
                }
                else throw new Error(data.error);
                
            })
            .catch(e => console.log(e));

    }


    render () {
        return (
            <Fragment>
                <h1>Login</h1>
                <form onSubmit={ this.handleFormSubmit }>
                    <label htmlFor="email">Email:  </label>
                    <input type="text" id="email" name="email" />
                    <br />
                    <br />
                    <label htmlFor="password">Password:  </label>
                    <input type="password" id="password" name="password"/>
                    <button>Submit</button>

                </form>
            </Fragment>                    
        )
    }
}

export default Login; 