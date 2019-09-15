/**
 * Created By Nguyen Cong Thanh on 24/04/2019 08:45.
 *
 * Copyright Intelin 2019.
 */

import LoggerService from '../../logger/logger.service'
import ValidatorService from '../validator'

class ValidatorFormResponse {

  constructor() {
    if (!ValidatorFormResponse.instance) {
      this.logger = LoggerService;
      this.validator = ValidatorService;
      ValidatorFormResponse.instance = this
    }
    return ValidatorFormResponse.instance
  }

  getAllComponent(data) {
    this.logger.info('Excute validator getAllComponent')
    this.logger.debug('Receive response data', data)
    try {
      this.validator.isArray('dial_phone.json', data, 'Is not array')
    } catch (e) {
      this.logger.error(`Validator response data getAllComponent Field ${e.field} Message ${e.message}`)
    }
  }

  getAllDocument(data) {
    this.logger.info('Excute validator getAllDocument')
    this.logger.debug('Receive response data', data)
    try {
      this.validator.isArray('dial_phone.json', data, 'Is not array')
    } catch (e) {
      this.logger.error(`Validator response data getAllDocument Field ${e.field} Message ${e.message}`)
    }
  }

  createDocument(data) {
    this.logger.info('Excute validator createDocument')
    this.logger.debug('Receive response data', data)
    try {
      this.validator.isObject('dial_phone.json', data, 'Is not object')
    } catch (e) {
      this.logger.error(`Validator response data createDocument Field ${e.field} Message ${e.message}`)
    }
  }

}

export default new ValidatorFormResponse()
