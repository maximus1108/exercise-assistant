import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Profile extends Component {

    componentDidMount() {
        axios.get(`${__SERVER__}/api/profile`, {
            withCredentials: true
        })
        .then(response => {
            const { data } = response;
            console.log(response)
            if(data.error === true) {
                this.props.history.push('/login');
                alert('unauthorised')
            }
        })
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