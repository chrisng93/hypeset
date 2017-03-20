/**
 * Created by chrisng on 3/15/17.
 */
import { fromJS, List, Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  news: new List(),
  error: new Map(),
});

export default function news(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_NEWS_SUCCESS:
      return state.set('news', state.get('news').concat(new List(payload.news)))
        .set('error', new Map());
    case actionTypes.GET_NEWS_FAILURE:
      return state.setIn(['error', 'status'], true)
        .setIn(['error', 'message'], payload.message);

    default:
      return state;
  }
}
