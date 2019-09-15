/**
 * Created By Nguyen Cong Thanh on 08/05/2019 09:23.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../app.services'
import RegisterLocalize from './register.localize'

import RegisterHtml from '../../../ui/public/register/register.html'
import RegisterMainComponent from './main/main.container'
import RegisterNewComponent from './new/new.container'
import RegisterHadOnlineBankingComponent from './hadOnlineBanking/hadOnlineBanking.container'
import RegisterNotOnlineBankingComponent from './notOnlineBanking/notOnlineBanking.container'
import PublicOtpComponent from '../otp/otp.container.js'

export default class RegisterComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      view: {
        current: AppServices.enums.layoutRegister.main,
        main: AppServices.enums.layoutRegister.main,
        otp: AppServices.enums.layoutRegister.otp,
        new: AppServices.enums.layoutRegister.new,
        hadOnlineBanking: AppServices.enums.layoutRegister.hadOnlineBanking,
        notOnlineBanking: AppServices.enums.layoutRegister.notOnlineBanking
      }
    }

    this.handleSetView = this.handleSetView.bind(this)
    this.otpSuccess = this.otpSuccess.bind(this)
  }

  handleSetView(viewCurrent) {
    const { view } = this.state;
    view.current = viewCurrent
    this.setState((prevState) => ({
      view: view
    }))
  }

  otpSuccess() {
    AppServices.services.logger.info(`RegisterComponent otpSuccess`)
    try {
      const { view } = this.state;
      this.handleSetView(view.hadOnlineBanking)
    } catch (e) {
      AppServices.services.logger.error(`RegisterComponent otpSuccess ${e.toString()}`)
    }
  }

  render() {
    return (
      <RegisterHtml
        localizeKey={RegisterLocalize}
        view={this.state.view}
        handleSetView={this.handleSetView}
        RegisterMainComponent={RegisterMainComponent}
        RegisterNewComponent={RegisterNewComponent}
        RegisterHadOnlineBankingComponent={RegisterHadOnlineBankingComponent}
        RegisterNotOnlineBankingComponent={RegisterNotOnlineBankingComponent}
        PublicOtpComponent={PublicOtpComponent}
        otpSuccess={this.otpSuccess}
        apiLink={AppServices.constant.api.USER.REGISTERED}
      />
    )
  }

}
