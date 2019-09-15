/**
 * Created By Nguyen Cong Thanh on 25/04/2019 11:21.
 *
 * Copyright Intelin 2019.
 */

import ValidatorService from '../validation/validator'
import HelperService from '../helper/helper.service'

import AppError from '../validation/error'
import LocalizeKey from '../constants/localize'

export default class BaseModel {

  constructor() {
    this.localizeKey = LocalizeKey
    this.helper = HelperService
  }

  set(field, value, property) {
    try {
      value = (typeof value === 'string') ? value.trim() : value
      ValidatorService.validate(field, value, property.validator, property.message)
      property.value = value
    } catch (e) {
      throw new AppError(e.field, e.message)
    }
  }

  hashPassword(password) {
    return this.helper.hashRSA(this.helper.hashMD5(password))
  }

}
