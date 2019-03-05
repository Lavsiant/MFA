import { getAllUsers } from './../user/userActions';
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { HomeState } from '../../interfaces/home/homeState';

const INITIAL_STATE: HomeState = {};

export const homeReducer = reducerWithInitialState(INITIAL_STATE)
    .case(getAllUsers.async.done, (state,payload) => ({ 
        ...state,
        users: payload.result
     }))
     .case(getAllUsers.async.failed, (state,e) => ({ 
        ...state,
        error: e.error
     }))
    