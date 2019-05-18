import { userService } from './../../services/userService';
import IUser from './../../interfaces/user/user';
import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import UserState from '../../interfaces/user/userState';
import { AppDispatch } from '../../helpers/appDispatch';
import { IGenrePreference } from '../../models/genres';
import { number } from 'prop-types';
import { push } from 'connected-react-router'
import handleRequest from '../../helpers/requestHandler';


var factory = actionCreatorFactory();
var createAsync = asyncFactory<UserState>(factory);

export const getAllUsers = createAsync<{},IUser[]>(
  'getAllUsers',
  async (p : any,d: any) =>{
  return await userService.getAllUsers();
})

export const updateUser = createAsync<IUser,IUser>(
  'updateUser',
  async (p : IUser,d: any) =>{
    return await handleRequest<IUser, IUser>(userService.updateUser, d, p);
})

export const submitForm = createAsync<{id:string, gps: IGenrePreference[]}, any>(
  'submitPreferences',
  async (p : {id:string, gps: IGenrePreference[]},d: any) =>{
   await userService.submitPreferences(p.gps,p.id);
   d(push('/home'));

})

