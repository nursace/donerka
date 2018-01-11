import {
    USER_FETCH_SUCCESS,
    USER_FETCH
} from '../actions/types'

const INITIAL_STATE = {
    filled : false,
    role : '',
    blood : '',
    factor : '',
    loading : false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_FETCH :
        return {...state , loading : true}
        case USER_FETCH_SUCCESS :
    return {...state , role : action.role,blood:action.blood,factor:action.factor,filled:action.filled,loading:false}

    default:
            return state
    }
}