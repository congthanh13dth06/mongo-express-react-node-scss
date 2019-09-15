/**
 * Created By Nguyen Cong Thanh on 03/04/2019 15:46.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import Style from './login.styles'

export default class LoginHtml extends Component {

  render() {
    const { localizeKey, view, handleSetView, UsernameComponent, PasswordComponent, OtpComponent } = this.props;

    const showView = () => {
      switch (view.current) {
        case view.username:
          return <UsernameComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} />
          break;
        case view.password:
          return <PasswordComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} />
          break;
        // case view.opt:
        //   return <OtpComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} />
        //   break;
        // case view.banned:
        //   return <BannedComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} />
        //   break;
        default:
          return null
      }
    }

    return (
      <Fragment>
        <div className={Style.PUBLIC}>
          <div className={Style.CONTAINER}>
            {showView()}
          </div>
        </div>
      </Fragment>
    )
  }

}
