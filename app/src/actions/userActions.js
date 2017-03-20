/**
 * Created by chrisng on 3/19/17.
 */
import * as actionTypes from '../constants/actionTypes.js';
import { createHeaders } from '../utils/requestUtils';

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
        return dispatch(authSuccess(json));
      })
      .catch((err) => {
        console.error(`Error authenticating user: ${err}`);
        return dispatch(authFailure(err));
      });
  };
}

export function editUser(payload, token) {
  return (dispatch) => {
    dispatch(editUserFetching());
    const options = {
      method: 'PUT',
      headers: createHeaders(token),
      body: JSON.stringify(payload),
    };

    fetch(`${process.env.API_URL}/api/user/${payload.username}`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(editUserFailure(json));
        }
        return dispatch(editUserSuccess(json));
      })
      .catch((err) => {
        console.error(`Error signing up user: ${err}`);
        dispatch(editUserFailure(err));
      });
  };
}

export function signUp(payload) {
  return (dispatch) => {
    dispatch(signUpFetching());
    const options = {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(payload),
    };

    return fetch(`${process.env.API_URL}/api/user`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(signUpFailure(json));
        }
        return dispatch(signUpSuccess(json));
      })
      .catch((err) => {
        console.error(`Error signing up user: ${err}`);
        return dispatch(signUpFailure(err));
      });
  }
}