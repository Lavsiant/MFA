import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../containers/home/home.jsx';
import {UserProfile} from '../containers/user/userProfile.jsx'

export default class Routing extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/user" component={UserProfile} />

                    {/* <Route path="/profile" component={UserDetails}/>
                    <Route path="/tab/:id" render={(props) => <TabDetails id={props.match.params.id} {...props}/>} /> */}

                    <Route exact path="/" render={() => (<Redirect to="/home" />)} />
                </Switch>
            </main>
        );
    }
};