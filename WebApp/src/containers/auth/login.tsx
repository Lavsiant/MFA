import * as React from 'react';
import { connect } from 'react-redux'
import UserState from '../../interfaces/user/userState';
import { AppDispatch } from '../../helpers/appDispatch';
import { bindActionCreators, AnyAction } from 'redux';

interface LoginProps{

}

interface LoginState{
    login: string;
    password: string;
}

class Login extends React.Component<LoginProps,LoginState>{

}