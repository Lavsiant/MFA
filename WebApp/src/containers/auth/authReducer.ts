import { reducerWithInitialState } from "typescript-fsa-reducers";
import UserState from "../../interfaces/user/userState";
import IUser from "../../interfaces/user/user";
import { register, login, logout, getCurrentUser } from "./authActions";
import AuthState from "../../interfaces/auth/authState";



const INITIAL_STATE: AuthState = {
    isLoading: false,
    user: null,
    error: ''
};

export const authReducer = reducerWithInitialState(INITIAL_STATE)
    .case(register.async.done, (state, payload) => ({
        ...state,
        user: payload.result,
        isLoading: false
    }))
    .case(register.async.failed, (state, e) => ({
        ...state,
        error: e.error.message,
        isLoading: false
    }))
    .case(register.async.started, (state) => ({
        ...state,
        isLoading: true
    }))
    .case(login.async.done, (state, payload) => ({
        ...state,
        user: payload.result
    }))
    .case(login.async.failed, (state, e) => ({
        ...state,
        error: e.error.message
    }))
    .case(logout.async.done, (state) => ({
        ...state,
        user: null
    }))
    .case(getCurrentUser.async.done, (state,payload) => ({
        ...state,
        user: payload.result
    }))


