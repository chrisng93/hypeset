/**
 * Create selectors for persist store
 */

import { createSelector } from 'reselect';

const persistStateSelector = state => state.persist;

export const rehydratedSelector = createSelector(
  persistStateSelector,
  persistState => persistState.rehydrated
);
