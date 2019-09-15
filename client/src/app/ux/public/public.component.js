/**
 * Created By Nguyen Cong Thanh on 07/05/2019 17:45.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"

import LoginComponent from './login/login.container'
import RegisterComponent from './register/register.container'
import ForgotComponent from './forgot/forgot.container'

import AppServices from '../../app.services'

export default class PublicComponent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { history } = this.props;
  }

  render() {

    const { match } = this.props

    return (
      <Switch>
        <Route exact path={`${match.url}${AppServices.constant.router.LOGIN}`} component={LoginComponent} />
        <Route exact path={`${match.url}${AppServices.constant.router.REGISTER}`} component={RegisterComponent} />
        <Route exact path={`${match.url}${AppServices.constant.router.FORGOT}`} component={ForgotComponent} />
        <Redirect to={{pathname: AppServices.services.authen.type[AppServices.services.authen.type.PUBLIC], state: {from: this.props.location}}} />
      </Switch>
    )
  }

}
