/**
 * Define routes
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import NotFoundContainer from './containers/NotFoundContainer';
import SignInContainer from './containers/SignInContainer';
import SignUpContainer from './containers/SignUpContainer';
import EnsureAuthenticationContainer from './containers/EnsureAuthenticationContainer';
import NewsContainer from './containers/NewsContainer';
import SalesContainer from './containers/SalesContainer';
import BrandsContainer from './containers/BrandsContainer';
import BrandContainer from './containers/BrandContainer';
import ProfileContainer from './containers/ProfileContainer';
import EditUser from './components/EditUser';
import EditBrands from './components/EditBrands';

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={NewsContainer} />
    <Route path="/signin" component={SignInContainer} />
    <Route path="/signup" component={SignUpContainer} />
    <Route path="/news" component={NewsContainer} />
    <Route path="/sales" component={SalesContainer} />
    <Route path="/brands" component={BrandsContainer} />
    <Route path="/brands/:brand" component={BrandContainer} />
    <Route path="/profile" component={EnsureAuthenticationContainer}>
      <IndexRoute component={ProfileContainer} />
      <Route path="/profile" component={ProfileContainer}>
        <IndexRoute component={EditUser} />
        <Route path="/profile/edit" component={EditUser} />
        <Route path="/profile/brands" component={EditBrands} />
      </Route>
    </Route>
    <Route path="*" component={NotFoundContainer} />
  </Route>
);

export default routes;
