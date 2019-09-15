/**
 * Created By Nguyen Cong Thanh on 14/09/2019 21:38.
 *
 * Copyright Intelin 2019.
 */

import LoggerService from '../../../logger/logger.service'
import ValidatorService from '../../validator'

class ValidatorLoginResponse {

  constructor() {
    if (!ValidatorLoginResponse.instance) {
      this.logger = LoggerService;
      this.validator = ValidatorService;
      ValidatorLoginResponse.instance = this
    }
    return ValidatorLoginResponse.instance
  }

  checkUsername(response) {
    this.logger.info('ValidatorLoginResponse excute checkUsername')
    this.logger.debug('Receive response', response)
    try {
      this.validator.isObject('data', response.data, 'Is not obj')
      this.validator.isNotEmpty('username', response.data.username, 'Is not empty')
      this.validator.isString('username', response.data.username, 'Is not string')
      this.validator.isNotEmpty('token', response.data.token, 'Is not empty')
      this.validator.isString('token', response.data.token, 'Is not string')
      return response
    } catch (e) {
      this.logger.error(`ValidatorLoginResponse checkUsername error Field ${e.field} Message ${e.message}`)
      throw new Error(`ValidatorLoginResponse checkUsername error Field ${e.field} Message ${e.message}`)
    }
  }
}

export default new ValidatorLoginResponse()
