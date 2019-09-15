/**
 * Created By Nguyen Cong Thanh on 20/05/2019 16:58.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import Button from '../../../base/button/button.component';
import InputPhone from '../../../base/input/phone.component';
import Svg from '../../../base/svg/file.svg'
import Style from '../../register.styles'

export default class InputPhoneHtml extends Component {

  render() {

    const { appServices, localizeKey, model, data, timeout, ui, view, handleSetView, viewNew, handleSetViewNew, handleRedirect, handleRefLineProcress, handleOnChange, handleTimeout } = this.props;

    const isShowIconDeleteText = () => {
      const icon = {...Svg.DELETE_TEXT, onClick: (event) => {
        handleOnChange({
          target: {
            value: '',
            name: 'phoneNumber'
          }
        })
      }};
      icon.show = (model.phoneNumber.length > 0)
      return icon
    }

    return (
      <div className={Style.REGISTER}>
        <div className={Style.HEADER}>
          <div><a className={`${Style.HEADER_ICON_LEFT} ${(timeout.status) ? Style.DISABLED : null}`} href="javascript:" onClick={(event) => {
            event.preventDefault()
            handleSetView(view.main)
          }}>{Svg.BACK.content}<span>{appServices.services.localize.getLocalize(localizeKey.COMMON_BACK)}</span></a></div>
          <div>
            <a className={`${Style.HEADER_ICON_RIGHT} ${timeout.status ? Style.DISABLED : ''}`} href=""
              onClick={(event) => {handleRedirect(event, `${appServices.constant.router.PUBLIC}${appServices.constant.router.LOGIN}`)}}
            ><span>{appServices.services.localize.getLocalize(localizeKey.REGISTER_BUTTON_LOGIN)}</span></a>
          </div>
        </div>
        <div className={Style.PROGRESS_BAR}>
            <div className={Style.LINE_PROCESS} ref={handleRefLineProcress} />
        </div>
        <div className={Style.TITLE}>
          <p>{appServices.services.localize.getLocalize(localizeKey.REGISTER_HEADER_REGISTER)}</p>
        </div>
        <div className={Style.FORM_FOGOT}>
          <form>
            <InputPhone.primary
              text={appServices.services.localize.getLocalize(localizeKey.REGISTER_PHONE_NUMBER)}
              placeholder={appServices.services.localize.getLocalize(localizeKey.REGISTER_PHONE_NUMBER)}
              style={{"marginBottom": "20px", "maxHeight": "130px"}}
              value={model.phoneNumber}
              name="phoneNumber"
              maxLength="13"
              iconRight={isShowIconDeleteText()}
              disabled={timeout.status}
              onChange={handleOnChange}
              error={{status: (timeout.field === 'phoneNumber' || timeout.field === 'all'), message: appServices.services.localize.getLocalize(timeout.message)}}
            />
            <Button.primary
              style={{width:'100%'}}
              text={appServices.services.localize.getLocalize(localizeKey.REGISTER_BUTTON_NEXT)}
              onClick={handleTimeout}
              disabled={timeout.status || ui.isShowBtn}
            />
          </form>
        </div>
      </div>
    )
  }

}
