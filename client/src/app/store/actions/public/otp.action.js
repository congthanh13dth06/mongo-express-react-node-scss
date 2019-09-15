/**
 * Created By Nguyen Cong Thanh on 13/05/2019 17:01.
 *
 * Copyright Intelin 2019.
 */

import ActionType from '../action.type'
import AppServices from '../../../app.services'

class PublicOtpAction {

  constructor() {
    if (!PublicOtpAction.instance) {
      this.actionType = ActionType
      this.logger = AppServices.services.logger
      PublicOtpAction.instance = this
    }
    return PublicOtpAction.instance
  }

  resend(otpKey) {
    this.logger.info('PublicOtpAction excute resend')
    this.logger.debug('Receive OtpKey', otpKey)
    try {
      return {
        type: this.actionType.PUBLIC_OTP_RESEND,
        payload: otpKey
      }
    } catch (e) {
      this.logger.error(`PublicOtpAction resend ${e.message.toString()}`)
    }
  }

  send(key, data) {
    this.logger.info('PublicOtpAction excute send')
    this.logger.debug('Receive Key', key)
    this.logger.debug('Receive Data', data)
    try {
      return {
        key: key,
        type: this.actionType.PUBLIC_OTP_SEND,
        payload: data
      }
    } catch (e) {
      this.logger.error(`PublicOtpAction send ${e.message.toString()}`)
    }
  }

}

export default new PublicOtpAction()
