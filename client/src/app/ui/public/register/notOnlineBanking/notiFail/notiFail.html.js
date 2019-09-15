/**
 * Created By Nguyen Cong Thanh on 22/05/2019 11:05.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import Button from '../../../base/button/button.component';
import Input from '../../../base/input/input.component';
import Select from '../../../base/input/select.component';
import Svg from '../../../base/svg/file.svg'
import Style from '../../register.styles'

export default class NotiFailHtml extends Component {

  render() {

    const { appServices, localizeKey, viewNotOnlineBanking, handleSetViewNotOnlineBanking } = this.props;

    return (
      <Fragment>
        <div className={Style.REGISTER} style={{"minHeight": "600px"}}>
          <div className={Style.FORM_SUCCESS}>
            <div className={Style.TITLE}>
              <p>{appServices.services.localize.getLocalize(localizeKey.REGISTER_HEADER_FAILED)}</p>
            </div>
            <div className={Style.LOGO}/>
            <div className={Style.DESCRIPTION}>
              <p>{appServices.services.localize.getLocalize(localizeKey.REGISTER_VALIDATION_ACCOUNT_NO_ONLINE_BANKING_ONE)}</p>
              <p>{appServices.services.localize.getLocalize(localizeKey.REGISTER_VALIDATION_ACCOUNT_NO_ONLINE_BANKING_TWO)}</p>
            </div>
            <div className={Style.GROUP_BUTTON}>
              <Button.primary
                style={{width: '100%'}}
                text={appServices.services.localize.getLocalize(localizeKey.REGISTER_BUTTON_SCHEDULE_TIME)}
                onClick={(event) => {
                  event.preventDefault();
                  handleSetViewNotOnlineBanking(viewNotOnlineBanking.schedule)
                }}
              />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

}
