/**
 * Created By Nguyen Cong Thanh on 20/05/2019 16:41.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../../app.services'
import RegisterNewHtml from '../../../../ui/public/register/new/new.html'
import InputPhoneComponent from './inputPhone/inputPhone.container'
import PublicOtpComponent from '../../otp/otp.container.js'
import InputAccountComponent from './inputAccount/inputAccount.container.js'
import ScheduleComponent from './schedule/schedule.container.js'
import NotiComponent from './noti/noti.container.js'

export default class RegisterNewComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      viewNew: {
        current: AppServices.enums.layoutRegister.newInputPhone,
        inputPhone: AppServices.enums.layoutRegister.newInputPhone,
        otp: AppServices.enums.layoutRegister.newOtp,
        inputAccount: AppServices.enums.layoutRegister.newInputAccount,
        schedule: AppServices.enums.layoutRegister.newSchedule,
        noti: AppServices.enums.layoutRegister.newNoti
      }
    }

    this.handleSetViewNew = this.handleSetViewNew.bind(this)
    this.otpSuccess = this.otpSuccess.bind(this)
  }

  handleSetViewNew(viewCurrent) {
    const { viewNew } = this.state;
    viewNew.current = viewCurrent
    this.setState((prevState) => ({
      viewNew: viewNew
    }))
  }

  otpSuccess() {
    AppServices.services.logger.info(`RegisterNewComponent otpSuccess`)
    try {
      const { viewNew } = this.state;
      this.handleSetViewNew(viewNew.inputAccount)
    } catch (e) {
      AppServices.services.logger.error(`RegisterNewComponent otpSuccess ${e.toString()}`)
    }
  }

  render() {

    const { viewNew } = this.state;
    const { localizeKey, view, handleSetView } = this.props;

    return (
      <RegisterNewHtml
        localizeKey={localizeKey}
        view={view}
        handleSetView={handleSetView}
        viewNew={viewNew}
        handleSetViewNew={this.handleSetViewNew}
        InputPhoneComponent={InputPhoneComponent}
        PublicOtpComponent={PublicOtpComponent}
        InputAccountComponent={InputAccountComponent}
        ScheduleComponent={ScheduleComponent}
        NotiComponent={NotiComponent}
        otpSuccess={this.otpSuccess}
        apiLink={AppServices.constant.api.USER.REGISTERED}
      />
    )
  }

}
