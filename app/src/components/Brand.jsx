import React, { Component, PropTypes as T } from 'react';
import Articles from './Articles';

const propTypes = {
  brandName: T.string.isRequired,
  brandNews: T.array.isRequired,
  brandSales: T.array.isRequired,
  getBrandInfos: T.func.isRequired,
};

export default function Brand(props) {
  const { brandName, brandNews, brandSales, getBrandInfos } = props;
  return (
    <div className="brand">
      {brandName}
    </div>
  );
}

Brand.propTypes = propTypes;
