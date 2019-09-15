/**
 * Created By Nguyen Cong Thanh on 08/04/2019 09:43.
 *
 * Copyright Intelin 2019.
 */

import Axios from 'axios'

import AppConfig from '../../../config/app.conf.json'
import EnvConfig from '../../../config/env.conf.json'
import LoggerService from '../logger/logger.service'
import ValidatorCommonResponse from '../validation/response/common.response'
import ApiConstant from '../constants/api'

export default class BaseApiService {

  constructor() {
    this.logger = LoggerService
    this.config = AppConfig
    this.validatorCommonResponse = ValidatorCommonResponse
    this.apiConstant = ApiConstant
    this.axios = Axios.create({
      baseURL: EnvConfig[EnvConfig.CURRENT].API,
      timeout: this.config.REQUEST_TIMEOUT
    });
    this.request = this.request.bind(this)
    this.response = this.response.bind(this)
  }

  request(options) {
    this.logger.info('BaseApiService exucte request')
    this.logger.debug(`Receive options`, options)
    try {
      return this.axios.request(options)
    } catch (e) {
      this.logger.error(`BaseApiService request error ${e.toString()}`)
    }
  }

  response(response) {
    this.logger.info('BaseApiService excute response')
    this.logger.debug('Receive response', response)
    try {
      return this.validatorCommonResponse.common(response.status, response.data)
    } catch (e) {
      this.logger.error(`BaseApiService response ${e.message.toString()}`)
      return null
    }
  }

}
