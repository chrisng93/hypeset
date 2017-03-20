/**
 * Created by chrisng on 3/15/17.
 */
import * as actionTypes from '../constants/actionTypes.js';
import { createHeaders } from '../utils/requestUtils';

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
    dispatch(getAllNewsFetching());
    const options = {
      method: 'GET',
      headers: createHeaders(),
    };

    return fetch(`${process.env.API_URL}/api/news?offset=${payload.offset}`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getAllNewsFailure(json));
        }
        return dispatch(getAllNewsSuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting all news: ${err}`);
        return dispatch(getAllNewsFailure(err));
      })
  };
}

export function getOwnNews(payload) {
  return (dispatch) => {
    dispatch(getOwnNewsFetching());
    const options = {
      method: 'GET',
      headers: createHeaders(payload.token),
    };

    return fetch(`${process.env.API_URL}/api/me/news?offset=${payload.offset}`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getOwnNewsFailure(json));
        }
        return dispatch(getOwnNewsSuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting own news: ${err}`);
        return dispatch(getOwnNewsFailure(err));
      })
  };
}
