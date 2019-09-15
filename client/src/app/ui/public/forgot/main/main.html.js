/**
 * Created By Nguyen Cong Thanh on 15/05/2019 16:41.
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

export default class ForgotMainHtml extends Component {

  render() {

    const { appServices, localizeKey, model, data, timeout, ui, handleRefLineProcress, handleRedirect, handleOnSubmit, handleOnChange } = this.props;

    return (
      <Fragment>
        <div className={Style.FORGOT}>
          <div className={Style.HEADER}>
            <div><a className={Style.HEADER_ICON_LEFT} href=":javascript"></a></div>
            <div>
              <a className={`${Style.HEADER_ICON_RIGHT} ${timeout.status ? Style.DISABLED : ''}`} href=""
                onClick={(event) => {handleRedirect(event, `${appServices.constant.router.PUBLIC}${appServices.constant.router.LOGIN}`)}}
              ><span>{appServices.services.localize.getLocalize(localizeKey.FORGOT_BUTTON_LOGIN)}</span></a>
            </div>
          </div>
          <div className={Style.PROGRESS_BAR}>
              <div className={Style.LINE_PROCESS} ref={handleRefLineProcress} />
          </div>
          <div className={Style.TITLE}>
            <p>{appServices.services.localize.getLocalize(localizeKey.FORGOT_HEADER_REGISTER)}</p>
          </div>
          <div className={Style.FORM_FOGOT}>
            <form>
              <div className={Style.FORM_ERROR}>
                <p>{(timeout.field === 'all') ? (appServices.services.localize.getLocalize(timeout.message)) : null}</p>
              </div>
              <InputPhone.primary
                text={appServices.services.localize.getLocalize(localizeKey.FORGOT_PHONE_NO)}
                placeholder={appServices.services.localize.getLocalize(localizeKey.FORGOT_PHONE_NO)}
                style={{"marginBottom": "20px", "maxHeight": "130px"}}
                error={{status: (timeout.field === 'phoneNumber'), message: appServices.services.localize.getLocalize(timeout.message)}}
                value={model.phoneNumber}
                onChange={handleOnChange}
                name="phoneNumber"
                disabled={timeout.status}
                maxLength="13"
              />
              <SelectComponent.primary
                text={appServices.services.localize.getLocalize(localizeKey.FORGOT_IDENTITY_DOCUMENT)}
                style={{"marginBottom": "20px", "maxHeight": "130px"}}
                iconLeft={Svg.ID_CARD}
                iconRight={Svg.DROP_DOWN}
                list={ui.list}
                current={ui.current}
                onChange={handleOnChange}
                name="identityDocument"
                disabled={timeout.status}
              />
              <Input.primary
                text={appServices.services.localize.getLocalize(localizeKey.FORGOT_IDENTITY_CARD_NO)}
                placeholder={appServices.services.localize.getLocalize(localizeKey.FORGOT_IDENTITY_CARD_NO)}
                value={model.identityNo}
                onChange={()=>{}}
                style={{"marginBottom": "20px", "maxHeight": "130px"}}
                iconLeft={Svg.IDENTITY_DOCUMENT_NO}
                error={{status: (timeout.field === 'identityNo'), message: appServices.services.localize.getLocalize(timeout.message)}}
                onChange={handleOnChange}
                name="identityNo"
                disabled={timeout.status}
                maxLength="12"
              />
              <Button.primary
                style={{width: '100%'}}
                type="submit"
                text={appServices.services.localize.getLocalize(localizeKey.FORGOT_BUTTON_NEXT)}
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
