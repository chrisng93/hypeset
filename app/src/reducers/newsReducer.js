/**
 * Created by chrisng on 3/15/17.
 */
import { fromJS, List, Map } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = fromJS({

});

export default function news(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_NEWS_SUCCESS:
      return state;
    case actionTypes.GET_NEWS_FAILURE:
      return state;

    default:
      return state;
  }
}
