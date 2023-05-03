import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
} from './types';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isSignedIn: true, user }
  : { isSignedIn: false, user: null };

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignedIn: false,
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        isSignedIn: false,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        user: payload.user,
      };
    case SIGN_IN_FAIL:
      return {
        ...state,
        isSignedIn: false,
        user: null,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        user: null,
      };

    default:
      return state;
  }
}

export default authReducer;
