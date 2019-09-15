/**
 * Created By Nguyen Cong Thanh on 03/04/2019 15:46.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import Button from '../base/button/button.component';
import Input from '../base/input/input.component';
import Modal from '../base/modal/modal.component';
import Svg from '../base/svg/file.svg'
import Style from './login.styles'

export default class BannedHtml extends Component {

  render() {

    // const { appServices, model, timeout, refLogin, ui, localizeKey,
    //   handleOnChange, handleOnBlur, handleOnClearUsername, handleOnShowPassword,
    //   handleOnSubmit, handleRedirectLoginUsername, handleRedirect, handleOnBack, handleChangeLanguage, handleOnCloseOtp, handleOtpSuccess,
    //   OtpComponent, handleRefLineProcress } = this.props;


    return (
      <Fragment>
        /*<div className={Style.FORM_ACCOUNT_LOCKED}>
          <div className={Style.FORM_ACCOUNT_LOCKED_TITLE}>
            <p>{appServices.services.localize.getLocalize(localizeKey.LOGIN_HEADER_ACCOUNT_LOCKED)}</p>
          </div>
          <div className={Style.LOGO}/>
          <div className={Style.DESCRIPTION}>
            <p>{appServices.services.localize.getLocalize(localizeKey.LOGIN_VALIDATION_ACCOUNT_LOCKED_1)}</p>
            <p>{appServices.services.localize.getLocalize(localizeKey.LOGIN_VALIDATION_ACCOUNT_LOCKED_2)}</p>
            <p>{appServices.services.localize.getLocalize(localizeKey.LOGIN_HOTLINE)}</p>
          </div>
          <div className={Style.GROUP_BUTTON}>
            <Button.primary
              style={{width: '100%'}}
              text={appServices.services.localize.getLocalize(localizeKey.LOGIN_BUTTON_BACK_HOME)}
              onClick={handleRedirectLoginUsername}
            />
          </div>
        </div>*/
      </Fragment>
    )
  }

}
