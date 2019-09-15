/**
 * Created By Nguyen Cong Thanh on 24/04/2019 08:45.
 *
 * Copyright Intelin 2019.
 */

import LoggerService from '../../../logger/logger.service'
import ValidatorService from '../../validator'

class ValidatorRegisterResponse {

  constructor() {
    if (!ValidatorRegisterResponse.instance) {
      this.logger = LoggerService;
      this.validator = ValidatorService;
      ValidatorRegisterResponse.instance = this
    }
    return ValidatorRegisterResponse.instance
  }

  notOnlineBanking(response){
    this.logger.info('ValidatorRegisterResponse excute notOnlineBanking')
    this.logger.debug('Receive response', response)
    try {
      this.validator.isObject('Data', response.data, 'Is not obj')
      this.validator.isNotEmpty('cusName', response.data.otpKey, 'Is not empty')
      this.validator.isNotEmpty('phone', response.data.contact, 'Is not empty')
      this.validator.isNotEmpty('license', response.data.length, 'Is not empty')
      this.validator.isString('cusName', response.data.cusName, 'Is not string')
      this.validator.isString('phone', response.data.phone, 'Is not string')
      this.validator.isString('license', response.data.license, 'Is not string')
      return response
    } catch (e) {
      this.logger.error(`ValidatorRegisterResponse notOnlineBanking Field ${e.field} Message ${e.message}`)
      throw new Error(`ValidatorRegisterResponse notOnlineBanking Field ${e.field} Message ${e.message}`)
    }
  }
}

export default new ValidatorRegisterResponse()
