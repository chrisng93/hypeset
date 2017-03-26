import React, { PropTypes as T } from 'react';
import SignInModal from './SignInModal';
import SignedOutModal from './SignedOutModal';

const propTypes = {
  children: T.node.isRequired,
  signInModal: T.bool.isRequired,
  signedOutModal: T.bool.isRequired,
  exitSignInModal: T.func.isRequired,
  exitSignedOutModal: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
  routeToHome: T.func.isRequired,
};

export default function ModalCheck(props) {
  const { children, signInModal, signedOutModal, exitSignInModal, exitSignedOutModal, routeToSignIn, routeToHome } = props;
  const signInModalProps = { exitSignInModal };
  const signedOutModalProps = { exitSignedOutModal, routeToSignIn, routeToHome };
  return (
    <section className="modal">
      {signInModal ? <SignInModal {...signInModalProps} /> : null}
      {signedOutModal ? <SignedOutModal {...signedOutModalProps} /> : null}
      {children}
    </section>
  );
}

ModalCheck.propTypes = propTypes;
