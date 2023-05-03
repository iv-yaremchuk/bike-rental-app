import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
  SET_MESSAGE,
} from './types';

import AuthService from '../services/auth.service';

export const signUp =
  (email, password, clientId, firstName, lastName) => (dispatch) => {
    return AuthService.signUp(
      email,
      password,
      clientId,
      firstName,
      lastName
    ).then(
      (response) => {
        dispatch({
          type: SIGN_UP_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: SIGN_UP_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const signIn = (email, password) => (dispatch) => {
  return AuthService.signIn(email, password).then(
    (data) => {
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SIGN_IN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const signOut = () => (dispatch) => {
  AuthService.signOut();

  dispatch({
    type: SIGN_OUT,
  });
};
