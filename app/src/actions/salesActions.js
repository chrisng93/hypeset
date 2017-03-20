/**
 * Created by chrisng on 3/19/17.
 */
import * as actionTypes from '../constants/actionTypes.js';
import { createHeaders } from '../utils/requestUtils';

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
    dispatch(getAllSalesFetching());
    const options = {
      method: 'GET',
      headers: createHeaders(),
    };

    return fetch(`${process.env.API_URL}/api/sales?offset=${payload.offset}`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getAllSalesFailure(json));
        }
        return dispatch(getAllSalesSuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting all sales: ${err}`);
        return dispatch(getAllSalesFailure(err));
      })
  };
}

export function getOwnSales(payload) {
  return (dispatch) => {
    dispatch(getOwnSalesFetching());
    const options = {
      method: 'GET',
      headers: createHeaders(payload.token),
    };

    return fetch(`${process.env.API_URL}/api/me/sales?offset=${payload.offset}`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getOwnSalesFailure(json));
        }
        return dispatch(getOwnSalesSuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting own sales: ${err}`);
        return dispatch(getOwnSalesFailure(err));
      })
  };
}
