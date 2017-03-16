/**
 * Created by chrisng on 3/15/17.
 */
import { createSelector } from 'reselect';
import { toJS } from 'immutable';

const newsStateSelector = state => state.news.toJS();

export const newsSelector = createSelector(
  newsStateSelector,
  newsState => newsState.news
);

export const newsErrorSelector = createSelector(
  newsStateSelector,
  newsState => newsState.error
);
