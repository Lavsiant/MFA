import { authService } from './../../services/authService';
import actionCreatorFactory from 'typescript-fsa';
import IUser from './../../interfaces/user';
import {actions} from './authActionCreators';



export function auth(username: string, password: string) {    
    return (dispatch) => {        
        authService.login(username,password)
           .then((user: IUser) => {
             console.log(user.username);
             dispatch(actions.loginSuccess(user));
           })
           .catch((errorText: string) => {
             console.log(errorText);
             dispatch(actions.loginFailed(errorText));
           });                    
    }
}