/**
 * Created by chrisng on 3/15/17.
 */
import * as actionTypes from '../constants/actionTypes.js';
import { createHeaders } from '../utils/requestUtils';

function getNewsSuccess(payload) {
  return {
    type: actionTypes.GET_NEWS_SUCCESS,
    payload,
  };
}

function getNewsFailure(payload) {
  return {
    type: actionTypes.GET_NEWS_FAILURE,
    payload,
  };
}

export default function getNews(payload) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      headers: createHeaders(payload.token),
    };

    return fetch(`${process.env.API_URL}/api/me/news/${payload.offset}`, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          return dispatch(getNewsFailure(json));
        }
        return dispatch(getNewsSuccess(json));
      })
      .catch((err) => {
        console.error(`Error getting news: ${err}`);
        return dispatch(getNewsFailure(err));
      })
  };
}
