//import css
//temp files for now to enable build
import './assets/scss/critical.scss';
import './assets/scss/index.scss';

import React, { Component, Fragment } from 'react';
import ReactDOM, { render } from 'react-dom';
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './app/Pages/Home/Home';
import Login from './app/Pages/Login/Login';
import Register from './app/Pages/Register/Register';
import Profile from './app/Pages/Profile/Profile';
import Verify from './app/Pages/Verify/Verify';

render(
    <Router>
        <Fragment>
            <Route exact path="/" component={ Home } />
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route path="/profile" component={ Profile } />
            <Route path="/verify" component={ Verify } />
        </Fragment> 
    </Router>
    , document.getElementById('root'));