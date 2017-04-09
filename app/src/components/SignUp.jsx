/**
 * Stateless component for sign up
 */

import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  error: T.object,

  onSignUp: T.func.isRequired,
  routeToNews: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
  resetNews: T.func.isRequired,
  resetSales: T.func.isRequired,
};

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      usernameError: false,
      passwordError: false,
      emailError: false,
      emptyError: false,
    };
    this.validateSignUp = this.validateSignUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, error, routeToNews, resetNews, resetSales } = nextProps;
    error.message === 'username must be unique' ? this.setState({ usernameError: true }) : this.setState({ usernameError: false });
    error.message === 'Validation isEmail failed' ? this.setState({ emailError: true }) : this.setState({ emailError: false });
    error.message === 'Password must be at least 5 characters' ? this.setState({ passwordError: true }) : this.setState({ passwordError: false });
    if (isAuthenticated) {
      resetNews();
      resetSales();
      routeToNews();
    }
  }

  validateSignUp() {
    const { onSignUp } = this.props;
    const { username, password, email } = this.state;
    if (username === '' || password === '' || email === '') {
      this.setState({ emptyError: true });
      return;
    }
    onSignUp({ username, password, email });
  }

  handleInputChange(e, field) {
    const updatedState = {};
    updatedState[field] = e.target.value;
    this.setState(updatedState);
  }

  renderError(message) {
    return (
      <p className="error">
        {message}
      </p>
    );
  }

  render() {
    const { routeToSignIn } = this.props;
    const { username, password, email, usernameError, passwordError, emailError, emptyError } = this.state;
    return (
      <section className="sign-up">
        <section className="sign-up-container">
          <section className="sign-up-title">
            <h1>
              Sign up
            </h1>
          </section>
          <form className="sign-up-form">
            <label className={`sign-up-form-username ${usernameError ? 'input-error' : ''}`}>
              <input
                type="text"
                className="sign-up-form-username-input"
                placeholder="Username"
                value={username}
                onChange={e => this.handleInputChange(e, 'username')}
              />
              {usernameError ? this.renderError('Username taken') : null}
            </label>
            <label className="sign-up-form-password">
              <input
                type="password"
                className="sign-up-form-password-input"
                placeholder="Password"
                value={password}
                onChange={e => this.handleInputChange(e, 'password')}
              />
              {passwordError ? this.renderError('Password must be 5 or more characters') : null}
            </label>
            <label className={`sign-up-form-email ${emailError ? 'input-error' : ''}`}>
              <input
                type="email"
                className="sign-up-form-email-input"
                placeholder="Email"
                value={email}
                onChange={e => this.handleInputChange(e, 'email')}
              />
              {emailError ? this.renderError('Invalid email') : null}
            </label>
            {emptyError ? this.renderError('Please fill in all fields') : null}
            <button type="button" onClick={this.validateSignUp}>
              Sign Up
            </button>
          </form>
          <p className="sign-up-route-sign-in">
            Already have an account? <a className="link" onClick={routeToSignIn}>Sign in</a>
          </p>
          <img src={`${process.env.S3_URL}/intro-1.jpg`} />
        </section>
      </section>
    );
  }
}

SignUp.propTypes = propTypes;
