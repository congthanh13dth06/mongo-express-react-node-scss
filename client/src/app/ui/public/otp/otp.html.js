/**
 * Created By Nguyen Cong Thanh on 13/05/2019 13:45.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import Button from '../base/button/button.component';
import Input from '../base/input/input.component';
import OTP from '../base/otp/otp.component';
import Svg from '../base/svg/file.svg'

export default class OtpHtml extends Component {

  render() {

    const { timeout, config, ui, handleOnClose, handleOnChange, handleOnResendOTP, refInput, handleRefLineProcess, model } = this.props;
    
    return (
      <Fragment>
        <OTP.primary
          maxLength={model.length}
          characterIsNumber={config.CHARACTER_IS_NUMBER}
          idProgressBar={ui.idProgressBar}
          disabled={timeout.status}
          onClose={handleOnClose}
          onChange={handleOnChange}
          onResendOTP={handleOnResendOTP}
          ref={refInput}
          error={{status: (timeout.field === 'code'), message: timeout.message}}
          isShowResendOtp={ui.isShowResendOtp}
          handleRefLineProcess={handleRefLineProcess}
          model={model}
        />
      </Fragment>
    )
  }

}
