import * as React from 'react';
import { connect } from 'react-redux'
import UserState from '../../interfaces/user/userState';
import { AppDispatch } from '../../helpers/appDispatch';
import { bindActionCreators, AnyAction } from 'redux';
import AuthState from '../../interfaces/auth/authState';
import { login } from './authActions';
import { LoginModel } from '../../interfaces/auth/loginModel';
import {Paper, TextField, Button} from '@material-ui/core'

interface LoginProps{
    login(loginModel: LoginModel) : void
    error: string     
}

interface LoginState{
    loginModel: LoginModel
}

class LoginPage extends React.Component<LoginProps,LoginState>{
    constructor(props) {
        super(props);

        this.state = {
            loginModel: {
                login: '',
                password: ''
            }
        };
    }
 
    handleChange = (event) => {
        const { name, value } = event.target;
        const {loginModel} = this.state;
        this.setState({
            loginModel:{
                ...loginModel,
                [name]: value
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { loginModel } = this.state;
        const sss = this.props.login(loginModel);
        console.log(sss);
    }


    render() {
        const { loginModel } = this.state;
       
        return (
            <Paper className='login' style={{marginTop:40, width: 400}}>
                <div>
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                       
                        <div className='login-field' >
                        <TextField
                                style={{ width: '50%' }}
                                label= "Login"                   
                                type="text"
                                name="login"
                                autoComplete="Username"
                                margin="normal"
                                variant="outlined"
                                value={loginModel.login}
                                onChange={this.handleChange}
                                required
                            />    
                           
                        </div>
                        <div className='login-field'>
                        <TextField
                                style={{ width: '50%' }}
                                label="Passwprd"
                                type="password"
                                name="password"
                                autoComplete="Username"
                                margin="normal"
                                variant="outlined"
                                value={loginModel.password}
                                onChange={this.handleChange}
                                required
                            />    
                          
                        </div>

                        {this.props.error ? 
                        <div>{this.props.error}</div> : null}

                        <div className="form-group" style={{paddingBottom: 20}}>
                            <Button size="large" variant="contained" type='submit' style={{ marginBottom:20}}  color="primary">
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        );
    }
}

let mapProps = (state : any) => {
    return {
        error: state.authReducer.error,
        user: state.authReducer.user
    }
}

const mapDispatch = (dispatch : AppDispatch) => bindActionCreators(
    {
    login: login.action
    },
    dispatch);
    
export default connect(mapProps,mapDispatch)(LoginPage);

