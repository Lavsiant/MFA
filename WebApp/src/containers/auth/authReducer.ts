import { reducerWithInitialState } from "typescript-fsa-reducers";
import UserState from "../../interfaces/user/userState";
import IUser from "../../interfaces/user/user";
import {register, login} from "./authActions";
import AuthState from "../../interfaces/auth/authState";



const INITIAL_STATE: AuthState = {    
    isLoading: false,
    error: null
};

export const userReducer = reducerWithInitialState(INITIAL_STATE)
    .case(register.async.done, (state,{}) => ({ 
        ...state,
        isLoading:false }))
    .case(register.async.failed, (state, e) => ({
        ...state,
        error: e.error,
        isLoading: false
    }))
    .case(register.async.started, (state) => ({
        ...state,
        isLoading: true
    }))
    .case(login.async.done, (state) => ({
        ...state
    }))
    .case(login.async.failed, (state,e) => ({
        ...state,
        error: e.error 
    }))
    
  
    