import { combineReducers } from 'redux'

import authReducer from '../containers/authorization/authReducer'
import userReducer from '../containers/user/userReducer'


export default combineReducers({
    authReducer,
    userReducer
})