import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import MainReducer from './MainReducer'
import ProfileReducer from './ProfileReducer'
export default combineReducers({
    auth: AuthReducer,
    main: MainReducer,
    profile : ProfileReducer
})