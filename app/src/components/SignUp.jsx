import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
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
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, routeToNews, resetNews, resetSales } = nextProps;
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

  // TODO: form validation
  render() {
    const { onSignUp, routeToSignIn } = this.props;
    const { username, password, email, firstName, lastName } = this.state;
    return (
      <section className="sign-up">
        <img src={require('../../assets/intro-bg1.jpg')} className="bg" />
        <section className="sign-up-container">
          <h1>hypeset</h1>
          <form className="sign-up-form">
            <input
              type="text"
              className="sign-up-form-username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={e => this.handleInputChange(e, 'username')}
            />
            <input
              type="password"
              className="sign-up-form-password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={e => this.handleInputChange(e, 'password')}
            />
            <input
              type="email"
              className="sign-up-form-email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => this.handleInputChange(e, 'email')}
            />
            <button type="button" onClick={() => onSignUp({ username, password, email, firstName, lastName })}>Sign Up</button>
          </form>
          <p>Already have an account? <a className="link" onClick={routeToSignIn}>Sign in</a></p>
        </section>
      </section>
    );
  }
}

SignUp.propTypes = propTypes;
