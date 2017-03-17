import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { pathnameSelector } from '../../selectors/routingSelectors';
import Nav from './presenter';

function mapStateToProps(state) {
  return {
    currentLocation: pathnameSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToNews: () => dispatch(push('/news')),
    routeToSales: () => dispatch(push('/sales')),
    routeToProfile: () => dispatch(push('/profile')),
    onLogout: () => dispatch(push('/signin')),
    // onLogout: bindActionCreators(actions.logout, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
