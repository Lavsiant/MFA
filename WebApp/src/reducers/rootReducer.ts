import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { userReducer } from '../containers/user/userReducer'
import { homeReducer } from '../containers/home/homeReducer'
import { authReducer } from '../containers/auth/authReducer'

const rootReducer = (history: History) => combineReducers({
    userReducer,
    homeReducer,
    authReducer,
    router: connectRouter(history)
})

export default rootReducer;