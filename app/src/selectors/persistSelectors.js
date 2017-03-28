/**
 * Created by chrisng on 3/28/17.
 */
import { createSelector } from 'reselect';

const persistStateSelector = state => state.persist;

export const rehydratedSelector = createSelector(
  persistStateSelector,
  persistState => persistState.rehydrated
);
