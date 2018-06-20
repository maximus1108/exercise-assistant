import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {

    componentDidMount(){
        axios(`${__SERVER__}/api`)
            .then(json => console.log(json))
            .catch(e => console.log(e));
    }

    render () {
        return (
            <Fragment>
                <h1>Home</h1>    
                <Link to="/login">Login</Link>    
                <br /> 
                <br />   
                <Link to="/register">register</Link>        
            </Fragment>
        )
    }
}

export default Home; 