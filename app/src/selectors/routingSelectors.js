/**
 * Created by chrisng on 3/14/17.
 */
import { createSelector } from 'reselect'

const routingStateSelector = state => state.routing;

export const pathnameSelector = createSelector(
  routingStateSelector,
  routingState => routingState.pathname
);
