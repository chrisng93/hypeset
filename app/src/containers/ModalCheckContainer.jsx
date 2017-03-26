import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { signInStateSelector, signedOutStateSelector } from '../selectors/modalSelectors';
import ModalCheck from '../components/ModalCheck';

const propTypes = {
  children: T.node.isRequired,
  signInModal: T.bool.isRequired,
  signedOutModal: T.bool.isRequired,
  exitSignInModal: T.func.isRequired,
  exitSignedOutModal: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
  routeToHome: T.func.isRequired,
};

function ModalCheckContainer(props) {
  return (
    <ModalCheck {...props} />
  );
}

function mapStateToProps(state) {
  return {
    signInModal: signInStateSelector(state),
    signedOutModal: signedOutStateSelector(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    exitSignInModal: bindActionCreators(actions.exitSignInModal, dispatch),
    exitSignedOutModal: bindActionCreators(actions.exitSignedOutModal, dispatch),
    routeToSignIn: bindActionCreators(actions.routeToSignInModal, dispatch),
    routeToHome: () => dispatch(push('/')),
  }
}

ModalCheckContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ModalCheckContainer);
