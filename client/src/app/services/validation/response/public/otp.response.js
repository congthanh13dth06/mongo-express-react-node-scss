/**
 * Created By Nguyen Cong Thanh on 24/04/2019 08:45.
 *
 * Copyright Intelin 2019.
 */

import LoggerService from '../../../logger/logger.service'
import ValidatorService from '../../validator'
import HelperService from '../../../helper/helper.service'

class ValidatorOTPResponse {

  constructor() {
    if (!ValidatorOTPResponse.instance) {
      this.logger = LoggerService;
      this.validator = ValidatorService;
      this.helper = HelperService
      ValidatorOTPResponse.instance = this
    }
    return ValidatorOTPResponse.instance
  }

  * otpRequired(response) {
    this.logger.info('ValidatorOTPResponse excute otpRequired')
    this.logger.debug('Receive response', response)
    try {
      const regex = new RegExp(/^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      this.validator.isObject('Data', response.data, 'Is not obj')
      this.validator.isNotEmpty('otpKey', response.data.otpKey, 'Is not empty')
      this.validator.isNotEmpty('contact', response.data.contact, 'Is not empty')
      this.validator.isNotEmpty('length', response.data.length, 'Is not empty')
      this.validator.isNotEmpty('timeCodeExpire', response.data.timeCodeExpire, 'Is not empty')
      this.validator.isString('otpKey', response.data.otpKey, 'Is not string')
      this.validator.isString('contact', response.data.contact, 'Is not string')
      this.validator.isNumber('length', response.data.length, 'Is not number')
      this.validator.isNumber('timeCodeExpire', response.data.timeCodeExpire, 'Is not number')
      response.data.isEmail = regex.test(response.data.contact)
      this.logger.info(`ValidatorOTPResponse excute save data to reducer with action type ${this.actionType.PUBLIC_OTP_UPDATE}`)
      yield put({
        type: this.actionType.PUBLIC_OTP_UPDATE,
        payload: response.data
      })
      this.helper.delay(10)
      return response
    } catch (e) {
      this.logger.error(`ValidatorOTPResponse otpRequired Field ${e.field} Message ${e.message}`)
      throw new Error(`ValidatorOTPResponse otpRequired Field ${e.field} Message ${e.message}`)
    }
  }

  * otpSuccess(response){
    this.logger.info('ValidatorOTPResponse Excute otpSuccess')
    this.logger.debug('Receive response', response)
    try {
      this.validator.isObject('Data', response.data, 'Is not obj')
      this.validator.isNotEmpty('refKey', response.data.refKey, 'Is not empty')
      this.validator.isString('refKey', response.data.refKey, 'Is not string')
      this.logger.info(`ValidatorOTPResponse excute save data to reducer with action type ${this.actionType.PUBLIC_OTP_UPDATE}`)
      yield put({
        type: this.actionType.PUBLIC_OTP_UPDATE,
        payload: response.data
      })
      this.helper.delay(10)
      return response
    } catch (e) {
      this.logger.error(`ValidatorOTPResponse otpSuccess error Field ${e.field} Message ${e.message}`)
      throw new Error(`ValidatorOTPResponse otpSuccess error Field ${e.field} Message ${e.message}`)
    }
  }
}

export default new ValidatorOTPResponse()
