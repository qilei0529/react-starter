/**
 * index.js for template
 */

import React, { Component } from 'react';
import classnames from 'classnames';

require('../styles/home.styl');

/**
 * >////<
 */

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.title = 'this is home'
    }

    render() {

        return (
            <div className="page-home">
                hello world
            </div>
        )
    }
}

export default Home