import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    REGISTER_USER_FAIL,
    ROLE_CHANGED,
    LOGOUT_USER,
    ERROR_SHOWED,
    MESSAGE,
    NOTVERIFIED
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    role:'',
    sent : false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ERROR_SHOWED:
        return {...state, error: '' }
        case EMAIL_CHANGED:
            return {...state, email: action.payload }
        case PASSWORD_CHANGED:
            return {...state, password: action.payload }
        case LOGIN_USER:
            return {...state, loading: true, error: '' }
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.payload,password : '', error : '',loading : false}
        case LOGIN_USER_FAIL:
            return {...state, error: 'Authentication Failed', password: '', loading: false }
        case REGISTER_USER_FAIL:
        return {...state, password : '' , loading: false}
        case ROLE_CHANGED:
        return {...state , role : action.payload,}
        case LOGOUT_USER:
        return {...state, loading: false }
        case  MESSAGE: 
        return {...state,sent : true,loading:false}
        case NOTVERIFIED:
        return {...state, password: '', loading: false}
        default:
            return state
    }
}
