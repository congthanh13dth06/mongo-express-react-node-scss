/**
 * Created By Nguyen Cong Thanh on 16/05/2019 14:17.
 *
 * Copyright Intelin 2019.
 */

import BaseModel from '../base.model'

export default class ForgotModel extends BaseModel {

  constructor() {
    super()

    this.username = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isUsername'],
      message: [
        this.localizeKey.REGISTER_VALIDATION_USERNAME_MISSING,
        this.localizeKey.REGISTER_VALIDATION_USERNAME_INVALID,
        this.localizeKey.REGISTER_VALIDATION_USERNAME_INVALID
      ]
    }


    this.phoneNumber = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isPhoneNumber'],
      message: [
        this.localizeKey.FORGOT_VALIDATION_PHONE_NO_MISSING,
        this.localizeKey.FORGOT_VALIDATION_PHONE_NO_INVALID,
        this.localizeKey.FORGOT_VALIDATION_PHONE_NO_INVALID
      ]
    }

    this.identityDocument = {
      value: '',
      validator: [],
      message: []
    }

    this.identityNo = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isIdentityNo'],
      message: [
        this.localizeKey.FORGOT_VALIDATION_IDENTITY_DOCUMENT_NO_MISSING,
        this.localizeKey.FORGOT_VALIDATION_IDENTITY_DOCUMENT_NO_INVALID,
        this.localizeKey.FORGOT_VALIDATION_IDENTITY_DOCUMENT_NO_INVALID
      ]
    }

    this.password = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isPassword'],
      message: [
        this.localizeKey.FORGOT_VALIDATION_PASSWORD_MISSING,
        this.localizeKey.FORGOT_VALIDATION_PASSWORD_INVALID,
        this.localizeKey.FORGOT_VALIDATION_PASSWORD_INVALID
      ]
    }

    this.refKey = {
      value: '',
      validator: [],
      message: []
    }
  }

  getValueMain() {
    return {
      phoneNumber: this.phoneNumber.value,
      identityDocument: this.identityDocument.value,
      identityNo: this.identityNo.value,
    }
  }

  getValueForgot() {
    return {
      license: this.identityNo.value,
      licenseType: this.identityDocument.value,
      phone: this.phoneNumber.value
    }
  }

  getValueInfo() {
    return {
      refKey: this.refKey.value,
      username: this.username.value,
      password: this.password.value
    }
  }

  getValueRequestInfo() {
    return {
      refKey: this.refKey.value,
      username: this.username.value,
      password: this.hashPassword(this.password.value)
    }
  }

  getValueRequestUsername() {
    return {
      refKey: this.refKey.value
    }
  }
}
