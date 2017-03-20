/**
 * Created by chrisng on 3/14/17.
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
