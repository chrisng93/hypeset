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
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onRouteLogout = this.onRouteLogout.bind(this);
  }

  onClick(routeToPage) {
    this.props.onClickNav();
    routeToPage();
  }

  onRouteLogout() {
    const { onClickNav, onLogout, token } = this.props;
    onClickNav();
    onLogout({ token });
  }

  render() {
    const { isAuthenticated, routeToNews, routeToSales, routeToProfile, routeToBrands, routeToSignIn } = this.props;
    return (
      <nav>
        <ul className="nav-routes">
          <a className="nav-news" onClick={() => this.onClick(routeToNews)}>News</a>
          <a className="nav-sales" onClick={() => this.onClick(routeToSales)}>Sales</a>
          <a className="nav-brands" onClick={() => this.onClick(routeToBrands)}>Brands</a>
          <a className={`nav-profile ${isAuthenticated ? '' : 'hidden'}`} onClick={() => this.onClick(routeToProfile)}>Profile</a>
          <a className={`login ${isAuthenticated ? 'hidden' : ''}`} onClick={() => this.onClick(routeToSignIn)}>Sign in</a>
          <a className={`logout ${isAuthenticated ? '' : 'hidden'}`} onClick={this.onRouteLogout}>Sign out</a>
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
