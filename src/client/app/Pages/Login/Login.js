import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            error: ''
        }
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
                    this.setState(Object.assign({}, this.state, {
                        error: ''
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


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center container--90h">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5">
                        <h1 className="container__h1">Login</h1>
                        <form onSubmit={ this.handleFormSubmit }>
                            <div className="form-group">
                                <input className="form-control" placeholder="Email" type="text" id="email" name="email" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Password" type="password" id="password" name="password"/>
                            </div>
                            < button className="btn btn-primary btn-lg w-100">Submit</button>
                            <Link to="/register" className="container__link text-center">Click here to register.</Link>
                            <div className="invalid-feedback form__feedback text-center">{ this.state.error }</div>
                        </form>
                     
                    </div>
                </div>
            </div>
        )
    }
}

export default Login; 