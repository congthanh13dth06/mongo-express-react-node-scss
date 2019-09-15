/**
 * Created By Nguyen Cong Thanh on 24/04/2019 08:45.
 *
 * Copyright Intelin 2019.
 */

import LoggerService from '../../logger/logger.service'
import ValidatorService from '../validator'
import MessageCode from '../../codeResponse/message/message.code'
import HttpCode from '../../codeResponse/http/http.code'

// Public
import ValidatorLoginResponse from './public/login.response'
import ValidatorOTPResponse from './public/otp.response'
import ValidatorForgotResponse from './public/forgot.response'
import ValidatorRegisterResponse from './public/register.response'

class ValidatorCommonResponse {

  constructor() {
    if (!ValidatorCommonResponse.instance) {
      this.logger = LoggerService;
      this.validator = ValidatorService;
      this.httpCode = HttpCode;
      this.code = new Map([])

      // Login
      this.code.set(MessageCode.LOGIN_USERNAME_SUCCESS, ValidatorLoginResponse.checkUsername.bind(ValidatorLoginResponse))

      // Register
      this.code.set(MessageCode.REGISTER_CREATE_TEMP_USER_WITHOUT_ONLINE_BANKING_SUCCESS, ValidatorRegisterResponse.notOnlineBanking.bind(ValidatorRegisterResponse))

      // Forgot
      this.code.set(MessageCode.FORGOT_GET_USERNAME, ValidatorForgotResponse.getUsername.bind(ValidatorForgotResponse))

      // Public Otp
      this.code.set(MessageCode.OTP_REQUIRE_SUCCESS, ValidatorOTPResponse.otpRequired.bind(ValidatorOTPResponse))
      this.code.set(MessageCode.OTP_SUBMIT_SUCCESS, ValidatorOTPResponse.otpSuccess.bind(ValidatorOTPResponse))

      ValidatorCommonResponse.instance = this
    }
    return ValidatorCommonResponse.instance
  }

  common(httpStatusCode, response) {
    this.logger.info('ValidatorCommonResponse excute common')
    this.logger.debug('Receive http status code', httpStatusCode)
    this.logger.debug('Receive response', response)
    try {
      if (httpStatusCode != this.httpCode.OK) {
        throw {field: `Http status code ${httpStatusCode}`, message: this.httpCode[httpStatusCode] || 'Message undefined'}
      }
      this.validator.isNotEmpty('Code', response.code, 'Is Not Empty')
      this.validator.isString('Code', response.code, 'Is Not String')
      this.validator.isNotEmpty('Data', response.data, 'Is Not Empty')
      if (this.code.has(response.code)) {
        return this.code.get(response.code)(response)
      }
      return response
    } catch (e) {
      this.logger.error(`ValidatorCommonResponse error Field: ${e.field} Message: ${e.message}`)
      return null
    }
  }

}

export default new ValidatorCommonResponse()
