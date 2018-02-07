import {
    USER_FETCH_SUCCESS,
    USER_FETCH,
    USER_FILLING,
    USER_FILLING_FORM
} from '../actions/types'

const INITIAL_STATE = {
    filled : false,
    role : '',
    blood : '',
    factor : '',
    pload : false,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_FETCH :
        return {...state , pload : true}
        case USER_FETCH_SUCCESS :
    return {...state , role : action.role,blood:action.blood,factor:action.factor,filled:action.filled,pload:false}
    case USER_FILLING :
    return {...state , pload : true}
    case USER_FILLING_FORM :
return {...state , role : action.role,blood:action.blood,factor:action.factor,filled:action.filled,pload:false}

    default:
            return state
    }
}