import { authService } from './../../services/authService';
import { userService } from './../../services/userService';
import IUser from './../../interfaces/user/user';
import actionCreatorFactory from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import { AppDispatch } from '../../helpers/appDispatch';
import { RegisterUserModel } from '../../interfaces/auth/registerModel';
import { LoginModel } from '../../interfaces/auth/loginModel';
import AuthState from '../../interfaces/auth/authState';
import handleRequest from '../../helpers/requestHandler'


var factory = actionCreatorFactory();
var createAsync = asyncFactory<AuthState>(factory);

export const register = createAsync<RegisterUserModel, IUser>(
  'register',
  async (p: RegisterUserModel, d: any) => {
    return await authService.register(p);
  });

export const login = createAsync<LoginModel, IUser>(
  'login',
  async (p: LoginModel, d: any, ) => {
    return await handleRequest<IUser, LoginModel>(authService.login, p, d);
  });

export const logout = createAsync<void,never>(
  'logout',
  async (p: void, d: any) => {
     await handleRequest<void,void>(authService.)
  }
)