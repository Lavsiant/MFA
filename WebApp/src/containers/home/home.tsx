import * as React from 'react';
import { connect } from 'react-redux'
import UserState from '../../interfaces/user/userState';
import { AppDispatch } from '../../helpers/appDispatch';
import { bindActionCreators, AnyAction } from 'redux';
import AuthState from '../../interfaces/auth/authState';
import { login } from './authActions';
import { LoginModel } from '../../interfaces/auth/loginModel';
import {Paper, TextField, Button} from '@material-ui/core'
import IUser from '../../interfaces/user/user';

interface HomeProps{
    getAllUsers() : IUser[]
}

interface HomeState{
    
}

class HomePage extends React.Component<HomeProps,HomeState>{
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
        error: state.error
    }
}

const mapDispatch = (dispatch : AppDispatch) => bindActionCreators(
    {
    login : login.action
    },
    dispatch);
    
export default connect(mapProps,mapDispatch)(LoginPage);