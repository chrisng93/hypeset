import React, { PropTypes as T } from 'react';

const propTypes = {
  routeToHome: T.func.isRequired,
};

export default function NotFound(props) {
  const { routeToHome } = props;
  return (
    <section className="not-found">
      <section className="not-found-content">
        <h1>
          Route not found.
        </h1>
        <p>
          Go back to the <a className="link" onClick={routeToHome}>home page</a>.
        </p>
      </section>
    </section>
  );
}

NotFound.propTypes = propTypes;
