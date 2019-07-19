import React, { Component } from 'react'
import SplashScreen from './src/SplashScreen';
import { Routes } from './src/Routes';

export class app extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            timePassed: false
        }
    }
    
    componentWillMount() {
        let that = this;
        setTimeout(function () {
            that.setState({ timePassed: true });
        }, 2000);
    }

    render() {
        if (!this.state.timePassed) {
            return <SplashScreen />;
        } else {
            return <Routes />;
        }
    }
}

export default app
