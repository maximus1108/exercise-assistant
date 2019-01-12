import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registered: false,
            error: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        axios.post(`${__SERVER__}/api/register`, {
                email: data.get('email'),
                password: data.get('password'),
                confirmPassword: data.get('confirm-password'),
                firstName: data.get('firstname'),
                surname: data.get('surname')
            }, {
                withCredentials: true
            })
            .then(response => {
                const { data } = response;

                if(data.error === false) {
                    this.setState(Object.assign({}, this.state, {
                        registered: true
                    }))
                }
                
                else {
                    this.setState(Object.assign({}, this.state, {
                        error: data.message
                    }))
                    throw new Error(data.error)
                };
                
            })
            .catch(e => console.log(e));

    }

    render () {
        const { registered } = this.state;

        return (
            <div className="container">
                <div className="row justify-content-center align-items-center container--90h">
                { 
                    registered? (
                        <div className="col-12 text-center">
                            <h1 className="container__h1">Successfully Registered</h1>
                            <p className="container__blurb">Please check your emails and verify your account before logging in.</p>
                            <Link
                                to='/login'
                                className="btn btn-primary btn-lg btn--pair"
                            >
                                Login
                            </Link>
                            <Link
                                to='/'
                                className="btn btn-outline-primary btn-lg btn--pair"
                            >
                                Home
                            </Link>
                        </div>
                    ) : (
                        <div className="col-12 col-sm-8 col-md-6 col-lg-5">
                            <h1 className="container__h1">Register</h1>
                            <form onSubmit={ this.handleFormSubmit }>
                                <div className="form-group">
                                    {/* <label htmlFor="firstname">First name:  </label> */}
                                    <input className="form-control" placeholder="First name" type="text" id="firstname" name="firstname"/>
                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="surname">Surname:  </label> */}
                                    <input className="form-control" placeholder="Surname" type="text" id="surname" name="surname"/>
                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email:  </label> */}
                                    <input className="form-control" placeholder="Email" type="text" id="email" name="email"/>
                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="password">Password:  </label> */}
                                    <input className="form-control" placeholder="Password" type="password" id="password" name="password"/>
                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="password">Password:  </label> */}
                                    <input className="form-control" placeholder="Confirm password" type="password" id="confirm-password" name="confirm-password"/>
                                </div>
                                <button className="btn btn-primary btn-lg w-100">Submit</button>
                                <Link to="/login" className="container__link text-center">Click here to login.</Link>
                                <div className="invalid-feedback form__feedback text-center">{ this.state.error }</div>
                            </form>
                        </div>
                    )
                }
                </div>
            </div>             
        )
    }
}

export default Register; 