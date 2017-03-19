/**
 * Created by chrisng on 3/19/17.
 */
import * as actionTypes from '../constants/actionTypes.js';
import { createHeaders } from '../utils/request';

function getSalesSuccess(payload) {
  return {
    type: actionTypes.GET_SALES_SUCCESS,
    payload,
  }
}

function getSalesFailure(payload) {
  return {
    type: actionTypes.GET_SALES_FAILURE,
    payload,
  }
}

export default function getSales(payload) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      headers: createHeaders(payload.token),
    };

    return fetch(`${process.env.API_URL}/api/me/sales`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getSalesFailure(json));
        }
        return dispatch(getSalesSuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting sales: ${err}`);
        return dispatch(getSalesFailure(err));
      })
  };
}
