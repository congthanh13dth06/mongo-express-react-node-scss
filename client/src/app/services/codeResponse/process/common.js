/**
 * Created By Nguyen Cong Thanh on 24/04/2019 11:45.
 *
 * Copyright Intelin 2019.
 */

import MessageCode from '../message/message.code'
import LoggerService from '../../logger/logger.service'

// public
import LoginProcess from './public/login.process'
import PublicOtpProcess from './public/otp.process'
import ForgotProcess from './public/forgot.process'
import RegisterProcess from './public/register.process'

class ProcessCodeResponse {

  constructor() {
    if (!ProcessCodeResponse.instance) {
      this.logger = LoggerService
      this.code = new Map([])

      //public login
      this.code.set(MessageCode.LOGIN_NOT_FOUND_USERNAME, LoginProcess.checkUsernameNotExist.bind(LoginProcess)) // LOGIN_4004
      this.code.set(MessageCode.LOGIN_USERNAME_SUCCESS, LoginProcess.checkUsernameSuccess.bind(LoginProcess)) // LOGIN_2000
      this.code.set(MessageCode.LOGIN_PASSWORD_NOT_MATCH, LoginProcess.checkPasswordIncorrect.bind(LoginProcess)) // LOGIN_4005
      this.code.set(MessageCode.LOGIN_PASSWORD_SUCCESS, LoginProcess.checkPasswordSuccess.bind(LoginProcess)) // LOGIN_2001

      //public Otp
      // this.code.set(MessageCode.OTP_NOT_MATCH, PublicOtpProcess.otpSendIncorrect.bind(PublicOtpProcess)) // OTP_4000
      this.code.set(MessageCode.OTP_SUBMIT_SUCCESS, PublicOtpProcess.otpSuccess.bind(PublicOtpProcess)) // OTP_2002
      // this.code.set(MessageCode.OTP_RESEND_SUCCESS, PublicOtpProcess.otpSendIncorrect.bind(PublicOtpProcess)) // OTP_2003
      this.code.set(MessageCode.OTP_REQUIRE_SUCCESS, PublicOtpProcess.otpRequired.bind(PublicOtpProcess)) // OTP_2000
      // this.code.set(MessageCode.OTP_CODE_EXPIRED, PublicOtpProcess.otpRequired.bind(PublicOtpProcess)) // OTP_4001
      // this.code.set(MessageCode.OTP_TRANSACTION_FAILED, PublicOtpProcess.otpRequired.bind(PublicOtpProcess)) // OTP_4002

      //public forgot
      this.code.set(MessageCode.FORGOT_SEND_INFO_SUCCESS, ForgotProcess.sendInfoSuccess.bind(ForgotProcess)) // 0
      this.code.set(MessageCode.FORGOT_USER_NOT_FOUND, ForgotProcess.responseUserNotFound.bind(ForgotProcess)) // USER_4000
      this.code.set(MessageCode.FORGOT_UPDATE_PASSWORD_FAILED,ForgotProcess.updatePasswordFailed.bind(ForgotProcess))// PASSWORD_4000
      this.code.set(MessageCode.FORGOT_SEND_PASSWORD_SUCCESS,ForgotProcess.forgotPasswordSendSuccess.bind(ForgotProcess))// PASSWORD_2000
      this.code.set(MessageCode.FORGOT_GET_USERNAME,ForgotProcess.getUsername.bind(ForgotProcess))// USERNAME_2000

      //public register
      this.code.set(MessageCode.REGISTER_DUPLICATE_LICENSE, RegisterProcess.checkLicenseDuplicate.bind(RegisterProcess)) // CONFLICT_4000
      this.code.set(MessageCode.REGISTER_NOT_FOUND_USER, RegisterProcess.checkLicense_4041.bind(RegisterProcess)) // 4041
      this.code.set(MessageCode.REGISTER_UPDATE_TEMP_USER_SUCCESS, RegisterProcess.updateUserAfterOtp.bind(RegisterProcess)) // REGISTER_2006
      this.code.set(MessageCode.REGISTER_DUPLICATE_USERNAME, RegisterProcess.duplicateUsername.bind(RegisterProcess)) // CONFLICT_4001
      this.code.set(MessageCode.REGISTER_CREATE_MEETING_SCHEDULE_SUCCESS, RegisterProcess.meetingSchedule.bind(RegisterProcess)) // REGISTER_2003
      this.code.set(MessageCode.REGISTER_UPDATE_TEMP_USER_FROM_EXISTED_USER_SUCCESS, RegisterProcess.updateUserAfterOtp.bind(RegisterProcess)) // REGISTER_2002
      this.code.set(MessageCode.REGISTER_CREATE_TEMP_USER_WITHOUT_ONLINE_BANKING_SUCCESS, RegisterProcess.notOnlineBanking.bind(RegisterProcess)) // REGISTER_2001

      ProcessCodeResponse.instance = this
    }
    return ProcessCodeResponse.instance
  }

  checkCode(...props) {
    this.logger.info('ProcessCodeResponse excute checkCode')
    const [response] = props;
    this.logger.debug('ProcessCodeResponse checkCode receive response', response)
    if (!this.code.has(response.code)) {
      throw new Error(`Code ${response.code} is not define`)
    }
    this.code.get(response.code)(props)
  }

}

export default new ProcessCodeResponse()
