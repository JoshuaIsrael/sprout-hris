import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Home, Create, Edit, Calculate, Landing } from './views/employees'

import './custom.css'

export default function App() {
  return (
    <Layout>
      <Route exact path='/' component={Landing} />
      <AuthorizeRoute path='/employees/index' component={Home} />
      <AuthorizeRoute path='/employees/create' component={Create} />
      <AuthorizeRoute path='/employees/:id/edit' component={Edit} />
      <AuthorizeRoute path='/employees/:id/calculate' component={Calculate} />
      <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
    </Layout>
  )
}