import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './header/header.jsx';
import Routing from '../routes/route.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Routing />
                </div>
            </Router>
        );
    }
};