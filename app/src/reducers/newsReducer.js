/**
 * Created by chrisng on 3/15/17.
 */
import { fromJS, List, Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';
import { formatDates } from '../utils/dateUtils';

const initialState = fromJS({
  news: new List(),
  isFetchingAllNews: false,
  isFetchingOwnNews: false,
  error: new Map(),
});

export default function news(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_NEWS_FETCHING:
      return state.set('isFetchingAllNews', true);
    case actionTypes.GET_ALL_NEWS_SUCCESS:
      return state.set('news', state.get('news').concat(new List(formatDates(payload.news))))
        .set('isFetchingAllNews', false)
        .set('error', new Map());
    case actionTypes.GET_ALL_NEWS_FAILURE:
      return state.set('isFetchingAllNews', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.GET_OWN_NEWS_FETCHING:
      return state.set('isFetchingOwnNews', true);
    case actionTypes.GET_OWN_NEWS_SUCCESS:
      return state.set('news', state.get('news').concat(new List(formatDates(payload.news))))
        .set('isFetchingOwnNews', false)
        .set('error', new Map());
    case actionTypes.GET_OWN_NEWS_FAILURE:
      return state.set('isFetchingOwnNews', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    case actionTypes.RESET_NEWS:
      return state.set('news', new List());

    default:
      return state;
  }
}
