//import css
//temp files for now to enable build
import './App/Assets/Styles/critical.scss';
import './App/Assets/Styles/index.scss';

import React, { Component, Fragment } from 'react';
import ReactDOM, { render } from 'react-dom';
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './App/Pages/Home/Home';
import Login from './App/Pages/Login/Login';
import Register from './App/Pages/Register/Register';
import Profile from './App/Pages/Profile/Profile';

render(
    <Router>
        <Fragment>
            <Route exact path="/" component={ Home } />
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route path="/profile" component={ Profile } />
        </Fragment> 
    </Router>
    , document.getElementById('root'));