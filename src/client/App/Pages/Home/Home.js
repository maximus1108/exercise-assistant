import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render () {
        return (
            <Fragment>
                <h1>Home</h1>    
                <Link to="/login">Login</Link>        
            </Fragment>
        )
    }
}

export default Home; 