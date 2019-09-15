/**
 * Created By Nguyen Cong Thanh on 20/05/2019 09:48.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import ForgotSuccessHtml from '../../../../ui/public/forgot/success/success.html'
import AppServices from '../../../../app.services'

export default class ForgotSuccessComponent extends Component {

  constructor(props) {
    super(props)

    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleRedirect(event, state) {
    AppServices.services.logger.info('ForgotSuccessComponent excute handleRedirect')
    AppServices.services.logger.debug('State', state)
    try {
      if (event) event.preventDefault();
      const { history } = this.props;
      history.push(state)
    } catch (e) {
      AppServices.services.logger.error(`ForgotSuccessComponent handleRedirect ${e.toString()}`)
    }
  }

  render() {

    const { localizeKey } = this.props;

    return (
      <ForgotSuccessHtml
        appServices={AppServices}
        localizeKey={localizeKey}
        handleRedirect={this.handleRedirect}
      />
    )
  }

}
