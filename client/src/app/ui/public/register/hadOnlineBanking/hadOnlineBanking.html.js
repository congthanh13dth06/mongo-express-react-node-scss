/**
 * Created By Nguyen Cong Thanh on 20/05/2019 17:28.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

export default class RegisterHadOnlineBankingHtml extends Component {

  render() {
    const { localizeKey, view, handleSetView, viewHadOnlineBanking,
      handleSetViewHadOnlineBanking, InputAccountComponent, NotiComponent } = this.props;

    const showView = () => {
      switch (viewHadOnlineBanking.current) {
        case viewHadOnlineBanking.inputAccount:
          return <InputAccountComponent localizeKey={localizeKey} view={view} viewHadOnlineBanking={viewHadOnlineBanking} handleSetViewHadOnlineBanking={handleSetViewHadOnlineBanking} />
          break;
        case viewHadOnlineBanking.noti:
          return <NotiComponent localizeKey={localizeKey} viewHadOnlineBanking={viewHadOnlineBanking} handleSetViewHadOnlineBanking={handleSetViewHadOnlineBanking} />
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
