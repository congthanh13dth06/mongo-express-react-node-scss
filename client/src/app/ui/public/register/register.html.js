import React, { Component, Fragment } from 'react'

import Style from './register.styles';

export default class RegisterHtml extends Component {

  render() {
    const { localizeKey, view, handleSetView, RegisterMainComponent, RegisterNewComponent, RegisterHadOnlineBankingComponent, RegisterNotOnlineBankingComponent, PublicOtpComponent, apiLink, otpSuccess} = this.props;

    const showView = () => {
      switch (view.current) {
        case view.main:
          return <RegisterMainComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} />
          break;
        case view.new:
          return <RegisterNewComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} />
          break;
        case view.otp:
          return <PublicOtpComponent apiLink={apiLink} handleOnClose={(event) => {
            event.preventDefault();
            handleSetView(view.main)
          }} handleOnSuccess={otpSuccess} />
          break;
        case view.hadOnlineBanking:
          return <RegisterHadOnlineBankingComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} />
          break;
        case view.notOnlineBanking:
          return <RegisterNotOnlineBankingComponent localizeKey={localizeKey} view={view} handleSetView={handleSetView} />
          break;
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
