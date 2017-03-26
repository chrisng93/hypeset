import React, { Component, PropTypes as T } from 'react';
import Modal from 'react-modal';
import SignUpContainer from '../containers/SignUpContainer';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  exitSignUpModal: T.func.isRequired,
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
    this.props.exitSignUpModal();
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
        <SignUpContainer />
      </Modal>
    );
  }
}

SignInModal.propTypes = propTypes;
