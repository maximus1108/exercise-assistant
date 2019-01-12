import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render () {
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center container--90h">
                    <div className="col-12 text-center">
                        <h1 className="container__h1">Welcome to Fitness Assistant</h1>
                        <p className="container__blurb">The go-to app for all of your exercise planning and organisation.</p> 
                            <Link
                                to='/login'
                                className="btn btn-primary btn-lg btn--pair"
                            >
                                Login
                            </Link>
                            <Link
                                to='/register'
                                className="btn btn-outline-primary btn-lg btn--pair"
                            >
                                Register
                            </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home; 