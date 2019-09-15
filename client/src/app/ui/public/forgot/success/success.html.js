/**
 * Created By Nguyen Cong Thanh on 20/05/2019 09:48.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import Button from '../../base/button/button.component';
import Input from '../../base/input/input.component';
import InputPhone from '../../base/input/phone.component'
import SelectComponent from '../../base/input/select.component'
import Svg from '../../base/svg/file.svg'
import Style from '../forgot.styles'

export default class ForgotSuccessHtml extends Component {

  render() {

    const { appServices, localizeKey, handleRedirect } = this.props;

    return (
      <Fragment>
        <div className={Style.FORGOT}>
          <div className={Style.FORM_SUCCESS}>
            <div className={Style.TITLE}>
              <p>{appServices.services.localize.getLocalize(localizeKey.FORGOT_HEADER_SUCCESSFUL)}</p>
            </div>
            <div className={Style.LOGO}/>
            <div className={Style.DESCRIPTION}>
              <p>{appServices.services.localize.getLocalize(localizeKey.FORGOT_RESET_PASSWORD_SUCCESSFUL)}</p>
            </div>
            <div className={Style.GROUP_BUTTON}>
              <Button.primary
                style={{width: '100%'}}
                text={appServices.services.localize.getLocalize(localizeKey.FORGOT_BUTTON_BACK_HOME)}
                onClick={(event) => {
                  handleRedirect(event, `${appServices.constant.router.PUBLIC}${appServices.constant.router.LOGIN}`)
                }}
              />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

}
