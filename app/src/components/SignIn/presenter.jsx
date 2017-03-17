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
    const { onAuth, routeToSignUp } = this.props;
    const { username, password } = this.state;
    return (
      <div className="sign-in">
        <img src={require('../../../assets/intro-bg4.jpg')} className="bg" />
        <div className="form-container">
          <div className="title">hypeset</div>
          <form className="sign-in-form">
            <input type="text" className="username" value={username} placeholder="Username" onChange={e => this.handleInputChange(e, 'username')} />
            <input type="password" className="password" value={password} placeholder="Password" onChange={e => this.handleInputChange(e, 'password')} />
            <button type="button" onClick={() => onAuth({ username, password })}>Sign in</button>
          </form>
          <div onClick={routeToSignUp}>Don't have an account? <span className="link">Sign up</span></div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  onAuth: T.func,
  routeToSignUp: T.func,
  routeToNews: T.func,
  isAuthenticated: T.boolean,
};
