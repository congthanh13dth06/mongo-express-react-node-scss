/**
 * Created By Nguyen Cong Thanh on 03/04/2019 15:46.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import Button from '../../base/button/button.component';
import Input from '../../base/input/input.component';
import Svg from '../../base/svg/file.svg'
import Style from '../login.styles'

export default class UsernameHtml extends Component {

  render() {

    const { appServices, model, timeout, refLogin, ui, localizeKey,
      handleOnChange, handleOnBlur, handleOnClearUsername,
      handleOnSubmit, handleRedirect, handleChangeLanguage, handleOtpSuccess,
      handleRefLineProcress } = this.props;

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

    const isShowIconDeleteText = () => {
      const icon = (ui.isShowBtn) ? {...Svg.DELETE_TEXT, onClick: handleOnClearUsername} : {...Svg.CHECKED};
      icon.show = (model.username.length > 0)
      return icon
    }

    return (
      <Fragment>
        <div className={Style.LOGIN}>
          <div className={Style.HEADER}>
            <div></div>
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
                  type="text" text={appServices.services.localize.getLocalize(localizeKey.LOGIN_USERNAME)} placeholder={appServices.services.localize.getLocalize(localizeKey.LOGIN_USERNAME)} autoComplete='off' value={model.username}
                  onChange={handleOnChange} error={{status: timeout.field === 'username' || timeout.field === 'all', message: appServices.services.localize.getLocalize(timeout.message)}}
                  iconLeft={Svg.USERNAME} iconRight={isShowIconDeleteText()} maxLength="45" onBlur={handleOnBlur}
                  ref={(input) => {refLogin.username = input}} disabled={timeout.status} name="username" style={{"maxHeight": "130px"}}
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
