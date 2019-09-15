/**
 * Created By Nguyen Cong Thanh on 17/05/2019 16:35.
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

export default class ForgotInfoHtml extends Component {

  render() {

    const { appServices, localizeKey, model, data, timeout, ui, handleRedirect, handleRefLineProcress, handleRedirectViewMain, handleOnSubmit, handleOnChange, handleOnShowPassword } = this.props;

    const isShowPassword = () => {
      const iconPassword = (!ui.isShowPassword) ? {...Svg.PASSWORD_DEFAULT, onClick: handleOnShowPassword} : {...Svg.PASSWORD_ACTIVE, onClick: handleOnShowPassword}
      return iconPassword
    }

    return (
      <Fragment>
        <div className={Style.FORGOT}>
          <div className={Style.HEADER}>
            <div><a className={Style.HEADER_ICON_LEFT} href=":javascript"></a></div>
            <div><a className={`${Style.HEADER_ICON_RIGHT} ${timeout.status ? Style.DISABLED : null}`} href="" onClick={(event) => {
              handleRedirect(event, `${appServices.constant.router.PUBLIC}${appServices.constant.router.LOGIN}`)
            }}>
              <span>{appServices.services.localize.getLocalize(localizeKey.FORGOT_BUTTON_LOGIN)}</span></a>
            </div>
          </div>
          <div className={Style.PROGRESS_BAR}>
              <div className={Style.LINE_PROCESS} ref={handleRefLineProcress} />
          </div>
          <div className={Style.TITLE}>
            <p>{appServices.services.localize.getLocalize(localizeKey.FORGOT_HEADER_REGISTER)}</p>
          </div>
          <div className={Style.DESCRIPTION}>
            <p>{appServices.services.localize.getLocalize(localizeKey.FORGOT_YOUR_USERNAME)} <span>{model.username}</span>.</p>
            <p>{appServices.services.localize.getLocalize(localizeKey.FORGOT_LETS_ENTER_NEW_PASSWORD)}</p>
            <p>{appServices.services.localize.getLocalize(localizeKey.FORGOT_LETS_ENTER_NEW_PASSWORD_TIME)}</p>
          </div>
          <div className={Style.FORM_FOGOT}>
            <form>
              <Input.primary
                type={!ui.isShowPassword ? 'password' : 'text'}
                text={appServices.services.localize.getLocalize(localizeKey.FORGOT_PASSWORD_NO)}
                placeholder={appServices.services.localize.getLocalize(localizeKey.FORGOT_PASSWORD_NO)}
                value={model.password}
                onChange={()=>{}}
                style={{"marginBottom": "20px", "maxHeight": "130px"}}
                error={{status: (timeout.field === 'password'), message: appServices.services.localize.getLocalize(timeout.message)}}
                onChange={handleOnChange}
                name="password"
                disabled={timeout.status}
                iconLeft={Svg.PASSWORD}
                iconRight={isShowPassword()}
                tooltip={true}
                tooltipText={appServices.services.localize.getLocalize(localizeKey.FORGOT_VALIDATION_PASSWORD_TOOLTIP)}
                maxLength="35"
              />
              <Button.primary
                style={{width: '100%'}}
                type="submit"
                text={appServices.services.localize.getLocalize(localizeKey.FORGOT_BUTTON_RESET)}
                onClick={handleOnSubmit}
                disabled={timeout.status || ui.isShowBtn}
              />
            </form>
          </div>
        </div>
      </Fragment>
    )
  }

}
