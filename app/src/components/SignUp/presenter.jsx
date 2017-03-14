import React, { Component, PropTypes as T } from 'react';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, routeToNews } = nextProps;
    if (isAuthenticated) {
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
    const { onSignUp } = this.props;
    const { username, password, email, firstName, lastName } = this.state;
    return (
      <form className="sign-up-form">
        <label className="username">
          Username:
          <input type="text" name="username" value={username} onChange={e => this.handleInputChange(e, 'username')} />
        </label>
        <label className="password">
          Password:
          <input type="password" name="password" value={password} onChange={e => this.handleInputChange(e, 'password')} />
        </label>
        <label className="email">
          Email:
          <input type="email" name="email" value={email} onChange={e => this.handleInputChange(e, 'email')} />
        </label>
        <label className="first-name">
          First Name:
          <input type="text" name="first-name" value={firstName} onChange={e => this.handleInputChange(e, 'firstName')} />
        </label>
        <label className="last-name">
          Last Name:
          <input type="text" name="last-name" value={lastName} onChange={e => this.handleInputChange(e, 'lastName')} />
        </label>
        <input type="button" value="Sign up" onClick={() => onSignUp({ username, password, email, firstName, lastName })} />
      </form>
    );
  }
}

SignUp.propTypes = {
  onSignUp: T.func,
  routeToNews: T.func,
  isAuthenticated: T.boolean,
};
