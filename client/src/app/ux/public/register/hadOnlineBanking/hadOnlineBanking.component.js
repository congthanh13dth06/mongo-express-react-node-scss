/**
 * Created By Nguyen Cong Thanh on 20/05/2019 17:25.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../../app.services'
import RegisterHadOnlineBankingHtml from '../../../../ui/public/register/hadOnlineBanking/hadOnlineBanking.html'
// import PublicOtpComponent from '../../otp/otp.container.js'
import InputAccountComponent from './inputAccount/inputAccount.container.js'
import NotiComponent from './noti/noti.container.js'

export default class RegisterHadOnlineBankingComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      viewHadOnlineBanking: {
        current: AppServices.enums.layoutRegister.hadInputAccount,
        // otp: AppServices.enums.layoutRegister.hadOtp,
        inputAccount: AppServices.enums.layoutRegister.hadInputAccount,
        noti: AppServices.enums.layoutRegister.hadNoti
      }
    }

    this.handleSetViewHadOnlineBanking = this.handleSetViewHadOnlineBanking.bind(this)
  }

  handleSetViewHadOnlineBanking(viewCurrent) {
    const { viewHadOnlineBanking } = this.state;
    viewHadOnlineBanking.current = viewCurrent
    this.setState((prevState) => ({
      viewHadOnlineBanking: viewHadOnlineBanking
    }))
  }

  render() {

    const { viewHadOnlineBanking } = this.state;
    const { localizeKey, view, handleSetView } = this.props;

    return (
      <RegisterHadOnlineBankingHtml
        localizeKey={localizeKey}
        view={view}
        handleSetView={handleSetView}
        viewHadOnlineBanking={viewHadOnlineBanking}
        handleSetViewHadOnlineBanking={this.handleSetViewHadOnlineBanking}
        // PublicOtpComponent={PublicOtpComponent}
        InputAccountComponent={InputAccountComponent}
        NotiComponent={NotiComponent}
      />
    )
  }

}
