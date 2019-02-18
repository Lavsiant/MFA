import * as React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './header/header';
import Routing from '../routes/route';

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