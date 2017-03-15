/**
 * Created by chrisng on 3/14/17.
 */
import { createSelector } from 'reselect'
import { toJS } from 'immutable';

const userStateSelector = state => state.user.toJS();

export const userSelector = createSelector(
  userStateSelector,
  userState => userState.user
);

export const tokenSelector = createSelector(
  userStateSelector,
  userState => userState.token
);

export const isAuthenticatedSelector = createSelector(
  userStateSelector,
  userState => userState.isAuthenticated
);

export const userErrorSelector = createSelector(
  userStateSelector,
  userState => userState.error
);
