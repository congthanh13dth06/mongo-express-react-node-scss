/**
 * Created By Nguyen Cong Thanh on 09/05/2019 11:26.
 *
 * Copyright Intelin 2019.
 */

import {
  put,
  takeLatest
} from 'redux-saga/effects'

import ActionType from '../../actions/action.type'
import AppServices from '../../../app.services'

class PublicOtpSaga {

  constructor() {
    if (!PublicOtpSaga.instance) {
      this.actionType = ActionType
      this.appService = AppServices
      PublicOtpSaga.instance = this
    }
    return PublicOtpSaga.instance
  }

  * resend(action) {
    this.appService.services.logger.info('PublicOtpSaga excute resend')
    this.appService.services.logger.debug('Receive action', action)
    try {
      // const response = yield this.appService.apis.form.getAllComponent()
      // this.appService.services.logger.debug('PublicOtpSaga getAllComponent Receive response', response)
      // this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      // this.appService.services.validatorResponse.form.getAllComponent(response.data)
      // this.appService.services.logger.info('PublicOtpSaga getAllComponent excute save data redux')
      // yield put({
      //   type: this.actionType.FORM_GET_ALL_COMPONENT_SUCCESS,
      //   payload: response.data
      // })
      // yield delay(10)
      // const response = {
      //   code: "1",
      //   data: {
      //
      //   }
      // }
      // this.logger.info(`PublicOtpSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      // response.key = action.key
      // yield put({
      //   type: this.actionType.MESSAGE_CENTER_UPDATE,
      //   payload: response
      // })
    } catch (e) {
      this.appService.services.logger.error(`PublicOtpSaga resend ${e.message}`)
    }
  }

  * watchResend() {
    yield takeLatest(this.actionType.PUBLIC_OTP_RESEND, this.resend.bind(this))
  }

  * send(action) {
    this.appService.services.logger.info('PublicOtpSaga excute send')
    this.appService.services.logger.debug('Receive action', action)
    try {
      const response = yield this.appService.apis.publicOtp.send(action.payload)
      this.appService.services.logger.debug('PublicOtpSaga send Receive response', response)
      this.appService.services.validator.isNotEmpty('', response, 'Response data is null')
      this.appService.services.logger.info(`PublicOtpSaga excute save data to reducer with action type ${this.actionType.MESSAGE_CENTER_UPDATE}`)
      response.key = action.key
      yield put({
        type: this.actionType.MESSAGE_CENTER_UPDATE,
        payload: response
      })
    } catch (e) {
      this.appService.services.logger.error(`PublicOtpSaga send ${e.message}`)
    }
  }

  * watchSend() {
    yield takeLatest(this.actionType.PUBLIC_OTP_SEND, this.send.bind(this))
  }

}

export default new PublicOtpSaga()
