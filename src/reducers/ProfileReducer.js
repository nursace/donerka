import { 

} from '../actions/types'

const INITIAL_STATE = {
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
      //  case ERROR_SHOWED:
       // return {...state, error: '' }

        default:
            return state
    }
}
