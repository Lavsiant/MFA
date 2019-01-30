import { reducerWithInitialState } from "typescript-fsa-reducers";
import {actions} from './userActionCreators'
import IUser from "../../interfaces/user";

interface State {
    users: IUser[];
    error: string
}

const INITIAL_STATE: State = {
    users: [],
    error: ''
};

export const userReducer = reducerWithInitialState(INITIAL_STATE)
    .case(actions.getAllUsers, (state: State, users: IUser[]) => ({ ...state,users: users }))
  
    .case(actions.getRequestFailed, (state: State, error: string) => ({ ...state, error: error }))