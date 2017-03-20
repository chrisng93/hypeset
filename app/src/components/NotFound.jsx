import React, { PropTypes as T } from 'react';

const propTypes = {
  routeToHome: T.func.isRequired,
};

export default function NotFound(props) {
  const { routeToHome } = props;
  return (
    <div className="not-found">
      <img src={require('../../assets/intro-bg1.jpg')} className="bg" />
      <div className="not-found-container">
        <div className="title">Route not found.</div>
        <div onClick={routeToHome}>Go back to the <span className="link">home page</span>.</div>
      </div>
    </div>
  );
}

NotFound.propTypes = propTypes;
