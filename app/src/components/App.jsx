import React, { PropTypes as T } from 'react';

const propTypes = {
  children: T.node,
};

export default function App(props) {
  const { children } = props;
  return (
    <div id="app">
      {children}
    </div>
  );
}

App.propTypes = propTypes;
