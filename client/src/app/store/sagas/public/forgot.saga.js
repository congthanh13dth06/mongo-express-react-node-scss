/**
 * Created By Nguyen Cong Thanh on 17/05/2019 10:15.
 *
 * Copyright Intelin 2019.
 */

import {
  put,
  takeLatest
} from 'redux-saga/effects'

import ActionType from '../../actions/action.type'
import AppServices from '../../../app.services'

class ForgotSaga {

  constructor() {
    if (!ForgotSaga.instance) {
      this.actionType = ActionType
      this.appService = AppServices
      ForgotSaga.instance = this
    }
    return ForgotSaga.instance
  }

  * sendInfo(action) {
    this.appService.services.logger.info('ForgotSaga excute sendInfo')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.forgot.sendInfo(action.payload)
      this.appService.services.logger.debug('ForgotSaga sendInfo Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      this.appService.services.logger.info(`ForgotSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      response.key = action.key
      yield put({
        type: this.actionType.MESSAGE_CENTER_UPDATE,
        payload: response
      })
    } catch (e) {
      this.appService.services.logger.error(`ForgotSaga sendInfo ${e.message}`)
    }
  }

  * watchSendInfo() {
    yield takeLatest(this.actionType.FORGOT_SEND_INFO, this.sendInfo.bind(this))
  }

  * sendPassword(action) {
    this.appService.services.logger.info('ForgotSaga excute sendPassword')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.forgot.sendPassword(action.payload)
      this.appService.services.logger.debug('ForgotSaga sendPassword Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      // this.appService.services.validatorResponse.form.getAllComponent(response.data)
      // this.appService.services.logger.info('ForgotSaga getAllComponent excute save data redux')
      // yield put({
      //   type: this.actionType.FORM_GET_ALL_COMPONENT_SUCCESS,
      //   payload: response.data
      // })
      // yield delay(10)
      this.appService.services.logger.info(`ForgotSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      response.key = action.key
      yield put({
        type: this.actionType.MESSAGE_CENTER_UPDATE,
        payload: response
      })
    } catch (e) {
      this.appService.services.logger.error(`ForgotSaga sendPassword ${e.message}`)
    }
  }

  * watchSendPassword() {
    yield takeLatest(this.actionType.FORGOT_SEND_PASSWORD, this.sendPassword.bind(this))
  }

  * getUsername(action) {
    this.appService.services.logger.info('ForgotSaga excute getUsername')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.forgot.getUsername(action.payload)
      this.appService.services.logger.debug('ForgotSaga getUsername Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      this.appService.services.logger.info(`ForgotSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      response.key = action.key
      yield put({
        type: this.actionType.MESSAGE_CENTER_UPDATE,
        payload: response
      })
    } catch (e) {
      this.appService.services.logger.error(`ForgotSaga getUsername ${e.message}`)
    }
  }

  * watchGetUsername() {
    yield takeLatest(this.actionType.FORGOT_GET_USERNAME, this.getUsername.bind(this))
  }
}

export default new ForgotSaga()
