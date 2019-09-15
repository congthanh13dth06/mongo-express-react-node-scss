/**
 * Created By Nguyen Cong Thanh on 20/05/2019 16:41.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

export default class RegisterNewHtml extends Component {
  
  render() {
    const { localizeKey, view, handleSetView, viewNew,
      handleSetViewNew, InputPhoneComponent, PublicOtpComponent, InputAccountComponent,
      ScheduleComponent, NotiComponent, otpSuccess, apiLink } = this.props;

    const showView = () => {
      switch (viewNew.current) {
        case viewNew.inputPhone:
          return <InputPhoneComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} viewNew={viewNew} handleSetViewNew={handleSetViewNew} />
          break;
        case viewNew.otp:
          return <PublicOtpComponent apiLink={apiLink} handleOnClose={(event) => {
            event.preventDefault();
            handleSetViewNew(viewNew.inputPhone)
          }} handleOnSuccess={otpSuccess} />
          break;
        case viewNew.inputAccount:
          return <InputAccountComponent localizeKey={localizeKey} viewNew={viewNew} view={view} handleSetViewNew={handleSetViewNew} />
          break;
        case viewNew.schedule:
          return <ScheduleComponent localizeKey={localizeKey} viewNew={viewNew} view={view} handleSetViewNew={handleSetViewNew} />
          break;
        case viewNew.noti:
          return <NotiComponent localizeKey={localizeKey} viewNew={viewNew} handleSetViewNew={handleSetViewNew} />
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
