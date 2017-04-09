/**
 * Utils for API calls
 */

import * as actions from '../actions';
import * as actionTypes from '../constants/actionTypes';

function resetUser() {
  return {
    type: actionTypes.RESET_USER,
  }
}

export const createHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const actionApiCall = (body) => {
  const { url, options, onFetching, onSuccess, onFailure, errorMessage, dispatch } = body;
  dispatch(onFetching());

  return fetch(url, options)
    .then(response => response.json())
    .then((json) => {
      if (!json.success) {
        if (json.message === 'Invalid token') {
          dispatch(resetUser);
        }
        return dispatch(onFailure(json));
      }
      return dispatch(onSuccess(json));
    })
    .catch((err) => {
      console.error(`${errorMessage}: ${err}`);
      return dispatch(onFailure(err));
    });
};
