import { reducerWithInitialState } from "typescript-fsa-reducers";
import UserState from "../../interfaces/user/userState";
import IUser from "../../interfaces/user/user";
import {getAllUsers, submitForm} from "./userActions";



const INITIAL_STATE: UserState = {
    users: [],
    isLoading: false,
};

export const userReducer = reducerWithInitialState(INITIAL_STATE)
    .case(getAllUsers.async.done, (state: UserState,{result: users}) => ({ 
        ...state,
        users: users,
        isLoading:false }))
    .case(getAllUsers.async.failed, (state, e) => ({
        ...state,
        error: e.error,
        isLoading: false
    }))
    .case(getAllUsers.async.started, (state) => ({
        ...state,
        isLoading: true
    }))
    .case(submitForm.async.done, (state) => ({
        ...state,
        isLoading: true
    }))
    
  
    