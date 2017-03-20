import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  pathname: T.string.isRequired,
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
    this.selectTab = this.selectTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.pathname });
  }

  selectTab(routingFunc) {
    routingFunc();
  }

  render() {
    const { selected } = this.state;
    const { routeToNews, routeToSales, routeToProfile, onLogout } = this.props;
    return (
      <div className="nav">
        <div className="title"><span>hypeset</span></div>
        <div className="routes">
          <div className={`nav-news ${selected === '/news' ? 'selected' : null}`} onClick={routeToNews}>News</div>
          <div className={`nav-sales ${selected === '/sales' ? 'selected' : null}`} onClick={routeToSales}>Sales</div>
          <div className={`nav-profile ${selected === '/profile' ? 'selected' : null}`} onClick={routeToProfile}>Profile</div>
          <div className="logout" onClick={onLogout}>Log out</div>
        </div>
      </div>
    );
  }
}

Nav.propTypes = propTypes;
