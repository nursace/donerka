import {
  POSITION_CHANGED
} from '../actions/types';


const INITIAL_STATE = {
  position: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  },
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POSITION_CHANGED:
      return { ...state, position : action.payload }
    default:
      return state;
  };
};
