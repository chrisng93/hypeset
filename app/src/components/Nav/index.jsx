import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Nav from './presenter';

function mapStateToProps(state) {
  return {
    currentLocation: state.routing.pathname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToNews: () => dispatch(push('/news')),
    routeToSales: () => dispatch(push('/sales')),
    routeToProfile: () => dispatch(push('/profile')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
