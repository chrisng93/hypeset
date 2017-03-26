/**
 * Created by chrisng on 3/19/17.
 */
import { push } from 'react-router-redux';
import * as actionTypes from '../constants/actionTypes.js';
import { actionApiCall, createHeaders } from '../utils/requestUtils';
import { resetSales } from './salesActions';
import { resetNews } from './newsActions';
import { exitAllModals } from './modalActions';

function authFetching() {
  return {
    type: actionTypes.AUTH_FETCHING,
  }
}

function authSuccess(payload) {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload,
  };
}

function authFailure(payload) {
  return {
    type: actionTypes.AUTH_FAILURE,
    payload,
  };
}

function signUpFetching() {
  return {
    type: actionTypes.SIGNUP_FETCHING,
  }
}

function signUpSuccess(payload) {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    payload,
  };
}

function signUpFailure(payload) {
  return {
    type: actionTypes.SIGNUP_FAILURE,
    payload,
  };
}

function logoutFetching() {
  return {
    type: actionTypes.LOGOUT_FETCHING,
  }
}

function logoutSuccess(payload) {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    payload,
  };
}

function logoutFailure(payload) {
  return {
    type: actionTypes.LOGOUT_FAILURE,
    payload,
  };
}

function editUserFetching() {
  return {
    type: actionTypes.EDIT_USER_FETCHING,
  }
}

function editUserSuccess(payload) {
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
    payload,
  };
}

function editUserFailure(payload) {
  return {
    type: actionTypes.EDIT_USER_FAILURE,
    payload,
  };
}

export function auth(payload) {
  return (dispatch) => {
    dispatch(authFetching());
    const options = {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(payload),
    };

    return fetch(`${process.env.API_URL}/auth`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(authFailure(json));
        }
        dispatch(exitAllModals());
        return dispatch(authSuccess(json));
      })
      .catch((err) => {
        console.error(`Error authenticating user ${payload.username}: ${err}`);
        return dispatch(authFailure(err));
      });
  };
}

export function signUp(payload) {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/user`,
      options: {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(payload),
      },
      onFetching: signUpFetching,
      onSuccess: signUpSuccess,
      onFailure: signUpFailure,
      errorMessage: `Error signing up user ${payload.username}`,
      dispatch,
    };
    return actionApiCall(body);
  };
}

export function logout(payload) {
  return (dispatch) => {
    dispatch(resetNews());
    dispatch(resetSales());
    dispatch(push('/'));

    const body = {
      url: `${process.env.API_URL}/auth/logout`,
      options: {
        method: 'POST',
        headers: createHeaders(payload.token),
      },
      onFetching: logoutFetching,
      onSuccess: logoutSuccess,
      onFailure: logoutFailure,
      errorMessage: `Error logging out user ${payload.username}`,
      dispatch,
    };
    return actionApiCall(body);
  };
}

export function editUser(payload) {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/user/${payload.username}`,
      options: {
        method: 'PUT',
        headers: createHeaders(payload.token),
        body: JSON.stringify(payload),
      },
      onFetching: editUserFetching,
      onSuccess: editUserSuccess,
      onFailure: editUserFailure,
      errorMessage: `Error editing user ${payload.username}`,
      dispatch,
    };
    return actionApiCall(body);
  };
}
