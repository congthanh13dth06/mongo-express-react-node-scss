/**
 * Created By Nguyen Cong Thanh on 22/05/2019 11:05.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../../app.services'
import RegisterNotOnlineBankingHtml from '../../../../ui/public/register/notOnlineBanking/notOnlineBanking.html'
import NotiFailComponent from './notiFail/notiFail.container.js'
import ScheduleComponent from './schedule/schedule.container.js'
import NotiSuccessComponent from './notiSuccess/notiSuccess.container.js'

export default class RegisterNotOnlineBankingComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      viewNotOnlineBanking: {
        current: AppServices.enums.layoutRegister.notNotiFail,
        notiFail: AppServices.enums.layoutRegister.notNotiFail,
        schedule: AppServices.enums.layoutRegister.notSchedule,
        notiSuccess: AppServices.enums.layoutRegister.notNotiSuccess
      }
    }

    this.handleSetViewNotOnlineBanking = this.handleSetViewNotOnlineBanking.bind(this)
  }

  handleSetViewNotOnlineBanking(viewCurrent) {
    const { viewNotOnlineBanking } = this.state;
    viewNotOnlineBanking.current = viewCurrent
    this.setState((prevState) => ({
      viewNotOnlineBanking: viewNotOnlineBanking
    }))
  }

  render() {

    const { viewNotOnlineBanking } = this.state;
    const { localizeKey, view, handleSetView } = this.props;

    return (
      <RegisterNotOnlineBankingHtml
        localizeKey={localizeKey}
        view={view}
        handleSetView={handleSetView}
        viewNotOnlineBanking={viewNotOnlineBanking}
        handleSetViewNotOnlineBanking={this.handleSetViewNotOnlineBanking}

        NotiFailComponent={NotiFailComponent}
        ScheduleComponent={ScheduleComponent}
        NotiSuccessComponent={NotiSuccessComponent}
      />
    )
  }

}
