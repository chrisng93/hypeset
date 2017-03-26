import React, { Component, PropTypes as T } from 'react';
import Modal from 'react-modal';
import SignInContainer from '../containers/SignInContainer';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  exitSignInModal: T.func.isRequired,
};

export default class SignInModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.onClose = this.onClose.bind(this);
  }

  componentWillMount() {
    this.setState({ modalIsOpen: true });
  }

  onClose() {
    this.props.exitSignInModal();
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.onClose}
        shouldCloseOnOverlayClick={true}
        contentLabel="Modal"
      >
        <SignInContainer />
      </Modal>
    );
  }
}

SignInModal.propTypes = propTypes;
