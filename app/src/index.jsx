import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import EnsureAuthentication from './components/EnsureAuthentication';
import App from './components/App';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import News from './components/News';
import Sales from './components/Sales';
import Profile from './components/Profile';
import EditUser from './components/EditUser';
import EditBrands from './components/EditBrands';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// import stylesheets
require ('./stylesheets/app.scss');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={EnsureAuthentication} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={EnsureAuthentication}>
          <IndexRoute component={News} />
          <Route path="/news" component={News} />
          <Route path="/sales" component={Sales} />
          <Route path="/profile" component={Profile} />
          <Route path="/profile/edit" component={EditUser} />
          <Route path="/profile/brands" component={EditBrands} />
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
