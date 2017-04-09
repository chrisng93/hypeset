/**
 * Actions (primarily API calls) for sales
 */

import * as actionTypes from '../constants/actionTypes.js';
import { actionApiCall, createHeaders } from '../utils/requestUtils';

function getAllSalesFetching() {
  return {
    type: actionTypes.GET_ALL_SALES_FETCHING,
  }
}

function getAllSalesSuccess(payload) {
  return {
    type: actionTypes.GET_ALL_SALES_SUCCESS,
    payload,
  }
}

function getAllSalesFailure(payload) {
  return {
    type: actionTypes.GET_ALL_SALES_FAILURE,
    payload,
  }
}

function getOwnSalesFetching() {
  return {
    type: actionTypes.GET_OWN_SALES_FETCHING,
  }
}

function getOwnSalesSuccess(payload) {
  return {
    type: actionTypes.GET_OWN_SALES_SUCCESS,
    payload,
  }
}

function getOwnSalesFailure(payload) {
  return {
    type: actionTypes.GET_OWN_SALES_FAILURE,
    payload,
  }
}

export function resetSales() {
  return {
    type: actionTypes.RESET_SALES,
  }
}

export function getAllSales(payload) {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/sales?offset=${payload.offset}&limit=${payload.limit}`,
      options: {
        method: 'GET',
        headers: createHeaders(),
      },
      onFetching: getAllSalesFetching,
      onSuccess: getAllSalesSuccess,
      onFailure: getAllSalesFailure,
      errorMessage: 'Error getting all sales',
      dispatch,
    };
    return actionApiCall(body);
  };
}

export function getOwnSales(payload) {
  return (dispatch) => {
    dispatch(getOwnSalesFetching());
    const options = {
      method: 'GET',
      headers: createHeaders(payload.token),
    };

    return fetch(`${process.env.API_URL}/api/me/sales?offset=${payload.offset}&limit=${payload.limit}`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getOwnSalesFailure(json));
        }
        json.replace = payload.replace;
        return dispatch(getOwnSalesSuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting own sales: ${err}`);
        return dispatch(getOwnSalesFailure(err));
      });
  };
}
