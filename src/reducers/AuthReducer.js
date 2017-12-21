import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    REGISTER_USER_FAIL,
    ROLE_CHANGED,
    DATASOURCE_CHANGED
} from '../actions/types'

const INITIAL_STATE = {
    email: 'email@gmail.com',
    password: 'password',
    user: null,
    error: '',
    loading: false,
    role:'',
    datasource: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload }
        case PASSWORD_CHANGED:
            return {...state, password: action.payload }
        case LOGIN_USER:
            return {...state, loading: true, error: '' }
        case LOGIN_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload,}
        case LOGIN_USER_FAIL:
            return {...state, error: 'Authentication Failed', password: '', loading: false }
        case REGISTER_USER_FAIL:
        return {...state, error : 'Registration Failed', password : '' , loading: false}
        case ROLE_CHANGED:
        return {...state , role : action.payload,...INITIAL_STATE}
        case DATASOURCE_CHANGED:
        return {...state,datasource:action.payload}
        default:
            return state
    }
}
