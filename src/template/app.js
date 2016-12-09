/**
 * index.js for template
 */

'use strict'

import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Home from './modules/home';
import Template from './modules/template';

class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Home} />
                <Route path="/template" component={Template} />
            </Router>
        )
    }
}

const dom = document.getElementById('app');
if ( dom ) {
    ReactDOM.render( <App />, dom );
    console.log('Hello DUI ~ version: 0.1');
}
