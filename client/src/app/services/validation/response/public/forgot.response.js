/**
 * Created By Nguyen Cong Thanh on 24/04/2019 08:45.
 *
 * Copyright Intelin 2019.
 */

import LoggerService from '../../../logger/logger.service'
import ValidatorService from '../../validator'

class ValidatorForgotResponse {

  constructor() {
    if (!ValidatorForgotResponse.instance) {
      this.logger = LoggerService;
      this.validator = ValidatorService;
      ValidatorForgotResponse.instance = this
    }
    return ValidatorForgotResponse.instance
  }

  getUsername(response) {
    this.logger.info('ValidatorForgotResponse excute getUsername')
    this.logger.debug('Receive response', response)
    try {
      this.validator.isObject('data', response.data, 'Is not obj')
      this.validator.isNotEmpty('username', response.data.username, 'Is not empty')
      this.validator.isString('username', response.data.username, 'Is not string')
      return response
    } catch (e) {
      this.logger.error(`ValidatorForgotResponse getUsername error Field ${e.field} Message ${e.message}`)
      throw new Error(`ValidatorForgotResponse getUsername error Field ${e.field} Message ${e.message}`)
    }
  }
}

export default new ValidatorForgotResponse()
