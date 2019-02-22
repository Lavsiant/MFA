import { reducerWithInitialState } from "typescript-fsa-reducers";
import UserState from "../../interfaces/user/userState";
import IUser from "../../interfaces/user/user";
import {register} from "./authActions";
import AuthState from "../../interfaces/auth/authState";



const INITIAL_STATE: AuthState = {    
    isLoading: false,
};

export const userReducer = reducerWithInitialState(INITIAL_STATE)
    .case(register.async.done, (state: UserState,{}) => ({ 
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
    
  
    