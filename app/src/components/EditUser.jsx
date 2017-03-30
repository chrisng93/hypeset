import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  // don't have .isRequired because React doesn't recognize the props when you use React.cloneElement
  user: T.object,
  token: T.string,
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
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
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

  render() {
    // TODO: message saying that you've successfully updated the user
    // TODO: form validation/error checking
    const { user, routeToProfile } = this.props;
    const { password, firstName, lastName, email } = this.state;
    return (
      <section className="edit-user-container">
        <form className="edit-user">
          <label className="username" name="username">
            <span className="field">Username:</span>
            <span className="value">{user.username}</span>
          </label>
          <label className="password" name="password">
            <span className="field">Password:</span>
            <span className="value">
              <input type="password" name="password" value={password} placeholder="**********" onChange={e => this.handleInputChange(e, 'password')} />
            </span>
          </label>
          <label className="email" name="password">
            <span className="field">Email:</span>
            <span className="value">
              <input type="email" name="email" value={email} placeholder={user.email} onChange={e => this.handleInputChange(e, 'email')} />
            </span>
          </label>
          <label className="first-name" name="first-name">
            <span className="field">First name:</span>
            <span className="value">
              <input type="text" name="first-name" value={firstName} placeholder={user.firstName} onChange={e => this.handleInputChange(e, 'firstName')} />
            </span>
          </label>
          <label className="last-name" name="last-name">
            <span className="field">Last name:</span>
            <span className="value">
              <input type="text" name="last-name" value={lastName} placeholder={user.lastName} onChange={e => this.handleInputChange(e, 'lastName')} />
            </span>
          </label>
          <button onClick={(e) => this.submitForm(e)}>Submit</button>
          <button onClick={routeToProfile}>Cancel</button>
        </form>
        <img src="https://s3-us-west-1.amazonaws.com/hypeset/profile-2.jpg" />
      </section>
    );
  }
}

EditUser.propTypes = propTypes;
