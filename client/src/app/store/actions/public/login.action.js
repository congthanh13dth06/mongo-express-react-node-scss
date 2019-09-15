/**
 * Created By Nguyen Cong Thanh on 09/05/2019 11:26.
 *
 * Copyright Intelin 2019.
 */

import ActionType from '../action.type'
import AppServices from '../../../app.services'

class LoginAction {

  constructor() {
    if (!LoginAction.instance) {
      this.actionType = ActionType
      this.logger = AppServices.services.logger
      LoginAction.instance = this
    }
    return LoginAction.instance
  }

  checkUserName(key, username) {
    this.logger.info('LoginAction excute checkUserName')
    this.logger.debug('Receive Key', key)
    this.logger.debug('Receive Username', username)
    try {
      return {
        key: key,
        type: this.actionType.LOGIN_CHECK_USERNAME,
        payload: username
      }
    } catch (e) {
      this.logger.error(`LoginAction checkUserName ${e.message.toString()}`)
    }
  }

  checkPassword(key, password) {
    this.logger.info('LoginAction excute checkPassword')
    this.logger.debug('Receive Key', key)
    this.logger.debug('Receive Password', password)
    try {
      return {
        key: key,
        type: this.actionType.LOGIN_CHECK_PASSWORD,
        payload: password
      }
    } catch (e) {
      this.logger.error(`LoginAction checkPassword ${e.message.toString()}`)
    }
  }

}

export default new LoginAction()
