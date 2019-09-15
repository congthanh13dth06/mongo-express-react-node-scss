/**
 * Created By Nguyen Cong Thanh on 22/05/2019 11:08.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

export default class RegisterNotOnlineBankingHtml extends Component {

  render() {
    const { localizeKey, view, handleSetView, viewNotOnlineBanking,
      handleSetViewNotOnlineBanking, NotiFailComponent, ScheduleComponent, NotiSuccessComponent } = this.props;

    const showView = () => {
      switch (viewNotOnlineBanking.current) {
        case viewNotOnlineBanking.notiFail:
          return <NotiFailComponent localizeKey={localizeKey} viewNotOnlineBanking={viewNotOnlineBanking} handleSetViewNotOnlineBanking={handleSetViewNotOnlineBanking} />
          break;
        case viewNotOnlineBanking.schedule:
          return <ScheduleComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} viewNotOnlineBanking={viewNotOnlineBanking} handleSetViewNotOnlineBanking={handleSetViewNotOnlineBanking} />
          break;
        case viewNotOnlineBanking.notiSuccess:
          return <NotiSuccessComponent localizeKey={localizeKey} viewNotOnlineBanking={viewNotOnlineBanking} handleSetViewNotOnlineBanking={handleSetViewNotOnlineBanking} />
          break;
        default:
          return null
      }
    }

    return (
      <Fragment>
        {showView()}
      </Fragment>
    )
  }

}
