import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  error: T.object,
  onAuth: T.func.isRequired,
  routeToSignUp: T.func.isRequired,
  routeToNews: T.func.isRequired,
  resetNews: T.func.isRequired,
  resetSales: T.func.isRequired,
};

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderUsernameError = this.renderUsernameError.bind(this);
    this.renderPasswordError = this.renderPasswordError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, error, routeToNews, resetNews, resetSales } = nextProps;
    error.message === 'User not found' ? this.setState({ usernameError: true }) : this.setState({ usernameError: false });
    error.message === 'Incorrect password combination' ? this.setState({ passwordError: true }) : this.setState({ passwordError: false });
    if (isAuthenticated) {
      resetNews();
      resetSales();
      routeToNews();
    }
  }

  handleInputChange(e, field) {
    const updatedState = {};
    updatedState[field] = e.target.value;
    this.setState(updatedState);
  }

  renderUsernameError() {
    if (!this.state.usernameError) {
      return null;
    }
    return (
      <p className="error">Invalid username</p>
    );
  }

  renderPasswordError() {
    if (!this.state.passwordError) {
      return null;
    }
    return (
      <p className="error">Password incorrect</p>
    );
  }

  render() {
    const { onAuth, routeToSignUp } = this.props;
    const { username, password, usernameError, passwordError } = this.state;
    return (
      <section className="sign-in">
        <img src={require('../../assets/intro-bg1.jpg')} className="bg" />
        <section className="sign-in-container">
          <h1>hypeset</h1>
          <form className="sign-in-form">
            <label className="sign-in-form-username">
              <input
                type="text"
                className={`sign-in-form-username-input ${usernameError ? 'input-error' : ''}`}
                value={username}
                placeholder="Username"
                onChange={e => this.handleInputChange(e, 'username')}
              />
              {this.renderUsernameError()}
            </label>
            <label className="sign-in-form-password">
              <input
                type="password"
                className={`sign-in-form-password-input ${passwordError ? 'input-error' : ''}`}
                value={password}
                placeholder="Password"
                onChange={e => this.handleInputChange(e, 'password')}
              />
              {this.renderPasswordError()}
            </label>
            <button type="button" onClick={() => onAuth({ username, password })}>Sign in</button>
          </form>
          <p>Don't have an account? <a className="link" onClick={routeToSignUp}>Sign up</a></p>
        </section>
      </section>
    );
  }
}

SignIn.propTypes = propTypes;
