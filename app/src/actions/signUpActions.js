/**
 * Created by chrisng on 3/12/17.
 */
import * as actionTypes from '../constants/actionTypes';

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
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
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
