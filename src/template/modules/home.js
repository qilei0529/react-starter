/**
 * index.js for template
 */

import React, { Component } from 'react';
import classnames from 'classnames';


// alias from ~base
import BaseBox from '~base/components/baseBox';

// alias from ~template
import Demo from '~template/components/demo';

require('../styles/home.styl');

/**
 * >////<
 */

var img = require('../images/home/logo.png');

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.title = 'this is home';
    }

    render() {
        return (
            <div className="page-home">
                <div className="icon icon-run"></div>
                <div className="icon"><img src={img} alt="" width="100"/></div>
                <div className="title"><span>hello world</span></div>
                <div className="content">
                    <BaseBox name="baser" />
                    <Demo name="adam" />
                </div>
            </div>
        )
    }
}

export default Home