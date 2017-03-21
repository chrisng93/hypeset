/**
 * Created by chrisng on 3/19/17.
 */
import * as actionTypes from '../constants/actionTypes.js';
import { getInfo, createHeaders } from '../utils/requestUtils';

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
    return getInfo(body);
  };
}

export function getOwnSales(payload) {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/me/sales?offset=${payload.offset}&${payload.limit}`,
      options: {
        method: 'GET',
        headers: createHeaders(payload.token),
      },
      onFetching: getOwnSalesFetching,
      onSuccess: getOwnSalesSuccess,
      onFailure: getOwnSalesFailure,
      errorMessage: 'Error getting own sales',
      dispatch,
    };
    return getInfo(body);
  };
}
