import { authService } from './../../services/authService';
import { userService } from './../../services/userService';
import IUser from './../../interfaces/user/user';
import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { AppDispatch } from '../../helpers/appDispatch';
import { RegisterUserModel } from '../../interfaces/auth/registerModel';
import { LoginModel } from '../../interfaces/auth/loginModel';
import AuthState from '../../interfaces/auth/authState';


var factory = actionCreatorFactory();
var createAsync = asyncFactory<AuthState>(factory);

export const register = createAsync<RegisterUserModel,IUser>(
  'register',
  async (p : RegisterUserModel,d: any) =>{
  return await authService.register(p);
});

export const login = createAsync<LoginModel,IUser>(
  'login',
  async (p: LoginModel, d: any,) => {
    return await authService.login(p.login,p.password);
  }
)