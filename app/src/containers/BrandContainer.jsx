import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { brandNameSelector, brandNewsSelector, brandCondensedNameSelector, brandSalesSelector, isFetchingBrandInfosSelector } from '../selectors/brandSelectors';
import Brand from '../components/Brand';

const propTypes = {
  brandName: T.string.isRequired,
  brandCondensedName: T.string.isRequired,
  brandNews: T.array.isRequired,
  brandSales: T.array.isRequired,
  isFetchingBrandInfos: T.bool.isRequired,
  getBrandInfos: T.func.isRequired,
  resetBrandInfos: T.func.isRequired,
};

class BrandContainer extends Component {
  componentWillMount() {
    const { params, getBrandInfos } = this.props;
    getBrandInfos({ brand: params.brand, offset: 0, limit: 20 });
  }

  componentWillUnmount() {
    this.props.resetBrandInfos();
  }

  render() {
    const { isFetchingBrandInfos } = this.props;
    if (!isFetchingBrandInfos) {
      return (
        <div className="brand-container">
          <Brand {...this.props} />
        </div>
      )
    }
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    brandName: brandNameSelector(state) || ownProps.params.brand,
    brandCondensedName: brandCondensedNameSelector(state) || ownProps.params.brand,
    brandNews: brandNewsSelector(state),
    brandSales: brandSalesSelector(state),
    isFetchingBrandInfos: isFetchingBrandInfosSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBrandInfos: bindActionCreators(actions.getBrandInfos, dispatch),
    resetBrandInfos: bindActionCreators(actions.resetBrandInfos, dispatch),
  };
}

BrandContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BrandContainer);
