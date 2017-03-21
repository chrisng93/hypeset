/**
 * Created by chrisng on 3/14/17.
 */
import { createSelector } from 'reselect'

const userStateSelector = state => state.user;

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

export const isFetchingAuth = createSelector(
  userStateSelector,
  userState => userState.isFetchingAuth
);

export const isFetchingSignup = createSelector(
  userStateSelector,
  userState => userState.isFetchingSignup
);

export const isFetchingLogout = createSelector(
  userStateSelector,
  userState => userState.isFetchingLogout
);

export const isFetchingEditUser = createSelector(
  userStateSelector,
  userState => userState.isFetchingEditUser
);

export const userErrorSelector = createSelector(
  userStateSelector,
  userState => userState.error
);
