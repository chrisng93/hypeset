/**
 * Actions (primarily API calls) for news
 */

import * as actionTypes from '../constants/actionTypes.js';
import { actionApiCall, createHeaders } from '../utils/requestUtils';

function getAllNewsFetching() {
  return {
    type: actionTypes.GET_ALL_NEWS_FETCHING,
  };
}

function getAllNewsSuccess(payload) {
  return {
    type: actionTypes.GET_ALL_NEWS_SUCCESS,
    payload,
  };
}

function getAllNewsFailure(payload) {
  return {
    type: actionTypes.GET_ALL_NEWS_FAILURE,
    payload,
  };
}

function getOwnNewsFetching() {
  return {
    type: actionTypes.GET_OWN_NEWS_FETCHING,
  };
}

function getOwnNewsSuccess(payload) {
  return {
    type: actionTypes.GET_OWN_NEWS_SUCCESS,
    payload,
  };
}

function getOwnNewsFailure(payload) {
  return {
    type: actionTypes.GET_OWN_NEWS_FAILURE,
    payload,
  };
}

export function resetNews() {
  return {
    type: actionTypes.RESET_NEWS,
  }
}

export function getAllNews(payload) {
  return (dispatch) => {
    const body = {
      url: `${process.env.API_URL}/api/news?offset=${payload.offset}&limit=${payload.limit}`,
      options: {
        method: 'GET',
        headers: createHeaders(),
      },
      onFetching: getAllNewsFetching,
      onSuccess: getAllNewsSuccess,
      onFailure: getAllNewsFailure,
      errorMessage: 'Error getting all news',
      dispatch,
    };
    return actionApiCall(body);
  };
}

export function getOwnNews(payload) {
  return (dispatch) => {
    dispatch(getOwnNewsFetching());
    const options = {
      method: 'GET',
      headers: createHeaders(payload.token),
    };

    return fetch(`${process.env.API_URL}/api/me/news?offset=${payload.offset}&limit=${payload.limit}`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getOwnNewsFailure(json));
        }
        json.replace = payload.replace;
        return dispatch(getOwnNewsSuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting own news: ${err}`);
        return dispatch(getOwnNewsFailure(err));
      });
  };
}
