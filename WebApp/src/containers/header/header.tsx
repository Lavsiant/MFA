import { Link } from 'react-router-dom'
import * as React from 'react';
import { connect } from 'react-redux'
import AuthState from '../../interfaces/auth/authState';
import { LoginModel } from '../../interfaces/auth/loginModel';
import {Paper, TextField, Button} from '@material-ui/core'
import IUser from '../../interfaces/user/user';

interface HeaderProps{
    user: IUser
    error: string
}

class Header extends React.Component<HeaderProps> {
    constructor(props) {
        super(props);                    
    }

    componentDidMount = () => {
        let x = this.props;
    }

    render() {
        return (
            <header>
                <menu>
                    <ul>
                        <li>
                        {this.props.user ? 
                            <Link to="/">{this.props.user.login}</Link>
                            : <div>PLEASE LOGIN</div>
                        }

                        <div>{this.props.error}</div>

                        </li>
                     
                    </ul>
                </menu>
            </header>
        );
    }
}

let mapProps = (state : any) => {
    return {
        error: state.authReducer.error,
        user: state.authReducer.user
    }
}
    
export default connect(mapProps)(Header);

