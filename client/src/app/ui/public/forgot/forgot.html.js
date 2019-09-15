/**
 * Created By Nguyen Cong Thanh on 13/05/2019 08:57.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import Style from './forgot.styles'

export default class ForgotHtml extends Component {

  render() {

    const { view, localizeKey, handleSetView, ForgotMainComponent, ForgotOtpComponent, ForgotInfoComponent, ForgotSuccessComponent, otpSuccess,apiLink } = this.props;

    const showView = () => {
      switch (view.current) {
        case view.main:
          return <ForgotMainComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} />
          break;
        case view.otp:
          return <ForgotOtpComponent apiLink={apiLink} handleOnClose={(event) => {
            event.preventDefault();
            handleSetView(view.main)
          }} handleOnSuccess={otpSuccess}
      
          />
          break;
        case view.info:
          return <ForgotInfoComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} />
          break;
        case view.success:
          return <ForgotSuccessComponent localizeKey={localizeKey} />
          break;
        default:
          return null
      }
    }

    return (
      <Fragment>
        <div className={Style.PUBLIC}>
          <div className={Style.CONTAINER}>
            {showView()}
          </div>
        </div>
      </Fragment>
    )
  }

}
