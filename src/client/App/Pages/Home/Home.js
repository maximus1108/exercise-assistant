import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

    componentDidMount(){
        console.log('mounted')
        fetch('http://localhost:3000/api')
            .then(response => response.json())
            .then(json => console.log(json));
    }

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