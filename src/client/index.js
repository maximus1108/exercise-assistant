import React, { Component, Fragment } from 'react';
import ReactDOM, { render } from 'react-dom';
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './App/Pages/Home/Home';
import Login from './App/Pages/Login/Login';

render(
    <Router>
        <Fragment>
            <Route exact path="/" component={ Login } />
            {/* <Route path="/login" component={ Login } /> */}
        </Fragment> 
    </Router>
    , document.getElementById('root'));