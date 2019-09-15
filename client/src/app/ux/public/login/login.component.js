/**
 * Created By Nguyen Cong Thanh on 08/05/2019 09:23.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../app.services'
import LoginLocalize from './login.localize'

import LoginHtml from '../../../ui/public/login/login.html'
import UsernameComponent from './username/username.container'
import PasswordComponent from './password/password.container'
import OtpComponent from '../otp/otp.container'

export default class LoginComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      view: {
        current: AppServices.enums.layoutLogin.username,
        username: AppServices.enums.layoutLogin.username,
        password: AppServices.enums.layoutLogin.password,
        opt: AppServices.enums.layoutLogin.otp,
        banned: AppServices.enums.layoutLogin.banned,
      }
    }

    this.handleSetView = this.handleSetView.bind(this)
  }

  handleSetView(viewCurrent) {
    const { view } = this.state;
    view.current = viewCurrent
    this.setState((prevState) => ({
      view: view
    }))
  }

  render() {
    return (
      <Fragment>
        <LoginHtml
          localizeKey={LoginLocalize}
          view={this.state.view}
          handleSetView={this.handleSetView}
          UsernameComponent={UsernameComponent}
          PasswordComponent={PasswordComponent}
          OtpComponent={OtpComponent}
        />
      </Fragment>

    )
  }

}
