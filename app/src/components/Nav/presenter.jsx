import React, { Component, PropTypes as T } from 'react';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { routeToNews, routeToSales, routeToProfile, onLogout } = this.props;
    // TODO: bold div based on currentLocation
    return (
      <div className="nav">
        <div className="title"><span>hypeset</span></div>
        <div className="routes">
          <div className="nav-news" onClick={routeToNews}>News</div>
          <div className="nav-sales" onClick={routeToSales}>Sales</div>
          <div className="nav-profile" onClick={routeToProfile}>Profile</div>
          <div className="logout" onClick={onLogout}>Log out</div>
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  routeToNews: T.func,
  routeToSales: T.func,
  routeToProfile: T.func,
};
