/**
 * Created By Nguyen Cong Thanh on 20/05/2019 16:37.
 *
 * Copyright Intelin 2019.
 */

import {
  put,
  takeLatest
} from 'redux-saga/effects'

import ActionType from '../../actions/action.type'
import AppServices from '../../../app.services'

class RegisterSaga {

  constructor() {
    if (!RegisterSaga.instance) {
      this.actionType = ActionType
      this.appService = AppServices
      RegisterSaga.instance = this
    }
    return RegisterSaga.instance
  }

  * sendInfo(action) {
    this.appService.services.logger.info('RegisterSaga excute sendInfo')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.register.checkLicense(action.payload)
      this.appService.services.logger.debug('RegisterSaga checkLicense Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      this.appService.services.logger.info(`RegisterSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      response.key = action.key
      yield put({
        type: this.actionType.MESSAGE_CENTER_UPDATE,
        payload: response
      })
    } catch (e) {
      this.appService.services.logger.error(`RegisterSaga sendInfo ${e.message}`)
    }
  }

  * watchSendInfo() {
    yield takeLatest(this.actionType.REGISTER_SEND_INFO, this.sendInfo.bind(this))
  }

  * sendPhone(action) {
    this.appService.services.logger.info('RegisterSaga excute sendPhone')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.register.sendPhone(action.payload)
      this.appService.services.logger.debug('RegisterSaga sendPhone Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      this.appService.services.logger.info(`RegisterSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      response.key = action.key
      yield put({
        type: this.actionType.MESSAGE_CENTER_UPDATE,
        payload: response
      })
    } catch (e) {
      this.appService.services.logger.error(`RegisterSaga sendPhone ${e.message}`)
    }
  }

  * watchSendPhone() {
    yield takeLatest(this.actionType.REGISTER_SEND_PHONE, this.sendPhone.bind(this))
  }

  * sendAccount(action) {
    this.appService.services.logger.info('RegisterSaga excute sendAccount')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.register.sendAccount(action.payload)
      this.appService.services.logger.debug('RegisterSaga getAllComponent Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      this.appService.services.logger.info(`RegisterSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      response.key = action.key
      yield put({
        type: this.actionType.MESSAGE_CENTER_UPDATE,
        payload: response
      })
    } catch (e) {
      this.appService.services.logger.error(`RegisterSaga sendAccount ${e.message}`)
    }
  }

  * watchSendAccount() {
    yield takeLatest(this.actionType.REGISTER_SEND_ACCOUNT, this.sendAccount.bind(this))
  }

  * sendSchedule(action) {
    this.appService.services.logger.info('RegisterSaga excute sendSchedule')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.register.sendSchedule(action.payload)
      this.appService.services.logger.debug('RegisterSaga sendSchedule Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      this.appService.services.logger.info(`RegisterSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      response.key = action.key
      yield put({
        type: this.actionType.MESSAGE_CENTER_UPDATE,
        payload: response
      })
    } catch (e) {
      this.appService.services.logger.error(`RegisterSaga sendSchedule ${e.message}`)
    }
  }

  * watchSendSchedule() {
    yield takeLatest(this.actionType.REGISTER_SEND_SCHEDULE, this.sendSchedule.bind(this))
  }

}

export default new RegisterSaga()
