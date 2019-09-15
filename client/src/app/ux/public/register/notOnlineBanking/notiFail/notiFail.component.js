/**
 * Created By Nguyen Cong Thanh on 22/05/2019 11:05.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'

import AppServices from '../../../../../app.services'
import NotiFailHtml from '../../../../../ui/public/register/notOnlineBanking/notiFail/notiFail.html'

export default class NotiFailComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { localizeKey, viewNotOnlineBanking, handleSetViewNotOnlineBanking } = this.props;

    return (
      <NotiFailHtml
        appServices={AppServices}
        localizeKey={localizeKey}

        viewNotOnlineBanking={viewNotOnlineBanking}
        handleSetViewNotOnlineBanking={handleSetViewNotOnlineBanking}
      />
    )
  }

}
