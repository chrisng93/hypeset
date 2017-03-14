/**
 * Created by chrisng on 3/14/17.
 */
import * as actionTypes from '../constants/actionTypes';
import { createHeaders } from '../utils/request';

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

export default function editUser(payload, token) {
  const options = {
    method: 'PUT',
    headers: createHeaders(token),
    body: JSON.stringify(payload),
  };

  return (dispatch) => {
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
