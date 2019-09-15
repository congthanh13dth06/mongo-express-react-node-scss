/**
 * Created By Nguyen Cong Thanh on 20/05/2019 16:37.
 *
 * Copyright Intelin 2019.
 */

import ActionType from '../action.type'
import AppServices from '../../../app.services'

class RegisterAction {

  constructor() {
    if (!RegisterAction.instance) {
      this.actionType = ActionType
      this.logger = AppServices.services.logger
      RegisterAction.instance = this
    }
    return RegisterAction.instance
  }

  sendInfo(key, data) {
    this.logger.info('RegisterAction excute sendInfo')
    this.logger.debug('Receive Key', key)
    this.logger.debug('Receive Data', data)
    try {
      return {
        key: key,
        type: this.actionType.REGISTER_SEND_INFO,
        payload: data
      }
    } catch (e) {
      this.logger.error(`RegisterAction sendInfo ${e.message.toString()}`)
    }
  }

  sendPhone(key, data) {
    this.logger.info('RegisterAction excute sendPhone')
    this.logger.debug('Receive Key', key)
    this.logger.debug('Receive Data', data)
    try {
      return {
        key: key,
        type: this.actionType.REGISTER_SEND_PHONE,
        payload: data
      }
    } catch (e) {
      this.logger.error(`RegisterAction sendPhone ${e.message.toString()}`)
    }
  }

  sendAccount(key, data) {
    this.logger.info('RegisterAction excute sendAccount')
    this.logger.debug('Receive Key', key)
    this.logger.debug('Receive Data', data)
    try {
      return {
        key: key,
        type: this.actionType.REGISTER_SEND_ACCOUNT,
        payload: data
      }
    } catch (e) {
      this.logger.error(`RegisterAction sendAccount ${e.message.toString()}`)
    }
  }

  sendSchedule(key, data) {
    this.logger.info('RegisterAction excute sendSchedule')
    this.logger.debug('Receive Key', key)
    this.logger.debug('Receive Data', data)
    try {
      return {
        key: key,
        type: this.actionType.REGISTER_SEND_SCHEDULE,
        payload: data
      }
    } catch (e) {
      this.logger.error(`RegisterAction sendSchedule ${e.message.toString()}`)
    }
  }

}

export default new RegisterAction()
