/**
 * Stateful container for components requiring authentication
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isAuthenticatedSelector } from '../selectors/userSelectors';
import { rehydratedSelector } from '../selectors/persistSelectors';
import EnsureAuthentication from '../components/EnsureAuthentication';

const propTypes = {
  children: T.node.isRequired,
  isAuthenticated: T.bool.isRequired,
  rehydrated: T.bool.isRequired,

  routeToNews: T.func.isRequired,
};

function EnsureAuthenticationContainer(props) {
  return(
    <EnsureAuthentication {...props} />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    rehydrated: rehydratedSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToNews: () => dispatch(push('/news')),
  };
}

EnsureAuthenticationContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthenticationContainer);
