import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  token: T.string.isRequired,
  pathname: T.string.isRequired,
  onLogout: T.func.isRequired,
  routeToNews: T.func.isRequired,
  routeToSales: T.func.isRequired,
  routeToProfile: T.func.isRequired,
};

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '/news',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.pathname });
  }

  render() {
    const { selected } = this.state;
    const { isAuthenticated, token, onLogout, routeToNews, routeToSales, routeToProfile } = this.props;
    return (
      <div className="nav">
        <div className="title"><span>hypeset</span></div>
        <div className="routes">
          <div className={`nav-news ${selected === '/news' ? 'selected' : null}`} onClick={routeToNews}>News</div>
          <div className={`nav-sales ${selected === '/sales' ? 'selected' : null}`} onClick={routeToSales}>Sales</div>
          <div className={`nav-profile ${selected === '/profile' ? 'selected' : null} ${isAuthenticated ? '' : 'hidden'}`} onClick={routeToProfile}>Profile</div>
          <div className={`logout ${isAuthenticated ? '' : 'hidden'}`} onClick={() => onLogout({ token })}>Log out</div>
        </div>
      </div>
    );
  }
}

Nav.propTypes = propTypes;
