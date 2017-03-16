/**
 * Created by chrisng on 3/15/17.
 */
import * as actionTypes from '../constants/actionTypes.js';
import { createHeaders } from '../utils/request';

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

  };
}
