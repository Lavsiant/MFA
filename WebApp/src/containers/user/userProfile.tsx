import * as React from 'react';
import { connect } from 'react-redux'
import { updateUser } from './userActions'
import { getCurrentUser } from '../auth/authActions';
import UserState from '../../interfaces/user/userState';
import { AppDispatch } from '../../helpers/appDispatch';
import { bindActionCreators, AnyAction } from 'redux';
import IUser from '../../interfaces/user/user';
import { Link } from 'react-router-dom';
import "isomorphic-fetch";
import { ISong, Location, Mood, Weather } from '../../interfaces/song';
import { Genres } from '../../models/genres';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { songService } from '../../services/songService'
import Button from '@material-ui/core/Button';
import handleRequest from '../../helpers/requestHandler';
import { userService } from '../../services/userService';
import { push } from 'connected-react-router'

interface Props {
    updateUser(iser: IUser): any;
    getCurrentUser(): any;
    push(path: string): any
    user: IUser;
}

interface State {
    user: IUser;
}


class UserProfile extends React.Component<Props, State>  {
    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
                login: ''
            }
        }
    }

    componentDidMount() {
        if (this.props.user) {
            this.setState({
                user: {
                    ...this.state.user,
                    email: this.props.user.email,
                    password: this.props.user.password,
                    id: this.props.user.id
                }
            })
        }
        else {
            this.props.getCurrentUser().then((res) => {
                //console.log(res);
                if (!res) {
                    this.props.push('login');
                } else {
                    this.setState({
                        user: {
                            ...this.state.user,
                            email: res.email,
                            password: '',
                            login: res.login,
                            id: res.id
                        }
                    });
                }
            })

        }
    }

    handleGeneralChange = (e) => {
        const { name, value } = e.target;
        let { user } = this.state;
        user[name] = value;
        this.setState({ user: user });
    }

    handleSubmit = () => {
        this.props.updateUser(this.state.user);
    }

    render() {
        const { user } = this.state;
        return (
                <div style={{ textAlign: 'center' }}>
                    <h2>User</h2>
                    <div className='field'>
                        <TextField
                            style={{ width: '60%' }}
                            label="Email"

                            type="text"
                            name="email"
                            autoComplete="Email"
                            margin="normal"
                            variant="outlined"
                            value={user.email}
                            onChange={this.handleGeneralChange}
                            required
                        />

                    </div>
                    <div className='field'>
                        <TextField
                            style={{ width: '60%' }}
                            label='New password'
                            type="password"
                            name="password"
                            autoComplete="Password"
                            margin="normal"
                            variant="outlined"
                            value={user.password}
                            onChange={this.handleGeneralChange}
                            required
                        />
                    </div>

                    <div className='field'>
                        <TextField
                            style={{ width: '60%' }}
                            label='Login'
                            type="text"
                            name="login"
                            autoComplete="Password"
                            margin="normal"
                            variant="outlined"
                            value={user.login}
                            onChange={this.handleGeneralChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <Button size='large' variant="contained" type='button' onClick={this.handleSubmit} style={{ marginBottom: 20 }} color="primary"> Update </Button>
                    </div>
                    {/* {this.state.error ? 
                        <div style={{color: 'red'}}> {this.state.error} </div> : null} */}
                </div>

        )
    }
}


let mapProps = (state) => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatch = (dispatch: AppDispatch) => bindActionCreators(
    {
        updateUser: updateUser.action,
        getCurrentUser: getCurrentUser.action,
        push: push
    },
    dispatch);


export default connect(mapProps, mapDispatch)(UserProfile) 
