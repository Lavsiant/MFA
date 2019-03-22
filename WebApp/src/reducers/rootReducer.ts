import { combineReducers } from 'redux'

import {userReducer} from '../containers/user/userReducer'
import {homeReducer} from '../containers/home/homeReducer'
import {authReducer} from '../containers/auth/authReducer'

export default combineReducers({
    userReducer,
    homeReducer,
    authReducer
})