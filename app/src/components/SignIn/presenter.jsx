import React, { Component, PropTypes as T } from 'react';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e, field) {
    const updatedState = {};
    updatedState[field] = e.target.value;
    this.setState(updatedState);
  }

  render() {
    const { onAuth, routeToSignUp } = this.props;
    const { username, password } = this.state;
    return (
      <div>
        <div className="sign-in-form">
          <div className="username">
            Username
            <input type="text" value={username} onChange={e => this.handleInputChange(e, 'username')} />
          </div>
          <div className="password">
            Password
            <input type="password" value={password} onChange={e => this.handleInputChange(e, 'password')} />
          </div>
          <button type="button" onClick={() => onAuth({ username, password })}>Click here to sign in</button>
        </div>
        <button type="button" onClick={routeToSignUp}>Click here to sign up</button>
      </div>
    );
  }
}

SignIn.propTypes = {
  onAuth: T.func,
  routeToSignUp: T.func,
};
