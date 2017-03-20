import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NotFoundContainer from './containers/NotFoundContainer';
import EnsureAuthenticationContainer from './containers/EnsureAuthenticationContainer';
import SignInContainer from './containers/SignInContainer';
import SignUpContainer from './containers/SignUpContainer';
import NewsContainer from './containers/NewsContainer';
import SalesContainer from './containers/SalesContainer';
import ProfileContainer from './containers/ProfileContainer';
import UserInfo from './components/UserInfo';
import EditUser from './components/EditUser';
import EditBrands from './components/EditBrands';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={EnsureAuthenticationContainer} />
    <Route path="/signin" component={SignInContainer} />
    <Route path="/signup" component={SignUpContainer} />
    <Route path="/" component={EnsureAuthenticationContainer}>
      <IndexRoute component={NewsContainer} />
      <Route path="/news" component={NewsContainer} />
      <Route path="/sales" component={SalesContainer} />
      <Route path="/profile" component={ProfileContainer}>
        <IndexRoute component={UserInfo} />
        <Route path="/profile/edit" component={EditUser} />
        <Route path="/profile/brands" component={EditBrands} />
      </Route>
    </Route>
    <Route path="*" component={NotFoundContainer} />
  </Route>
);

export default routes;
