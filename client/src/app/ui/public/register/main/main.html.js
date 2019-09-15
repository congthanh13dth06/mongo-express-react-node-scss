import React, { Component, Fragment } from 'react'

import Button from '../../base/button/button.component';
import Input from '../../base/input/input.component';
import Select from '../../base/input/select.component';
import Svg from '../../base/svg/file.svg'
import Style from '../register.styles'

export default class RegisterMainHtml extends Component {

  render() {

    const { appServices, localizeKey, model, data, timeout, ui, handleRedirect, handleRefLineProcress, handleOnChange, handleTimeout } = this.props;

    return (
      <div className={Style.REGISTER}>
        <div className={Style.HEADER}>
          <div><a className={Style.HEADER_ICON_RIGHT} href=""></a></div>
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
            <div className={Style.FORM_ERROR}>
              <p>{(timeout.field === 'all') ? appServices.services.localize.getLocalize(timeout.message) : null}</p>
            </div>
            <Input.primary
              text={appServices.services.localize.getLocalize(localizeKey.REGISTER_FULL_NAME)}
              placeholder={appServices.services.localize.getLocalize(localizeKey.REGISTER_FULL_NAME)}
              iconLeft={Svg.USERNAME}
              style={{"marginBottom": "20px", "maxHeight": "130px"}}
              name="fullName"
              onChange={handleOnChange}
              maxLength="45"
              value={model.fullName}
              disabled={timeout.status}
              error={{status: (timeout.field === 'fullName'), message: appServices.services.localize.getLocalize(timeout.message)}}
            />
            <Select.primary
              style={{"marginBottom": "20px", "maxHeight": "130px"}}
              text={appServices.services.localize.getLocalize(localizeKey.REGISTER_DOCUMENT_TYPE)}
              placeholder={appServices.services.localize.getLocalize(localizeKey.REGISTER_DOCUMENT_TYPE)}
              iconLeft={Svg.ID_CARD}
              iconRight={Svg.DROP_DOWN}
              onChange={handleOnChange}
              list={ui.list}
              current={ui.current}
              name="identityDocument"
              disabled={timeout.status}
            />
            <Input.primary
              text={appServices.services.localize.getLocalize(localizeKey.REGISTER_IDENTITY_DOCUMENT_NO)}
              placeholder={appServices.services.localize.getLocalize(localizeKey.REGISTER_IDENTITY_DOCUMENT_NO)}
              iconLeft={Svg.ID_CARD}
              style={{"marginBottom": "20px", "maxHeight": "130px"}}
              name="identityNo"
              onChange={handleOnChange}
              maxLength="12"
              value={model.identityNo}
              disabled={timeout.status}
              error={{status: (timeout.field === 'identityNo'), message: appServices.services.localize.getLocalize(timeout.message)}}
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
