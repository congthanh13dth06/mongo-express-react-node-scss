/**
 * Created By Nguyen Cong Thanh on 09/05/2019 11:26.
 *
 * Copyright Intelin 2019.
 */

import { put, takeLatest } from 'redux-saga/effects'

import ActionType from '../../actions/action.type'
import AppServices from '../../../app.services'

class LoginSaga {

  constructor() {
    if (!LoginSaga.instance) {
      this.actionType = ActionType
      this.appService = AppServices
      LoginSaga.instance = this
    }
    return LoginSaga.instance
  }

  * checkUsername(action) {
    this.appService.services.logger.info('LoginSaga excute checkUsername')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.login.checkUsername(action.payload)
      this.appService.services.logger.debug('LoginSaga checkUsername Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      this.appService.services.logger.info(`LoginSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      response.key = action.key
      yield put({
        type: this.actionType.MESSAGE_CENTER_UPDATE,
        payload: response
      })
    } catch (e) {
      this.appService.services.logger.error(`LoginSaga checkUsername ${e.message}`)
    }
  }

  * watchCheckUsername() {
    yield takeLatest(this.actionType.LOGIN_CHECK_USERNAME, this.checkUsername.bind(this))
  }

  * checkPassword(action) {
    this.appService.services.logger.info('LoginSaga excute checkPassword')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.login.checkPassword(action.payload, action.key)
      this.appService.services.logger.debug('LoginSaga checkPassword Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      this.appService.services.logger.info(`LoginSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      response.key = action.key
      yield put({
        type: this.actionType.MESSAGE_CENTER_UPDATE,
        payload: response
      })
    } catch (e) {
      this.appService.services.logger.error(`LoginSaga checkPassword ${e.message}`)
    }
  }

  * watchCheckPassword() {
    yield takeLatest(this.actionType.LOGIN_CHECK_PASSWORD, this.checkPassword.bind(this))
  }

  * trustDevice(action) {
    this.appService.services.logger.info('LoginSaga excute trustDevice')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.form.trustDevice()
      this.appService.services.logger.debug('LoginSaga trustDevice Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      this.appService.services.logger.info(`LoginSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      // yield put({
      //   type: this.actionType.FORM_GET_ALL_COMPONENT_SUCCESS,
      //   payload: response.data
      // })
      // const response = {
      //   code: "2",
      //   data: {
      //
      //   }
      // }
      // response.key = action.key
      // yield put({
      //   type: this.actionType.MESSAGE_CENTER_UPDATE,
      //   payload: response
      // })
    } catch (e) {
      this.appService.services.logger.error(`LoginSaga trustDevice ${e.message}`)
    }
  }

  * watchTrustDevice() {
    yield takeLatest(this.actionType.LOGIN_TRUST_DEVICE, this.trustDevice.bind(this))
  }

}

export default new LoginSaga()
