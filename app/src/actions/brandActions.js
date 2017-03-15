/**
 * Created by chrisng on 3/14/17.
 */
import * as actionTypes from '../constants/actionTypes.js';
import { createHeaders } from '../utils/request';

function getAllBrandsSuccess(payload) {
  return {
    type: actionTypes.GET_ALL_BRANDS_SUCCESS,
    payload,
  };
}

function getAllBrandsFailure(payload) {
  return {
    type: actionTypes.GET_ALL_BRANDS_FAILURE,
    payload,
  };
}

function getUserBrandsSuccess(payload) {
  return {
    type: actionTypes.GET_USER_BRANDS_SUCCESS,
    payload,
  };
}

function getUserBrandsFailure(payload) {
  return {
    type: actionTypes.GET_USER_BRANDS_FAILURE,
    payload,
  };
}

export function getAllBrands(payload) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      headers: createHeaders(payload.token),
    };

    fetch(`${process.env.API_URL}/api/brand`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getAllBrandsFailure(json));
        }
        return dispatch(getAllBrandsSuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting all brands: ${err}`);
        return dispatch(getAllBrandsFailure(err));
      });
  };
}

export function getUserBrands(payload) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      headers: createHeaders(payload.token),
    };

    fetch(`${process.env.API_URL}/api/user/me/brand`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getUserBrandsFailure(json));
        }
        return dispatch(getUserBrandsSuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting user brands: ${err}`);
        return dispatch(getUserBrandsFailure(err));
      });
  };
}
