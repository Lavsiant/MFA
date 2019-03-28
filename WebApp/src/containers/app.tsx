import * as React from 'react';
import Header from './header/header';
import Routing from '../routes/route';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router'

interface Props{
    history: History
}

export default class App extends React.Component<Props> {
    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <div>
                    <Header />
                    <Routing />
                </div>
            </ConnectedRouter>
           
        );
    }
};