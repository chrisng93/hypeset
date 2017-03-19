import React from 'react';
import { Route, IndexRoute } from 'react-router';
import EnsureAuthentication from './components/EnsureAuthentication';
import App from './components/App';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import News from './components/News';
import Sales from './components/Sales';
import Profile from './components/Profile';
import UserInfo from './components/UserInfo';
import EditUser from './components/EditUser';
import EditBrands from './components/EditBrands';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={EnsureAuthentication} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/" component={EnsureAuthentication}>
      <IndexRoute component={News} />
      <Route path="/news" component={News} />
      <Route path="/sales" component={Sales} />
      <Route path="/profile" component={Profile}>
        <IndexRoute component={UserInfo} />
        <Route path="/profile/edit" component={EditUser} />
        <Route path="/profile/brands" component={EditBrands} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
