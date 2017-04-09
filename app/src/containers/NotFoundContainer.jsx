/**
 * Stateful container for not found page
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import NotFound from '../components/NotFound';

const propTypes = {
  routeToHome: T.func.isRequired,
};

function NotFoundContainer(props) {
  return (
    <NotFound {...props} />
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    routeToHome: () => dispatch(push('/')),
  };
}

NotFoundContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundContainer);
