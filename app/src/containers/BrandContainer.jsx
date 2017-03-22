import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { brandNameSelector, brandNewsSelector, brandSalesSelector } from '../selectors/brandSelectors';
import Brand from '../components/Brand';

const propTypes = {
  brandName: T.string.isRequired,
  brandNews: T.array.isRequired,
  brandSales: T.array.isRequired,
  getBrandInfos: T.func.isRequired,
};

class BrandContainer extends Component {
  componentWillMount() {
    const { params, getBrandInfos } = this.props;
    getBrandInfos({ brand: params.brand, offset: 0, limit: 20 });
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
    brandName: brandNameSelector(state),
    brandNews: brandNewsSelector(state),
    brandSales: brandSalesSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBrandInfos: bindActionCreators(actions.getBrandInfos, dispatch),
  };
}

BrandContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BrandContainer);
