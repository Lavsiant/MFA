import { combineReducers } from 'redux'

import {userReducer} from '../containers/user/userReducer'
import {homeReducer} from '../containers/home/homeReducer'

export default combineReducers({
    userReducer,
    homeReducer
})