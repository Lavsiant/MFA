import * as React from 'react';
import { connect } from 'react-redux'
import UserState from '../../interfaces/user/userState';
import { AppDispatch } from '../../helpers/appDispatch';
import { bindActionCreators, AnyAction } from 'redux';
import AuthState from '../../interfaces/auth/authState';
import { LoginModel } from '../../interfaces/auth/loginModel';
import { Paper, TextField, Button } from '@material-ui/core'
import IUser from '../../interfaces/user/user';
import { HomeState } from '../../interfaces/home/homeState';
import { getAllUsers } from '../user/userActions';

interface HomeProps {
    getAllUsers();
    users: IUser[];
    error: Error;
}

class HomePage extends React.Component<HomeProps>{
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.getAllUsers();
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <img style={{width: '600px'}} src="/styles/music-logo-design.jpg"/>
                <h1 style= {{ fontSize: '3rem', color: '#1976d2'}}>Smart Music Finder</h1>
                <h2 style= {{ fontSize: '1.5rem', color: '#1976d2'}}>Manage your account and playlists</h2>
            </div>
        );
    }
}

let mapProps = (state: HomeState) => {
    return {
        // users: state.users,
        // error: state.error
    }
}

const mapDispatch = (dispatch: AppDispatch) => bindActionCreators(
    {
        getAllUsers: getAllUsers.action
    },
    dispatch);

export default connect(mapProps, mapDispatch)(HomePage);
//#1976d2