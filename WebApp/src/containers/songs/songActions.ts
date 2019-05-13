import { songService } from './../../services/songService';
import { userService } from './../../services/userService';
import IUser from './../../interfaces/user/user';
import actionCreatorFactory from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import { AppDispatch } from '../../helpers/appDispatch';
import { RegisterUserModel } from '../../interfaces/auth/registerModel';
import { LoginModel } from '../../interfaces/auth/loginModel';
import AuthState from '../../interfaces/auth/authState';
import handleRequest from '../../helpers/requestHandler';
import { push } from 'connected-react-router';
import Response from '../../interfaces/response'
import { ISong } from '../../interfaces/song';


var factory = actionCreatorFactory();
var createAsync = asyncFactory<AuthState>(factory);

export const getAllSongs = createAsync<{}, ISong[]>(
  'register',
  async (p: {}, d: any) => {
    return await handleRequest<ISong[], {} >(songService.getAllSongs,d,p);
  });




// export const getCurrentUser = createAsync<void,IUser>(
//   'current',
//   async (p: void, d: any) => {
//     var result : Response<IUser> = await authService.getCurrentUser();
//     return result.data;

//   }
// )