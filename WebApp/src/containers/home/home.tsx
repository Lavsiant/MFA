import * as React from 'react';
import { connect } from 'react-redux'
import UserState from '../../interfaces/user/userState';
import { AppDispatch } from '../../helpers/appDispatch';
import { bindActionCreators, AnyAction } from 'redux';
import AuthState from '../../interfaces/auth/authState';
import { LoginModel } from '../../interfaces/auth/loginModel';
import {Paper, TextField, Button} from '@material-ui/core'
import IUser from '../../interfaces/user/user';
import { HomeState } from '../../interfaces/home/homeState';
import { getAllUsers } from '../user/userActions';

interface HomeProps{
    getAllUsers();
    users: IUser[];
    error: Error;
}

class HomePage extends React.Component<HomeProps>{
    constructor(props) {
        super(props);
    }
 
    componentDidMount = () =>{
        this.props.getAllUsers();
    }

    render() {       
        return (
           <div>Home page!</div>
        );
    }
}

let mapProps = (state : HomeState) => {
    return {
        users: state.users,
        error: state.error
    }
}

const mapDispatch = (dispatch : AppDispatch) => bindActionCreators(
    {
      getAllUsers : getAllUsers.action
    },
    dispatch);
    
export default connect(mapProps,mapDispatch)(HomePage);