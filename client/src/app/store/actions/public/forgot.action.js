/**
 * Created By Nguyen Cong Thanh on 17/05/2019 10:15.
 *
 * Copyright Intelin 2019.
 */

import ActionType from '../action.type'
import AppServices from '../../../app.services'

class ForgotAction {

  constructor() {
    if (!ForgotAction.instance) {
      this.actionType = ActionType
      this.logger = AppServices.services.logger
      ForgotAction.instance = this
    }
    return ForgotAction.instance
  }

  sendInfo(key, data) {
    this.logger.info('ForgotAction excute sendInfo')
    this.logger.debug('Receive Key', key)
    this.logger.debug('Receive Data', data)
    try {
      return {
        key: key,
        type: this.actionType.FORGOT_SEND_INFO,
        payload: data
      }
    } catch (e) {
      this.logger.error(`ForgotAction sendInfo ${e.message.toString()}`)
    }
  }

  sendPassword(key, data) {
    this.logger.info('ForgotAction excute sendPassword')
    this.logger.debug('Receive Key', key)
    this.logger.debug('Receive Data', data)
    try {
      return {
        key: key,
        type: this.actionType.FORGOT_SEND_PASSWORD,
        payload: data
      }
    } catch (e) {
      this.logger.error(`ForgotAction sendPassword ${e.message.toString()}`)
    }
  }

  getUsername(key, data) {
    this.logger.info('ForgotAction excute getUsername')
    this.logger.debug('Receive Key', key)
    this.logger.debug('Receive Data', data)
    try {
      return {
        key: key,
        type: this.actionType.FORGOT_GET_USERNAME,
        payload: data
      }
    } catch (e) {
      this.logger.error(`ForgotAction getUsername ${e.message.toString()}`)
    }
  }
}

export default new ForgotAction()
