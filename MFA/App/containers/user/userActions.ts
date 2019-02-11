import { userService } from './../../services/userService';
import IUser from './../../interfaces/user/user';
import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import UserState from '../../interfaces/user/userState';
import { AppDispatch } from '../../helpers/appDispatch';
import { bindActionCreators } from 'redux';

var factory = actionCreatorFactory();
var createAsync = asyncFactory<UserState>(factory);

export const getAllUsers = createAsync<{},IUser[]>(
  'getAllUsers',
  async (p : any,d: any) =>{
  return await userService.getAllUsers();
})
