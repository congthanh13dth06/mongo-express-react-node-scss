/**
 * Created By Nguyen Cong Thanh on 08/05/2019 10:25.
 *
 * Copyright Intelin 2019.
 */

import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AppServices from '../../app.services'

const PublicRoute = ({component: Component, ...rest}) => {
  const authService = AppServices.services.authen
  return (
    <Route
      {...rest}
      render={(props) => authService.getAuthen() === authService.type.PUBLIC
        ? <Component {...props} />
        : <Redirect to={{
          pathname: authService.getRedirect(),
          state: {from: props.location}}} />
      }
    />
  )
}

export default PublicRoute
