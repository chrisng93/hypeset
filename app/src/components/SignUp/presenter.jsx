import React, { Component, PropTypes as T } from 'react';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e, field) {
    const updatedState = {};
    updatedState[field] = e.target.value;
    this.setState(updatedState);
  }

  // TODO: form validation
  render() {
    const { onSignUp } = this.props;
    const { username, password, email } = this.state;
    return (
      <div className="sign-up-form">
        <div className="username">
          Username
          <input type="text" name="username" value={username} onChange={e => this.handleInputChange(e, 'username')} />
        </div>
        <div className="password">
          Password
          <input type="password" name="password" value={password} onChange={e => this.handleInputChange(e, 'password')} />
        </div>
        <div>
          Email
          <input type="email" name="email" value={email} onChange={e => this.handleInputChange(e, 'email')} />
        </div>
        <button type="button" onClick={() => onSignUp({ username, password, email })}>Sign Up</button>
      </div>
    );
  }
}

SignUp.propTypes = {
  onSignUp: T.func,
};
