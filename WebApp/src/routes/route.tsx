import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Home from '../containers/home/home';
import UserProfile from '../containers/user/userProfile'
import Register from '../containers/auth/register'
import Login from '../containers/auth/login'


export default class Routing extends React.Component {

    render() {
        return (

            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/user" component={UserProfile} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                {/* <Route path="/profile" component={UserDetails}/>
                    <Route path="/tab/:id" render={(props) => <TabDetails id={props.match.params.id} {...props}/>} /> */}

                <Route exact path="/" render={() => (<Redirect to="/home" />)} />
            </Switch>

        );
    }
};