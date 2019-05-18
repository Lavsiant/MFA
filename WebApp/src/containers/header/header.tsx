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

interface HeaderProps {
    user: IUser
    error: string
    getCurrentUser(): any
    logout() : any
    push(path: string) : any
}

interface State {
    value: number
    loggedIn: boolean
}

class Header extends React.Component<HeaderProps,State> {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            loggedIn: false
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleLogOut = () => {
        this.props.logout();
      }

    componentWillMount = () => {
        if (localStorage.getItem('user')) {
            this.setState({
                loggedIn: true
            })
        }
        else{
            this.setState({
                loggedIn: true
            })
        }
    }

    render() {

        return (
            <header>
        
                <AppBar position="static">
                    <Tabs style={{  flexGrow: 1}} value={this.state.value} onChange={this.handleChange} centered>
                        {this.state.loggedIn ?                        
                        <Tab label="Logout"onClick={this.handleLogOut} /> :
                        <Tab label="Login"  />
                        }
                    </Tabs>
                </AppBar>
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

