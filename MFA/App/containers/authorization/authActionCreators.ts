import actionCreatorFactory from 'typescript-fsa';
import IUser from './../../interfaces/user';


const actionCreator = actionCreatorFactory();

 const loginSuccess =
  actionCreator<IUser>('LOGIN_SUCCESS');
 const loginFailed =
  actionCreator<string>('LOGIN_FAILED');

  export const actions = {
    loginSuccess,
    loginFailed
}