import React, { Component, Fragment } from 'react';

class Login extends Component {
    render () {
        return (
            <Fragment>
                <h1>Login</h1>
                <form>
                    <label htmlFor="username">Username:  </label>
                    <input type="text" id="username"/>
                    <br />
                    <br />
                    <label htmlFor="password">Password:  </label>
                    <input type="password" id="password"/>
                </form>
            </Fragment>                    
        )
    }
}

export default Login; 