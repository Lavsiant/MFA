import { authService } from './../../services/authService';
import { userService } from './../../services/userService';
import IUser from './../../interfaces/user/user';
import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { AppDispatch } from '../../helpers/appDispatch';
import { RegisterUserModel } from '../../interfaces/auth/registerModel';
import AuthState from '../../interfaces/auth/authState';


var factory = actionCreatorFactory();
var createAsync = asyncFactory<AuthState>(factory);

export const register = createAsync<RegisterUserModel,IUser>(
  'register',
  async (p : RegisterUserModel,d: any) =>{
  return await authService.register(p);
})

