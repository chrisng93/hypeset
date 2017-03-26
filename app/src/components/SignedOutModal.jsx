import React, { Component, PropTypes as T } from 'react';
import Modal from 'react-modal';

const propTypes = {
  exitSignedOutModal: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
  routeToHome: T.func.isRequired,
};

export default class SignedOutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.onClose = this.onClose.bind(this);
    this.onRouteToSignIn = this.onRouteToSignIn.bind(this);
    this.onRouteToHome = this.onRouteToHome.bind(this);
  }

  componentWillMount() {
    this.setState({ modalIsOpen: true });
  }

  onClose() {
    this.props.exitSignedOutModal();
    this.setState({ modalIsOpen: false });
  }

  onRouteToSignIn() {
    this.onClose();
    this.props.routeToSignIn();
  }

  onRouteToHome() {
    this.onClose();
    this.props.routeToHome();
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.onClose}
        shouldCloseOnOverlayClick={true}
        contentLabel="Modal"
      >
        <h1>Your session has expired.</h1>
        <p>
          Please
          <a className="link" onClick={this.onRouteToSignIn}> sign in </a>
          again or go back to the
          <a className="link" onClick={this.onRouteToHome}> home page</a>
        </p>
      </Modal>
    );
  }
}

SignedOutModal.propTypes = propTypes;
