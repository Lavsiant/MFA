import { userService } from './../../services/userService';
import IUser from './../../interfaces/user/user';
import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import UserState from '../../interfaces/user/userState';

var factory = actionCreatorFactory();
var createAsync = asyncFactory<UserState>(factory);

export const getAllUsers = createAsync<{},IUser[]>(
  'getAllUsers',
  async (params,dispatch) =>{
  return await userService.getAllUsers();
})


