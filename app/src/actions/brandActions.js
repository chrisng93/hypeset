/**
 * Created by chrisng on 3/14/17.
 */
import * as actionTypes from '../constants/actionTypes.js';
import { actionApiCall, createHeaders } from '../utils/requestUtils';

function getAllBrandsFetching() {
  return {
    type: actionTypes.GET_ALL_BRANDS_FETCHING,
  }
}

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

function getUserBrandsFetching() {
  return {
    type: actionTypes.GET_USER_BRANDS_FETCHING,
  }
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

function getBrandsByPopularityFetching() {
  return {
    type: actionTypes.GET_BRANDS_BY_POPULARITY_FETCHING,
  }
}

function getBrandsByPopularitySuccess(payload) {
  return {
    type: actionTypes.GET_BRANDS_BY_POPULARITY_SUCCESS,
    payload,
  }
}

function getBrandsByPopularityFailure(payload) {
  return {
    type: actionTypes.GET_BRANDS_BY_POPULARITY_FAILURE,
    payload,
  }
}

function addBrandFetching() {
  return {
    type: actionTypes.ADD_BRAND_FETCHING,
  }
}

function addBrandSuccess(payload) {
  return {
    type: actionTypes.ADD_BRAND_SUCCESS,
    payload,
  };
}

function addBrandFailure(payload) {
  return {
    type: actionTypes.ADD_BRAND_FAILURE,
    payload,
  };
}

function removeBrandFetching() {
  return {
    type: actionTypes.REMOVE_BRAND_FETCHING,
  }
}

function removeBrandSuccess(payload) {
  return {
    type: actionTypes.REMOVE_BRAND_SUCCESS,
    payload,
  };
}

function removeBrandFailure(payload) {
  return {
    type: actionTypes.REMOVE_BRAND_FAILURE,
    payload,
  };
}

function getBrandInfosFetching() {
  return {
    type: actionTypes.GET_BRAND_INFOS_FETCHING,
  }
}

function getBrandInfosSuccess(payload) {
  return {
    type: actionTypes.GET_BRAND_INFOS_SUCCESS,
    payload,
  }
}

function getBrandInfosFailure(payload) {
  return {
    type: actionTypes.GET_BRAND_INFOS_FAILURE,
    payload,
  }
}

export function getAllBrands() {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/brand`,
      options: {
        method: 'GET',
        headers: createHeaders(),
      },
      onFetching: getAllBrandsFetching,
      onSuccess: getAllBrandsSuccess,
      onFailure: getAllBrandsFailure,
      errorMessage: 'Error getting all brands',
      dispatch,
    };
    return actionApiCall(body);
  };
}

export function getUserBrands(payload) {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/me/brand`,
      options: {
        method: 'GET',
        headers: createHeaders(payload.token),
      },
      onFetching: getUserBrandsFetching,
      onSuccess: getUserBrandsSuccess,
      onFailure: getUserBrandsFailure,
      errorMessage: 'Error getting user brands',
      dispatch,
    };
    return actionApiCall(body);
  };
}

export function getBrandsByPopularity(payload) {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/analytics/brand/popularity?limit=${payload.limit}`,
      options: {
        method: 'GET',
        headers: createHeaders(),
      },
      onFetching: getBrandsByPopularityFetching,
      onSuccess: getBrandsByPopularitySuccess,
      onFailure: getBrandsByPopularityFailure,
      errorMessage: 'Error getting brands by popularity',
      dispatch,
    };
    return actionApiCall(body);
  };
}

export function addBrand(payload) {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/me/brand`,
      options: {
        method: 'PUT',
        headers: createHeaders(payload.token),
        body: JSON.stringify({ brands: payload.brands }),
      },
      onFetching: addBrandFetching,
      onSuccess: addBrandSuccess,
      onFailure: addBrandFailure,
      errorMessage: 'Error adding brands to user profile',
      dispatch,
    };
    return actionApiCall(body);
  };
}

export function removeBrand(payload) {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/me/brand`,
      options: {
        method: 'DELETE',
        headers: createHeaders(payload.token),
        body: JSON.stringify({ brands: payload.brands }),
      },
      onFetching: removeBrandFetching,
      onSuccess: removeBrandSuccess,
      onFailure: removeBrandFailure,
      errorMessage: 'Error removing brands from user profile',
      dispatch,
    };
    return actionApiCall(body);
  };
}

export function getBrandInfos(payload) {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/brand/info?brand=${payload.brand}`,
      options: {
        method: 'GET',
        headers: createHeaders(),
      },
      onFetching: getBrandInfosFetching,
      onSuccess: getBrandInfosSuccess,
      onFailure: getBrandInfosFailure,
      errorMessage: `Error getting brand info for ${payload.brand}`,
      dispatch,
    };
    return actionApiCall(body);
  };
}
