// PrivateRoute - wrapper for all routes / components
// Based on  https://reacttraining.com/react-router/web/example/authworkflow
//     - runs the auth helper function [isAuthenticated()] to check for JWT in sessionStorage


import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute
