/**
 * Created By Nguyen Cong Thanh on 22/05/2019 11:20.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../../../app.services'
import NotiSuccessHtml from '../../../../../ui/public/register/notOnlineBanking/notiSuccess/notiSuccess.html'

export default class NotiSuccessComponent extends Component {

  constructor(props) {
    super(props)

    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleRedirect(event, state) {
    AppServices.services.logger.info('NotiSuccessComponent excute handleRedirect')
    AppServices.services.logger.debug('State', state)
    try {
      if (event) event.preventDefault();
      const { history } = this.props;
      history.push(state)
    } catch (e) {
      AppServices.services.logger.error(`NotiSuccessComponent handleRedirect ${e.toString()}`)
    }
  }

  render() {

    const { localizeKey, viewNotOnlineBanking, handleSetViewNotOnlineBanking } = this.props;

    return (
      <NotiSuccessHtml
        appServices={AppServices}
        localizeKey={localizeKey}

        handleRedirect={this.handleRedirect}
      />
    )
  }

}
