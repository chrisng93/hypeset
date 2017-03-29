import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  token: T.string.isRequired,
  pathname: T.string.isRequired,
  onLogout: T.func.isRequired,
  routeToNews: T.func.isRequired,
  routeToSales: T.func.isRequired,
  routeToProfile: T.func.isRequired,
  routeToBrands: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
};

export default class Nav extends Component {
  componentWillMount() {
    this.setState({ selected: this.props.pathname.split('/')[1] });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.pathname.split('/')[1] });
  }

  render() {
    const { selected } = this.state;
    const { isAuthenticated, token, onLogout, routeToNews, routeToSales, routeToProfile, routeToBrands, routeToSignIn } = this.props;
    return (
      <nav>
        <ul className="nav-routes">
          <a className="nav-news" onClick={routeToNews}>News</a>
          <a className="nav-sales" onClick={routeToSales}>Sales</a>
          <a className="nav-brands" onClick={routeToBrands}>Brands</a>
          <a className={`nav-profile ${selected === 'profile' ? 'selected' : null} ${isAuthenticated ? '' : 'hidden'}`} onClick={routeToProfile}>Profile</a>
          <a className={`login ${isAuthenticated ? 'hidden' : ''}`} onClick={routeToSignIn}>Sign in</a>
          <a className={`logout ${isAuthenticated ? '' : 'hidden'}`} onClick={() => onLogout({ token })}>Sign out</a>
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
