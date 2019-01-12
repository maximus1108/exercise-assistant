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
        return verified === true
            ? "Your account has been successfully verified."
            : "We have been unable to verify your account.";
    }

    getVerifyId(url){
        return querystring.parse(url).id
    }

    render () { 
        const { verified } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center container--90h">
                    <div className="col-12 text-center">
                        <h1 className="container__h1">Account Verification</h1>
                        <p className="container__blurb">
                            { this.getVerificationText(verified) }
                        </p>
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
                </div>
            </div>
        )
    }
}

export default Verify; 