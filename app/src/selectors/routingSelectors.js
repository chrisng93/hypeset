/**
 * Create selectors for routing store
 */

import { createSelector } from 'reselect'

const routingStateSelector = state => state.routing;

const locationBeforeTransitionsSelector = createSelector(
  routingStateSelector,
  routingState => routingState.locationBeforeTransitions
);

export const pathnameSelector = createSelector(
  locationBeforeTransitionsSelector,
  locationBeforeTransitions => locationBeforeTransitions.pathname
);
