import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { AppDispatch } from '../../helpers/appDispatch';
import { HomeState } from '../../interfaces/home/homeState';
import { userService } from '../../services/userService';
import IUser from '../../interfaces/user/user';

var factory = actionCreatorFactory();
var createAsync = asyncFactory<HomeState>(factory);

export const getAllUsers = createAsync<{},IUser[]>(
  'getAllUsers',
  async () =>{
  return await userService.getAllUsers();
});