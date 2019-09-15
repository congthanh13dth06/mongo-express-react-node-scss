/**
 * Created By Nguyen Cong Thanh on 13/05/2019 08:51.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import ForgotHtml from '../../../ui/public/forgot/forgot.html'
import ForgotMainComponent from './main/main.container'
import ForgotOtpComponent from '../otp/otp.container'
import ForgotInfoComponent from './info/info.container'
import ForgotSuccessComponent from './success/success.container'
import ForgotLocalize from './forgot.localize'
import AppServices from '../../../app.services'
import { isThisISOWeek } from 'date-fns/esm'

export default class ForgotComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      view: {
        current:0,
        main: 0,
        otp: 1,
        info: 2,
        success: 3
      }
    }

    this.handleSetView = this.handleSetView.bind(this)
    this.otpSuccess=this.otpSuccess.bind(this)
    
  }

  handleSetView(viewCurrent) {
    const { view } = this.state;
    view.current = viewCurrent
    this.setState((prevState) => ({
      view: view
    }))
  }

  otpSuccess() {
    AppServices.services.logger.info(`ForgotComponent otpSuccess`)
    try {
      const { view } = this.state;
      this.handleSetView(view.info)
    } catch (e) {
      AppServices.services.logger.error(`ForgotComponent otpSuccess ${e.toString()}`)
    }
  }


  render() {
    return (
      <ForgotHtml
        view={this.state.view}
        localizeKey={ForgotLocalize}
        otpSuccess={this.otpSuccess}
      
        handleSetView={this.handleSetView}
        ForgotMainComponent={ForgotMainComponent}
        ForgotOtpComponent={ForgotOtpComponent}
        ForgotInfoComponent={ForgotInfoComponent}
        ForgotSuccessComponent={ForgotSuccessComponent}
        apiLink={AppServices.constant.api.USER.FORGOT}
      />
    )
  }

}
