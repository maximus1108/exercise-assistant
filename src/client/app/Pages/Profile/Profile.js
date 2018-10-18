import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Profile extends Component {

    componentDidMount() {
        axios.get(`${__SERVER__}/api/profile`, {
            withCredentials: true
        })
        .then(response => console.log(response))
        console.log('profile mounted')
    }

    render () { 
        return (
            <Fragment>
                <h1>Profile</h1>
            </Fragment>                    
        )
    }
}

export default Profile; 