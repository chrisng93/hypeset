import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { allBrandsSelector } from '../selectors/brandSelectors';
import Brand from '../components/Brand';

const propTypes = {
};

class BrandContainer extends Component {
  componentWillMount() {
    const { params } = this.props;
    console.log(params.brand)
  }

  render() {
    return (
      <div className="brand-container">
        <Brand {...this.props} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

BrandContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BrandContainer);
