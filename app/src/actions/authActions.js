/**
 * Created by chrisng on 3/11/17.
 */
import { push } from 'react-router-redux';
import * as actionTypes from '../constants/actionTypes.js';

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

export default function auth(payload) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
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
