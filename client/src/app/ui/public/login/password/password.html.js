/**
 * Created By Nguyen Cong Thanh on 03/04/2019 15:46.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import Button from '../../base/button/button.component';
import Input from '../../base/input/input.component';
import Modal from '../../base/modal/modal.component';
import Svg from '../../base/svg/file.svg'
import Style from '../login.styles'

export default class LoginHtml extends Component {

  render() {

    const { appServices, model, timeout, refLogin, ui, localizeKey,
      handleOnChange, handleOnBlur, handleOnShowPassword, handleOnBack,
      handleOnSubmit, handleRedirect, handleChangeLanguage, handleRefLineProcress } = this.props;

    const language = () => {
      return appServices.config.app.LOCALIZE.LANGUAGE.map((item, key) => {
        return (
          <Fragment key={`${item.key}${key}`}>
            <span className={[(appServices.services.localize.langCurrent === item.key) ? Style.HEADER_LANGUAGE_ACTIVE : ''].join(' ')}>
              {item.key}
            </span>{(key % 2 === 0) ? '/' : null}
          </Fragment>
        )
      })
    }

    const isShowPassword = () => {
      const iconPassword = (!ui.isShowPassword) ? {...Svg.PASSWORD_DEFAULT, onClick: handleOnShowPassword} : {...Svg.PASSWORD_ACTIVE, onClick: handleOnShowPassword}
      return iconPassword
    }

    return (
      <Fragment>
        <div className={Style.LOGIN}>
          <div className={Style.HEADER}>
            <div>
              <a className={`${Style.HEADER_ICON_LEFT} ${timeout.status ? Style.DISABLED : ''}`} href="" onClick={handleOnBack}>
                {Svg.BACK.content}<span>{appServices.services.localize.getLocalize(localizeKey.COMMON_BACK)}</span></a>
            </div>
            <div>
              <a className={[Style.LANGUAGE,Style.HEADER_ICON_RIGHT].join(' ')} href="" onClick={handleChangeLanguage}>
                {language()}
              </a>
            </div>
          </div>
          <div className={Style.PROGRESS_BAR}>
            <div className={Style.LINE_PROCESS} ref={handleRefLineProcress} />
          </div>
          <div className={Style.FORM_INPUT}>
            <form>
              <div className={Style.LOGO}>{Svg.LOGIN_TITLE}</div>
              <div style={{marginTop: "50px", marginBottom: "30px"}}>
                <Input.primary
                  type={!ui.isShowPassword ? 'password' : 'text'} text={appServices.services.localize.getLocalize(localizeKey.LOGIN_PASSWORD)} placeholder={appServices.services.localize.getLocalize(localizeKey.LOGIN_PASSWORD)} autoComplete='off' value={model.password}
                  onChange={handleOnChange} error={{status: timeout.field === 'password' || timeout.field === 'all', message: appServices.services.localize.getLocalize(timeout.message)}}
                  iconLeft={Svg.PASSWORD} iconRight={isShowPassword()} onBlur={handleOnBlur}
                  ref={(input) => {refLogin.password = input}} disabled={timeout.status} name="password" maxLength="35" style={{"maxHeight": "130px"}}
                />
              </div>
              <div className={Style.GROUP_BUTTON}>
                <Button.primary
                  style={{width: '100%'}}
                  type="submit"
                  text={appServices.services.localize.getLocalize(localizeKey.LOGIN_BUTTON_NEXT)}
                  onClick={handleOnSubmit}
                  disabled={ui.isShowBtn || timeout.status}
                />
                <p className={Style.LINK}><a className={`${Style.LINK_FORGOT} ${timeout.status ? Style.DISABLED : ''}`} href="" onClick={(event) => {
                  handleRedirect(event, `${appServices.constant.router.PUBLIC}${appServices.constant.router.FORGOT}`)
                }}>{appServices.services.localize.getLocalize(localizeKey.LOGIN_BUTTON_FORGOT_LOGIN_INFO)}</a></p>
                <p className={Style.LINK}><a className={`${Style.LINK_REGISTER} ${timeout.status ? Style.DISABLED : ''}`} href="" onClick={(event) => {
                    handleRedirect(event, `${appServices.constant.router.PUBLIC}${appServices.constant.router.REGISTER}`)
                }}>{appServices.services.localize.getLocalize(localizeKey.LOGIN_BUTTON_REGISTER)}</a></p>
              </div>
            </form>
          </div>
        </div>
        <div className={Style.POWER_BY}/>
      </Fragment>
    )
  }

}
