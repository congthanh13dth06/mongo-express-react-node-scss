/**
 * Created By Nguyen Cong Thanh on 20/05/2019 17:12.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import Button from '../../../base/button/button.component';
import Input from '../../../base/input/input.component';
import Select from '../../../base/input/select.component';
import Svg from '../../../base/svg/file.svg'
import Style from '../../register.styles'

export default class InputAccountHtml extends Component {

  render() {

    const { appServices, localizeKey, model, data, timeout, ui, view, handleSetView, viewNew, handleSetViewNew, handleOnShowPassword, handleRedirect, handleRefLineProcress, handleOnChange, handleTimeout } = this.props;

    const isShowIconDeleteText = () => {
      const icon = (ui.isShowBtn) ? {...Svg.DELETE_TEXT, onClick: (event) => {
        event.preventDefault();
        handleOnChange({
          target: {
            name: 'username',
            value: ''
          }
        })
      }} : {...Svg.CHECKED};
      icon.show = (model.username.length > 0)
      return icon
    }

    const isShowPassword = () => {
      const iconPassword = (!ui.isShowPassword) ? {...Svg.PASSWORD_DEFAULT, onClick: handleOnShowPassword} : {...Svg.PASSWORD_ACTIVE, onClick: handleOnShowPassword}
      return iconPassword
    }

    return (
      <div className={Style.REGISTER}>
        <div className={Style.HEADER}>
          <div><a className={Style.HEADER_ICON_RIGHT} href=""></a></div>
          <div>
            <a className={`${Style.HEADER_ICON_RIGHT} ${(timeout.status) ? Style.DISABLED : ''}`} href=""
              onClick={(event) => {handleRedirect(event, `${appServices.constant.router.PUBLIC}${appServices.constant.router.LOGIN}`)}}
            ><span>{appServices.services.localize.getLocalize(localizeKey.REGISTER_BUTTON_LOGIN)}</span></a>
          </div>
        </div>
        <div className={Style.PROGRESS_BAR}>
            <div className={Style.LINE_PROCESS} ref={handleRefLineProcress}  />
        </div>
        <div className={Style.TITLE}>
          <p style={{"color": "#1f346c"}}>{appServices.services.localize.getLocalize(localizeKey.REGISTER_HEADER_REGISTER)}</p>
        </div>
        <div className={Style.CAPTION}>
          <p>{appServices.services.localize.getLocalize(localizeKey.REGISTER_LETS_SET_UP)}</p>
        </div>
        <div className={Style.FORM_FOGOT}>
          <form>
            <div className={Style.FORM_ERROR}>
              <p>{(timeout.field === 'all') ? appServices.services.localize.getLocalize(timeout.message) : null}</p>
            </div>
            <Input.primary
              type="text"
              style={{"marginBottom": "20px", "maxHeight": "130px"}}
              text={appServices.services.localize.getLocalize(localizeKey.REGISTER_USERNAME)}
              placeholder={appServices.services.localize.getLocalize(localizeKey.REGISTER_USERNAME)}
              iconLeft={Svg.USERNAME}
              iconRight={isShowIconDeleteText()}
              tooltip={true}
              tooltipText={appServices.services.localize.getLocalize(localizeKey.REGISTER_VALIDATION_USERNAME_TOOLTIP)}
              name="username"
              value={model.username}
              onChange={handleOnChange}
              error={{status: (timeout.field === 'username'), message: appServices.services.localize.getLocalize(timeout.message)}}
              maxLength="45"
              disabled={timeout.status}
            />
            <Input.primary
              style={{"marginBottom": "20px", "maxHeight": "130px"}}
              type={!ui.isShowPassword ? 'password' : 'text'}
              text={appServices.services.localize.getLocalize(localizeKey.REGISTER_PASSWORD)}
              placeholder={appServices.services.localize.getLocalize(localizeKey.REGISTER_PASSWORD)}
              iconLeft={Svg.PASSWORD}
              iconRight={isShowPassword()}
              tooltip={true}
              tooltipText={appServices.services.localize.getLocalize(localizeKey.REGISTER_VALIDATION_PASSWORD_TOOLTIP)}
              name="password"
              value={model.password}
              onChange={handleOnChange}
              error={{status: (timeout.field === 'password'), message: appServices.services.localize.getLocalize(timeout.message)}}
              maxLength="35"
              disabled={timeout.status}
            />
            <Button.primary
              style={{width: '100%'}}
              text={appServices.services.localize.getLocalize(localizeKey.REGISTER_BUTTON_NEXT)}
              disabled={timeout.status || ui.isShowBtn}
              onClick={handleTimeout}
            />
          </form>
        </div>
      </div>
    )
  }

}
