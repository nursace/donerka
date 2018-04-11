import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import MainReducer from './MainReducer'
import ProfileReducer from './ProfileReducer'
import MapReducer from './MapReducer';
export default combineReducers({
    auth: AuthReducer,
    main: MainReducer,
    profile : ProfileReducer,
  map: MapReducer
})
