/**
 * Created By Nguyen Cong Thanh on 03/04/2019 15:33.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'
import { StaticRouter } from "react-router";
import { Route, Redirect, Switch, withRouter } from "react-router-dom"

import NotFoundComponent from './ux/404/404.container'

import PublicRoute from './ux/public/public.route'
import PublicComponent from './ux/public/public.container'

import UserRoute from './ux/user/user.route'
import UserComponent from './ux/user/user.container'

import AppServices from './app.services'

export default class AppRoute extends Component {

  render() {
    return (
      <Switch>
        <PublicRoute
          path={AppServices.constant.router.PUBLIC}
          component={PublicComponent}
        />
        <UserRoute
          path={AppServices.constant.router.USER}
          component={UserComponent}
        />
        <Route exact path={AppServices.constant.router.NOT_FOUND} component={NotFoundComponent} />
        <Redirect to={AppServices.services.authen.getRedirect()} />
      </Switch>
    )
  }

}
