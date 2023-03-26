import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router';
import { Layout } from './components/Layout';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Home, Create, Edit, Calculate } from './views/employees/index'

import './custom.css'
import authService from 'components/api-authorization/AuthorizeService';

export default function App() {
  const history = useHistory()

  useEffect(() => {
    authService.isAuthenticated().then(response => {
      if(!response){
        history.push('authentication/login')
      }
    })
  }, [])

  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <AuthorizeRoute path='/employees/index' component={Home} />
      <AuthorizeRoute path='/employees/create' component={Create} />
      <AuthorizeRoute path='/employees/:id/edit' component={Edit} />
      <AuthorizeRoute path='/employees/:id/calculate' component={Calculate} />
      <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
    </Layout>
  )
}