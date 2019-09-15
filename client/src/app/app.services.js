/**
 * Created By Nguyen Cong Thanh on 09/04/2019 13:43.
 *
 * Copyright Intelin 2019.
 */

import Moment from 'moment'

// import config
import AppConfig from '../config/app.conf'

// import constant
import ApiConstant from './services/constants/api'
import Localize from './services/constants/localize'
import Router from './services/constants/router'

// import api
import LoginApiService from './services/api/public/login.api'
import PublicOtpApiService from './services/api/public/otp.api'
import ForgotApiService from './services/api/public/forgot.api'
import RegisterApiService from './services/api/public/register.api'

// import service
import LoggerService from './services/logger/logger.service'
import HelperService from './services/helper/helper.service'
import TimeoutService from './services/validation/timeout'
import ValidatorService from './services/validation/validator'
import VertxService from './services/vertx/vertx.service'
import LocalizeService from './services/localize/localize.service'
import AuthenService from './services/authen/authen.service'
import ValidatorRegisterResponse from './services/validation/response/public/register.response'
import ValidatorPublicOTPResponse from './services/validation/response/public/otp.response'
import CacheLayoutService from './services/cache/cache.layout'
import ValidatorForgotResponse from './services/validation/response/public/forgot.response'

// import model
import PublicLoginModel from './services/models/public/login.model'
import PublicOtpModel from './services/models/public/otp.model'
import PublicForgotModel from './services/models/public/forgot.model'
import PublicRegisterModel from './services/models/public/register.model'

// import enum
import PublicForgotEnum from './services/enums/public/forgot.enum'
import PublicRegisterEnum from './services/enums/public/register.enum'
import LayoutRegisterEnum from './services/enums/layout/register.enum'
import LayoutLoginEnum from './services/enums/layout/login.enum'

// import code
import HttpCode from './services/codeResponse/http/http.code'
import ProcessCode from './services/codeResponse/process/common'
import MessageCode from './services/codeResponse/message/message.code'

class AppServices {

  constructor() {
    if (!AppServices.instance) {
      this.config = {
        app: AppConfig
      }
      this.constant = {
        api: ApiConstant,
        localize: Localize,
        router: Router
      }
      this.apis = {
        login: LoginApiService,
        publicOtp: PublicOtpApiService,
        forgot: ForgotApiService,
        register: RegisterApiService,
      }
      this.services = {
        moment: Moment,
        validator: ValidatorService,
        timeout: TimeoutService,
        helper: HelperService,
        logger: LoggerService,
        vertx: VertxService,
        localize: LocalizeService,
        authen: AuthenService,
        validationRegister: ValidatorRegisterResponse,
        validatorPublicOTPResponse: ValidatorPublicOTPResponse,
        cacheLayout: CacheLayoutService,
        validationForgot:ValidatorForgotResponse
      }
      this.models = {
        login: PublicLoginModel,
        publicOtp: PublicOtpModel,
        forgot: PublicForgotModel,
        register: PublicRegisterModel,
      }
      this.enums = {
        forgot: PublicForgotEnum,
        layoutRegister: LayoutRegisterEnum,
        register: PublicRegisterEnum,
        layoutLogin: LayoutLoginEnum
      }
      this.code = {
        http: HttpCode,
        process: ProcessCode,
        message: MessageCode
      }
      AppServices.instance = this
    }
    return AppServices.instance
  }

}

export default new AppServices()
