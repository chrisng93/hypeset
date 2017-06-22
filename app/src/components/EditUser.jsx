/**
 * "Dumb" component for editing user info
 */

import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  // don't have .isRequired because React doesn't recognize the props when you use React.cloneElement
  user: T.object,
  token: T.string,
  error: T.object,

  onEditUser: T.func,
  routeToProfile: T.func,
};

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      emailError: false,
      passwordError: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    error.message === 'Validation isEmail failed' ? this.setState({ emailError: true }) : this.setState({ emailError: false });
    error.message === 'Password must be at least 5 characters' ? this.setState({ passwordError: true }) : this.setState({ passwordError: false });
  }

  handleInputChange(e, field) {
    e.preventDefault();
    const updatedState = {};
    updatedState[field] = e.target.value;
    this.setState(updatedState);
  }

  submitForm(e) {
    e.preventDefault();
    const { user, token, onEditUser } = this.props;
    const { password, firstName, lastName, email } = this.state;
    const updatedFields = { username: user.username };
    if (password.length) {
      updatedFields.password = password;
    }
    if (firstName.length) {
      updatedFields.firstName = firstName;
    }
    if (lastName.length) {
      updatedFields.lastName = lastName;
    }
    if (email.length) {
      updatedFields.email = email;
    }
    updatedFields.token = token;
    onEditUser(updatedFields);
    this.setState({ password: '', firstName: '', lastName: '', email: '' });
  }

  renderError(msg) {
    return (
      <p className="error">
        {msg}
      </p>
    );
  }

  render() {
    const { user } = this.props;
    const { password, firstName, lastName, email, emailError, passwordError } = this.state;
    return (
      <section className="edit-user-container">
        <form className="edit-user">
          <label className="username" name="username">
            <span className="value">{user.username}</span>
          </label>
          <label className="password" name="password">
            <span className="value">
              <input
                type="password"
                name="password"
                value={password}
                placeholder="**********"
                onChange={e => this.handleInputChange(e, 'password')}
              />
              {passwordError ? this.renderError('Password must be at least 5 characters') : ''}
            </span>
          </label>
          <label className="email" name="password">
            <span className="value">
              <input
                type="email"
                name="email"
                value={email}
                placeholder={user.email || 'email'}
                onChange={e => this.handleInputChange(e, 'email')}
              />
              {emailError ? this.renderError('Invalid email') : ''}
            </span>
          </label>
          <label className="first-name" name="first-name">
            <span className="value">
              <input
                type="text"
                name="first-name"
                value={firstName}
                placeholder={user.firstName || 'first name'}
                onChange={e => this.handleInputChange(e, 'firstName')}
              />
            </span>
          </label>
          <label className="last-name" name="last-name">
            <span className="value">
              <input
                type="text"
                name="last-name"
                value={lastName}
                placeholder={user.lastName || 'last name'}
                onChange={e => this.handleInputChange(e, 'lastName')}
              />
            </span>
          </label>
          <button onClick={e => this.submitForm(e)}>
            Submit
          </button>
        </form>
        <img src={`${process.env.S3_URL}/profile-1.jpg`} />
      </section>
    );
  }
}

EditUser.propTypes = propTypes;
