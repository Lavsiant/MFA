import actionCreatorFactory from 'typescript-fsa';
import IUser from './../../interfaces/user';


const actionCreator = actionCreatorFactory();

 const getAllUsers =
  actionCreator<IUser[]>('GET_USERS');
 const getRequestFailed =
  actionCreator<string>('GET_REQUEST_FAILED');

export const actions = {
    getAllUsers,
    getRequestFailed
}