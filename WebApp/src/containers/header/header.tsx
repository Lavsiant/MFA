import { Link } from 'react-router-dom'
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

interface HeaderProps {
    user: IUser
    error: string
    getCurrentUser(): IUser
    logout() : void
}

interface State {
    value: number
}

class Header extends React.Component<HeaderProps,State> {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleLogOut = () => {
        this.props.logout();
      }

    componentDidMount = () => {
        if (this.props.user == null) {
            this.props.getCurrentUser();
        }
    }

    render() {
        return (
            <header>
                {/* <menu>
                    <ul>
                        <li>
                            {this.props.user ?
                                <Link to="/">{this.props.user.login}</Link>
                                : <div>PLEASE LOGIN</div>
                            }

                            <div>{this.props.error}</div>

                        </li>

                    </ul>
                </menu> */}
                <AppBar position="static">
                    <Tabs indicatorColor="primary" textColor="primary" value={this.state.value} onChange={this.handleChange} centered>

                        <Tab label="Logout" onClick={this.handleLogOut}  />
                    </Tabs>
                </AppBar>
            </header>
        );
    }
}

const mapProps = (state: any) => {
    return {
        error: state.authReducer.error,
        user: state.authReducer.user
    }
}

const mapDispatch = (dispatch: AppDispatch) => bindActionCreators(
    {
        getCurrentUser: getCurrentUser.action,
        logout: logout.action

    },
    dispatch);

export default connect(mapProps, mapDispatch)(Header);

