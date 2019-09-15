/**
 * Created By Nguyen Cong Thanh on 13/05/2019 16:26.
 *
 * Copyright Intelin 2019.
 */

import BaseModel from '../base.model'

export default class PublicOtpModel extends BaseModel {

  constructor() {
    super()
    this.otpKey = {
      value: '',
      validator: [],
      message: []
    }

    this.code = {
      value: '',
      validator: [],
      message: []
    }

    this.contact = {
      value: '',
      validator: [],
      message: []
    }

    this.length = {
      value: '',
      validator: [],
      message: []
    }

    this.timeCodeExpire = {
      value: '',
      validator: [],
      message: []
    }

    this.isEmail = {
      value: false,
      validator: [],
      message: []
    }

    this.apiLink = {
      value: false,
      validator: [],
      message: []
    }
  }

  getValue() {
    return {
      contact: this.contact.value,
      length: this.length.value,
      timeCodeExpire: this.timeCodeExpire.value,
      code: this.code.value,
      otpKey: this.otpKey.value,
      isEmail: this.isEmail.value,
      apiLink: this.apiLink.value,
    }
  }

  getValueRequestOTP() {
    return {
      otpKey: this.otpKey.value,
      code: this.code.value,
      apiLink: this.apiLink.value,
    }
  }

}
