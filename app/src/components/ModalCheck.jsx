import React, { PropTypes as T } from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import SignedOutModal from './SignedOutModal';

const propTypes = {
  children: T.node,
  signInModal: T.bool.isRequired,
  signUpModal: T.bool.isRequired,
  signedOutModal: T.bool.isRequired,
  isAuthenticated: T.bool.isRequired,
  exitSignInModal: T.func.isRequired,
  exitSignUpModal: T.func.isRequired,
  exitSignedOutModal: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
  routeToHome: T.func.isRequired,
};

export default function ModalCheck(props) {
  const { children, signInModal, signUpModal, signedOutModal, isAuthenticated, exitSignInModal,
    exitSignUpModal, exitSignedOutModal, routeToSignIn, routeToHome } = props;
  const signInModalProps = { exitSignInModal, isAuthenticated };
  const signUpModalProps = { exitSignUpModal, isAuthenticated };
  const signedOutModalProps = { exitSignedOutModal, routeToSignIn, routeToHome };
  return (
    <section className="modal">
      {signInModal ? <SignInModal {...signInModalProps} /> : null}
      {signUpModal ? <SignUpModal {...signUpModalProps} /> : null}
      {signedOutModal ? <SignedOutModal {...signedOutModalProps} /> : null}
      {children}
    </section>
  );
}

ModalCheck.propTypes = propTypes;
