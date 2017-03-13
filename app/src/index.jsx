import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import News from './components/News';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={SignIn} />
        <Route path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/news" component={News} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
