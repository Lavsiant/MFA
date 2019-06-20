import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from './authActions';
import { Paper, TextField, Button } from '@material-ui/core'
import { RegisterUserModel } from '../../interfaces/auth/registerModel';
import AuthState from '../../interfaces/auth/authState';
import { AppDispatch } from '../../helpers/appDispatch';
import { push } from 'connected-react-router'
//import Paper from '@material-ui/core/Paper'

interface AuthProps {
    register(user: RegisterUserModel): any
    push(path: string): any
}

interface State {
    user: RegisterUserModel
}



class RegisterPage extends React.Component<AuthProps, State> {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                login: '',
                password: '',
                email: '',
            },

        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { user } = this.state;
        this.props.register(user)
        .then((res) => {
            if (res) {
                // this.props.push('/home');
            }
        })
        .catch((er)=>
        {
            alert(er);
        })
        

    }


    render() {
        const { user } = this.state;

        return (
            <Paper className='login' style={{ marginTop: 40 }}>
                <div>
                    <h2>Register</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        {/* <div >
                            <TextField
                                style={{ width: '90%' }}
                                label="First name"
                                type="text"
                                name="firstName"
                                autoComplete="Username"
                                margin="normal"
                                variant="outlined"
                                value={user.firstName}
                                onChange={this.handleChange}
                                required
                            />

                        </div>
                        <div className='login-field'>
                            <TextField
                                style={{ width: '90%' }}
                                label="Last name"
                                type="text"
                                name="lastName"
                                autoComplete="Lastname"
                                margin="normal"
                                variant="outlined"
                                value={user.lastName}
                                onChange={this.handleChange}
                                required
                            />

                        </div> */}
                        <div className='login-field' >
                            <TextField
                                style={{ width: '90%' }}
                                label="Login"
                                type="text"
                                name="login"
                                autoComplete="Username"
                                margin="normal"
                                variant="outlined"
                                value={user.login}
                                onChange={this.handleChange}
                                required
                            />

                        </div>
                        <div className='login-field'>
                            <TextField
                                style={{ width: '90%' }}
                                label="Passwprd"
                                type="password"
                                name="password"
                                autoComplete="Username"
                                margin="normal"
                                variant="outlined"
                                value={user.password}
                                onChange={this.handleChange}
                                required
                            />

                        </div>
                        <div className='login-field'>
                            <TextField
                                style={{ width: '90%' }}
                                label="Email"
                                type="email"
                                name="email"
                                autoComplete="Username"
                                margin="normal"
                                variant="outlined"
                                value={user.email}
                                onChange={this.handleChange}
                                required
                            />

                        </div>
                        <div className="form-group" style={{ paddingBottom: 20 }}>
                            <Button size="large" variant="contained" type='submit' style={{ marginBottom: 20 }} color="primary">
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        );
    }
}

let mapProps = (state: any) => {
    return {
        user: state.authReducer.user,
        error: state.authReducer.error
    }
}

const mapDispatch = (dispatch: AppDispatch) => bindActionCreators(
    {
        register: register.action,
        push: push
    },
    dispatch);

export default connect(mapProps, mapDispatch)(RegisterPage);

