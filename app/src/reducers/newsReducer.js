/**
 * Created by chrisng on 3/15/17.
 */
import * as actionTypes from '../constants/actionTypes';
import { formatDates } from '../utils/dateUtils';

const freshErrorState = {
  status: false,
  message: '',
};

const initialState = {
  news: [],
  isFetchingAllNews: false,
  isFetchingOwnNews: false,
  error: freshErrorState,
};

export default function news(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_NEWS_FETCHING:
      return { ...state, isFetchingAllNews: true };
    case actionTypes.GET_ALL_NEWS_SUCCESS:
      return {
        ...state,
        news: state.news.concat(formatDates(payload.news)),
        isFetchingAllNews: false,
        error: freshErrorState,
      };
    case actionTypes.GET_ALL_NEWS_FAILURE:
      return {
        ...state,
        isFetchingAllNews: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.GET_OWN_NEWS_FETCHING:
      return { ...state, isFetchingOwnNews: true };
    case actionTypes.GET_OWN_NEWS_SUCCESS:
      return {
        ...state,
        news: state.news.concat(formatDates(payload.news)),
        isFetchingOwnNews: false,
        error: freshErrorState,
      };
    case actionTypes.GET_OWN_NEWS_FAILURE:
      return {
        ...state,
        isFetchingOwnNews: false,
        error: { status: true, message: payload.message },
      };

    case actionTypes.RESET_NEWS:
      return { ...state, news: [] };

    default:
      return state;
  }
}
