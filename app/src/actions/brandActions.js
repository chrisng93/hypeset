/**
 * Created by chrisng on 3/14/17.
 */
import * as actionTypes from '../constants/actionTypes.js';
import { createHeaders } from '../utils/requestUtils';

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

function getBrandsByPopularityBrandsFetching() {
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

export function getAllBrands(payload) {
  return (dispatch) => {
    dispatch(getAllBrandsFetching());
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
    dispatch(getUserBrandsFetching());
    const options = {
      method: 'GET',
      headers: createHeaders(payload.token),
    };

    fetch(`${process.env.API_URL}/api/me/brand`, options)
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

export function getBrandsByPopularity(payload) {
  return (dispatch) => {
    dispatch(getBrandsByPopularityBrandsFetching());
    const options = {
      method: 'GET',
      headers: createHeaders(payload.token),
    };

    fetch(`${process.env.API_URL}/api/analytics/brand/popularity/${payload.limit}`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getBrandsByPopularityFailure(json));
        }
        return dispatch(getBrandsByPopularitySuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting brands by popularity: ${err}`);
        return dispatch(getBrandsByPopularityFailure(err));
      });
  }
}

export function addBrand(payload) {
  return (dispatch) => {
    dispatch(addBrandFetching());
    const options = {
      method: 'PUT',
      headers: createHeaders(payload.token),
      body: JSON.stringify({ brands: payload.brands }),
    };

    fetch(`${process.env.API_URL}/api/me/brand`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(addBrandFailure(json));
        }
        return dispatch(addBrandSuccess(json));
      })
      .catch((err) => {
        console.error(`Error adding brands to user profile: ${err}`);
        return dispatch(addBrandFailure(err));
      });
  };
}

export function removeBrand(payload) {
  return (dispatch) => {
    dispatch(removeBrandFetching());
    const options = {
      method: 'DELETE',
      headers: createHeaders(payload.token),
      body: JSON.stringify({ brands: payload.brands }),
    };

    fetch(`${process.env.API_URL}/api/me/brand`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(removeBrandFailure(json));
        }
        return dispatch(removeBrandSuccess(json));
      })
      .catch((err) => {
        console.error(`Error removing brands from user profile: ${err}`);
        return dispatch(removeBrandFailure(err));
      });
  };
}
