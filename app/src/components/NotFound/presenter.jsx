import React, { PropTypes as T } from 'react';

const propTypes = {
  routeToHome: T.func.isRequired
};

export default function NotFound({ routeToHome }) {
  return (
    <div className="not-found">
      <div>Route not found. Please go back to home page.</div>
      <button onClick={routeToHome}>Click here to go back to home page.</button>
    </div>
  );
}

NotFound.propTypes = propTypes;
