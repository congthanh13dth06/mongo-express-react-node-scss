/**
 * Created By Nguyen Cong Thanh on 20/05/2019 17:20.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../../../app.services'
import NotiHtml from '../../../../../ui/public/register/new/noti/noti.html'

export default class NotiComponent extends Component {

  constructor(props) {
    super(props)

    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleRedirect(event, state) {
    AppServices.services.logger.info('NotiComponent excute handleRedirect')
    AppServices.services.logger.debug('State', state)
    try {
      if (event) event.preventDefault();
      const { history } = this.props;
      history.push(state)
    } catch (e) {
      AppServices.services.logger.error(`NotiComponent handleRedirect ${e.toString()}`)
    }
  }

  render() {

    const { localizeKey } = this.props;

    return (
      <NotiHtml
        appServices={AppServices}
        localizeKey={localizeKey}
        handleRedirect={this.handleRedirect}
      />
    )
  }

}
