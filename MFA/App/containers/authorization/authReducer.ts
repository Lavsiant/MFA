import { reducerWithInitialState } from "typescript-fsa-reducers";
import {actions} from './authActionCreators'
import IUser from "../../interfaces/user";

interface State {
    user: IUser;
    error: string
}

const INITIAL_STATE: State = {
    user: null,
    error: ''
};

export const authReducer = reducerWithInitialState(INITIAL_STATE)
    .case(actions.loginSuccess, (state: State, user: IUser) => ({ ...state,user: user }))
  
    .case(actions.loginFailed, (state: State, error: string) => ({ ...state, error: error }))