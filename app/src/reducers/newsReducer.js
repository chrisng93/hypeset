/**
 * Created by chrisng on 3/15/17.
 */
import { fromJS, List, Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  news: new List(),
  isFetchingNews: false,
  error: new Map(),
});

export default function news(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_NEWS_FETCHING:
      return state.set('isFetchingNews', true);
    case actionTypes.GET_NEWS_SUCCESS:
      return state.set('news', state.get('news').concat(new List(payload.news)))
        .set('isFetchingNews', false)
        .set('error', new Map());
    case actionTypes.GET_NEWS_FAILURE:
      return state.set('isFetchingNews', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    default:
      return state;
  }
}
