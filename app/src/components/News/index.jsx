import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { tokenSelector } from '../../selectors/userSelectors';
import { newsSelector } from '../../selectors/newsSelectors';
import News from './presenter';

function mapStateToProps(state) {
  return {
    token: tokenSelector(state),
    news: newsSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNews: bindActionCreators(actions.getNews, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
