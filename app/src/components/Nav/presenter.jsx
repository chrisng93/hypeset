import React, { Component, PropTypes as T } from 'react';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { routeToNews, routeToSales, routeToProfile, currentLocation } = this.props;
    // bold div based on currentLocation
    return (
      <div className="nav">
        <div className="nav-news" onClick={routeToNews}>News</div>
        <div className="nav-sales" onClick={routeToSales}>Sales</div>
        <div className="nav-profile" onClick={routeToProfile}>Profile</div>
      </div>
    );
  }
}

Nav.propTypes = {
  routeToNews: T.func,
  routeToSales: T.func,
  routeToProfile: T.func,
};
