/**
 * Created by chrisng on 3/12/17.
 */
import { push } from 'react-router-redux';
import * as actionTypes from '../constants/actionTypes';
import { createHeaders, request } from '../utils/request';

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

export default function signUp(payload) {
  return (dispatch) => {
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
