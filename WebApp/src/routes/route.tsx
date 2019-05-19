import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Home from '../containers/home/home';
import UserProfile from '../containers/user/userProfile'
import Register from '../containers/auth/register'
import Login from '../containers/auth/login'
import Questionnaire from '../containers/user/questionnaire'
import SongList from '../containers/songs/songList'
import SongCreate from '../containers/songs/createSong';
import SongDetails from '../containers/songs/songDetails';
import Profile from '../containers/user/profileNavgation';
import Playlists from '../containers/songs/playlists';


export default class Routing extends React.Component {

    render() {
        return (

            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/user" component={UserProfile} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/preferences" component={Questionnaire} />
                <Route path="/songs" component={SongList} />
                <Route path="/song-create" component={SongCreate} />
                <Route path="/playlists" component={Playlists} />
                <Route path="/song/:id" render={(props) => <SongDetails id={props.match.params.id} {...props}/>} />
                <Route path="/profile" component={Profile} />
                {/* <Route path="/profile" component={UserDetails}/>
                  */}

                <Route exact path="/" render={() => (<Redirect to="/home" />)} />
            </Switch>

        );
    }
};