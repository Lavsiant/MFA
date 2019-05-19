import { NavLink } from 'react-router-dom'
import * as React from 'react';
import { connect } from 'react-redux';
import IUser from '../../interfaces/user/user';
import { AppDispatch } from '../../helpers/appDispatch';
import { bindActionCreators, AnyAction } from 'redux';
import { getCurrentUser, logout } from '../auth/authActions';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import { push } from 'connected-react-router'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

interface HeaderProps {
    user: IUser
    error: string
    getCurrentUser(): any
    logout(): any
    push(path: string): any
}

interface State {
    value: number
    loggedIn: boolean
    header: string
    open: boolean
}

class Header extends React.Component<HeaderProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            loggedIn: false,
            header: 'Songs',
            open: false
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleLogOut = () => {
        this.props.logout();
        this.setState({
            loggedIn: false
        })
    }

    componentWillMount = () => {
        this.props.getCurrentUser();

        const last = window.location.href.split('/');
        let header = '';
        switch (last[last.length - 1]) {
            case 'register':
                header = 'Registration'
                break;
            case 'login':
                header = 'Login'
                break;
            case 'songs':
                header = 'Songs'
                break;
            case 'preferences':
                header = 'Questionnaire'
                break;
            case 'playlists':
                header = 'Playlists'
                break;
            case 'profile':
                header = 'Profile'
                break;
            case 'home':
                header = 'Home'
                break;
        }
        this.setState({
            header: header
        })
        if (localStorage.getItem('user')) {
            this.setState({
                loggedIn: true
            })
        }
        else {
            this.setState({
                loggedIn: false
            })
        }
    }

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {

        this.setState({ open: false });
    };

    open = (path: string) => {

        window.location.href = path;

    }

    render() {

        return (
            <header>

                {/* <AppBar position="static">
                    <Tabs style={{  flexGrow: 1}} value={this.state.value} onChange={this.handleChange} centered>
                        {this.state.loggedIn ?                        
                        <Tab label="Logout"onClick={this.handleLogOut} /> :
                        <Tab label="Login"  />
                        }
                    </Tabs>
                </AppBar> */}
                <div style={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu" onClick={this.handleToggle}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" style={{ flexGrow: 1 }} color="inherit" >
                                {this.state.header}
                            </Typography>
                            <Popper open={this.state.open} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}

                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom', zIndex:10, position:'absolute'}}
                                    >
                                        <Paper style={{ marginTop: '150%' }}>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuList>
                                                <MenuItem onClick={() => { window.location.href = 'home'; }}>Home</MenuItem>
                                                    <MenuItem onClick={() => { window.location.href = 'songs'; }}>Songs</MenuItem>

                                                    {this.props.user ?
                                                        <div>
                                                            <MenuItem onClick={() => { window.location.href = 'playlists'; }}>Plalists</MenuItem>
                                                            <MenuItem onClick={() => { window.location.href = 'profile'; }}>Profile</MenuItem>
                                                        </div> :
                                                        <MenuItem onClick={() => { window.location.href = 'login'; }}>Login</MenuItem>}

                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>

                            {this.props.user ?
                                <div>
                                    <Button onClick={this.handleLogOut} color="inherit">Logout</Button>
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={() => { window.location.href = 'profile'; this.setState({ header: 'Profile' }) }}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </div>

                                :
                                <div>
                                    <Button onClick={() => { window.location.href = 'login' }} color="inherit">Login</Button>
                                    <Button onClick={() => { window.location.href = 'register' }} color="inherit">Register</Button>
                                </div>

                            }
                        </Toolbar>
                    </AppBar>
                </div>
            </header>
        );
    }
}
// component={props => <NavLink  to="/home" />} 
// component={props => <NavLink  to="/login" />}

const mapProps = (state: any) => {
    return {
        error: state.authReducer.error,
        user: state.authReducer.user
    }
}

const mapDispatch = (dispatch: AppDispatch) => bindActionCreators(
    {
        getCurrentUser: getCurrentUser.action,
        logout: logout.action,
        push: push

    },
    dispatch);

export default connect(mapProps, mapDispatch)(Header);
