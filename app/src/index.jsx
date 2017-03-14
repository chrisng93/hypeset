import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import App from './components/App';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Nav from './components/Nav';
import News from './components/News';
import Sales from './components/Sales';
import Profile from './components/Profile';
import EditUser from './components/EditUser';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={AuthenticatedComponent} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={AuthenticatedComponent}>
          <IndexRoute component={Nav} />
          <Route path="/news" component={News} />
          <Route path="/sales" component={Sales} />
          <Route path="/profile" component={Profile}>
            <Route path="/edit" component={EditUser} />
          </Route>
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
