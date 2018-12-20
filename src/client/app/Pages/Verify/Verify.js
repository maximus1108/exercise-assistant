import React, { Component, Fragment } from 'react';
import querystring from 'query-string';
import { pipe } from '../../../../utils/functional'
import axios from 'axios';
import { Link } from 'react-router-dom';

class Verify extends Component {
    constructor() {
        super();
        this.state = {
            verified: undefined
        }
    }

    componentDidMount() {
        pipe(
            this.getVerifyId,
            this.verifyUser.bind(this)
        )(window.location.search)
    }

    verifyUser(hash) {
        axios.post(`${__SERVER__}/api/verify`, {
            hash
        }, {
            withCredentials: true
        })
        .then(response => {
            const { data: { error } } = response
            console.log(error)
            if(error === false) {
                this.setState({
                    verified: true
                })
            } 
            else {
                this.setState({
                    verified: false
                })
            }
            
        })
        .catch(e => {
            console.log(e);
            this.setState({
                verified: false
            })
        });

    }

    getVerificationText(verified) {
        console.log(verified)
        if(verified === true) {
            return <p>Your account has been successfully verfied, please <Link to='/login'>login</Link>!</p>
        }
        else if (verified === false) {
            return <p>We have been unable to verify your account</p>
        }
        else return null
    }

    getVerifyId(url){
        return querystring.parse(url).id
    }

    render () { 
        const { verified } = this.state;
        return (
            <Fragment>
                <h1>Verify</h1>
                { this.getVerificationText(verified) }
            </Fragment>                    
        )
    }
}

export default Verify; 