import { authService } from './../../services/authService';
import actionCreatorFactory from 'typescript-fsa';
import IUser from './../../interfaces/user';
import { strict } from 'assert';

const actionCreator = actionCreatorFactory();

export const loginSuccess =
  actionCreator<IUser>('LOGIN_SUCCESS');
export const loginFailed =
  actionCreator<string>('LOGIN_FAILED');

export function auth(username: string, password: string) {    
    return (dispatch) => {        
        authService.login(username,password)
           .then((user: IUser) => {
             console.log(user.username);
             dispatch(loginSuccess(user));
           })
           .catch((errorText: string) => {
             console.log(errorText);
             dispatch(loginFailed(errorText));
           });                    
    }
}