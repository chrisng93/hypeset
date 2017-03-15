import React, { Component, PropTypes as T } from 'react';

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

  submitForm() {
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
    onEditUser(updatedFields, token);
    this.setState({ password: '', firstName: '', lastName: '', email: '' });
  }

  render() {
    // TODO: message saying that you've successfully updated the user
    // TODO: form validation
    // TODO: error message handling
    const { user, routeToProfile } = this.props;
    const { password, firstName, lastName, email } = this.state;
    return (
      <div className="edit-user">
        <div className="username">
          Username: {user.username}
        </div>
        <div className="password">
          Password:
          <input type="password" name="password" value={password} placeholder="**********" onChange={e => this.handleInputChange(e, 'password')} />
        </div>
        <div className="email">
          Email:
          <input type="email" name="email" value={email} placeholder={user.email} onChange={e => this.handleInputChange(e, 'email')} />
        </div>
        <div className="first-name">
          First name:
          <input type="text" name="first-name" value={firstName} placeholder={user.firstName} onChange={e => this.handleInputChange(e, 'firstName')} />
        </div>
        <div className="last-name">
          Last name:
          <input type="text" name="last-name" value={lastName} placeholder={user.lastName} onChange={e => this.handleInputChange(e, 'lastName')} />
        </div>
        <input type="button" value="Submit changes" onClick={this.submitForm} />
        <input type="button" value="Cancel" onClick={routeToProfile} />
      </div>
    );
  }
}

EditUser.propTypes = {
  user: T.object,
  token: T.string,
  onEditUser: T.func,
  routeToProfile: T.func,
};
