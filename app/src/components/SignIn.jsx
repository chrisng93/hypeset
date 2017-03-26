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
    this.renderError = this.renderError.bind(this);
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

  renderError(message) {
    return (
      <p className="error">{message}</p>
    );
  }

  render() {
    const { onAuth, routeToSignUp } = this.props;
    const { username, password, usernameError, passwordError } = this.state;
    return (
      <section className="sign-in">
        {/*<img src={require('../../assets/intro-bg1.jpg')} className="bg" />*/}
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
              {usernameError ? this.renderError('Invalid username') : null}
            </label>
            <label className="sign-in-form-password">
              <input
                type="password"
                className={`sign-in-form-password-input ${passwordError ? 'input-error' : ''}`}
                value={password}
                placeholder="Password"
                onChange={e => this.handleInputChange(e, 'password')}
              />
              {passwordError ? this.renderError('Incorrect password') : null}
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
