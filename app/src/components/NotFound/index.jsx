import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import NotFound from './presenter';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    routeToHome: () => dispatch(push('/')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
