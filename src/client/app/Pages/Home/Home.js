import React, { Component, Fragment } from 'react';
import './home.scss'
import { Link } from 'react-router-dom';

class Home extends Component {
    render () {
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center home__container">
                    <div className='col-12 home__content'>
                        <h1 className='home__heading'>Welcome to Fitness Assistant</h1>
                        <p className="home__blurb">The go-to app for all of your exercise planning and organisation.</p> 
                            <Link
                                to='/login'
                                className="btn btn-primary btn-lg home__button"
                            >
                                Login
                            </Link>
                            <Link
                                to='/register'
                                className="btn btn-outline-primary btn-lg home__button"
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