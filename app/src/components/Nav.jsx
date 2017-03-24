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
    this.state = {
      selected: 'news',
    };
  }

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
        <h1><span>hypeset</span></h1>
        <ul className="nav-routes">
          <li className={`nav-news ${selected === 'news' ? 'selected' : null}`} onClick={routeToNews}>News</li>
          <li className={`nav-sales ${selected === 'sales' ? 'selected' : null}`} onClick={routeToSales}>Sales</li>
          <li className={`nav-brands ${selected === 'brands' ? 'selected' : null}`} onClick={routeToBrands}>Brands</li>
          <li className={`nav-profile ${selected === 'profile' ? 'selected' : null} ${isAuthenticated ? '' : 'hidden'}`} onClick={routeToProfile}>Profile</li>
          <li className={`login ${isAuthenticated ? 'hidden' : ''}`} onClick={routeToSignIn}>Sign in</li>
          <li className={`logout ${isAuthenticated ? '' : 'hidden'}`} onClick={() => onLogout({ token })}>Sign out</li>
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
