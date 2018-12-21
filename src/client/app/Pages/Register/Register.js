import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registered: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        axios.post(`${__SERVER__}/api/register`, {
                email: data.get('email'),
                password: data.get('password'),
                firstName: data.get('firstname'),
                surname: data.get('surname')
            }, {
                withCredentials: true
            })
            .then(response => {
                const { data } = response;
                console.log(response)
                if(data.error === false) {
                    this.setState(Object.assign({}, this.state, {
                        registered: true
                    }))
                }
                else throw new Error(data.error);
                
            })
            .catch(e => console.log(e));

    }

    render () {
        return (
            <Fragment>
                <h1>Register</h1>
                { 
                    this.state.registered ? (
                        <div>
                            Successfully registered, please check your emails and verify your account
                        </div>
                    ) : (
                        <form onSubmit={ this.handleFormSubmit }>
                            <label htmlFor="firstname">First name:  </label>
                            <input type="text" id="firstname" name="firstname"/>
                            <br />
                            <br />
                            <label htmlFor="surname">Surname:  </label>
                            <input type="text" id="surname" name="surname"/>
                            <br />
                            <br />
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
                    )
                }
            </Fragment>                    
        )
    }
}

export default Register; 