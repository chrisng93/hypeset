/**
 * Created by chrisng on 3/20/17.
 */
import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { isAuthenticatedSelector, tokenSelector } from '../selectors/userSelectors';
import Nav from '../components/Nav';

const propTypes = {
  children: T.node.isRequired,

  isAuthenticated: T.bool.isRequired,
  token: T.string.isRequired,

  getAllBrands: T.func.isRequired,
  getAllNews: T.func.isRequired,
  getAllSales: T.func.isRequired,
  getUserBrands: T.func.isRequired,
  getBrandsByPopularity: T.func.isRequired,
  getOwnNews: T.func.isRequired,
  getOwnSales: T.func.isRequired,
  onLogout: T.func.isRequired,
  routeToNews: T.func.isRequired,
  routeToSales: T.func.isRequired,
  routeToProfile: T.func.isRequired,
  routeToBrands: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
};

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
    this.getData = this.getData.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.onClickNav = this.onClickNav.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  componentWillMount() {
    this.getData({ isAuthenticated: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated === this.props.isAuthenticated) {
      return;
    }
    this.getData(nextProps);
  }

  getData(nextProps) {
    const offset = 0;
    const limit = 20;
    if (nextProps.isAuthenticated) {
      this.props.getUserBrands({ token: nextProps.token });
      this.props.getOwnNews({ token: nextProps.token, offset, limit });
      this.props.getOwnSales({ token: nextProps.token, offset, limit });
    } else {
      this.props.getAllNews({ offset, limit });
      this.props.getAllSales({ offset, limit });
    }
    this.props.getBrandsByPopularity({ limit: 20 });
    this.props.getAllBrands();
  }

  toggleNav() {
    this.setState({
      selected: !this.state.selected
    }, () => {
      const { selected } = this.state;
      const container = document.getElementsByClassName('app-container')[0];
      container.style.width = selected ? 'calc(100vw + 500px)' : '100vw';
      if (!selected) {
        container.style.transition = 'all 0.25s';
      }
    });
  }

  onClickNav() {
    this.setState({
      selected: false
    }, () => {
      const container = document.getElementsByClassName('app-container')[0];
      container.style.width = '100vw';
      container.style.transition = 'all 0.25s';
    });
  }

  onLoad() {
    document.body.style.visibility = 'visible';
  }

  render() {
    const { children, isAuthenticated, token, onLogout, routeToNews, routeToSales,
      routeToProfile, routeToBrands, routeToSignIn } = this.props;
    const navProps = { isAuthenticated, token, onLogout, routeToNews, routeToSales,
      routeToProfile, routeToBrands, routeToSignIn, onClickNav: this.onClickNav };
    return(
      <section id="app" onLoad={this.onLoad}>
        <section className="app-container">
          <section className={`app-nav ${this.state.selected ? 'selected' : ''}`}>
            <Nav {...navProps} />
          </section>
          <section className="app-toggle-nav" onClick={this.toggleNav}>
            <h1 className="app-brand-title">
              Hypeset
            </h1>
            <img className="app-hamburger" src={`${process.env.S3_URL}/hamburger-menu.png`} />
          </section>
          <section className="app-children">
            {children}
          </section>
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    token: tokenSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllBrands: bindActionCreators(actions.getAllBrands, dispatch),
    getAllNews: bindActionCreators(actions.getAllNews, dispatch),
    getAllSales: bindActionCreators(actions.getAllSales, dispatch),
    getUserBrands: bindActionCreators(actions.getUserBrands, dispatch),
    getBrandsByPopularity: bindActionCreators(actions.getBrandsByPopularity, dispatch),
    getOwnNews: bindActionCreators(actions.getOwnNews, dispatch),
    getOwnSales: bindActionCreators(actions.getOwnSales, dispatch),
    onLogout: bindActionCreators(actions.logout, dispatch),
    routeToSignIn: () => dispatch(push('/signin')),
    routeToNews: () => dispatch(push('/news')),
    routeToSales: () => dispatch(push('/sales')),
    routeToBrands: () => dispatch(push('/brands')),
    routeToProfile: () => dispatch(push('/profile')),
  };
}

AppContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
