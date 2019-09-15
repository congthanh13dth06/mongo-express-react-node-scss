/**
 * Created By Nguyen Cong Thanh on 20/05/2019 15:01.
 *
 * Copyright Intelin 2019.
 */

import BaseModel from '../base.model'

export default class RegisterModel extends BaseModel {

  constructor() {
    super()

    this.fullName = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isFullName'],
      message: [
        this.localizeKey.REGISTER_VALIDATION_FULLNAME_MISSING,
        this.localizeKey.REGISTER_VALIDATION_FULLNAME_INVALID,
        this.localizeKey.REGISTER_VALIDATION_FULLNAME_INVALID
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
        this.localizeKey.REGISTER_VALIDATION_IDENTITY_DOCUMENT_NO_MISSING,
        this.localizeKey.REGISTER_VALIDATION_IDENTITY_CARD_NO_INVALID,
        this.localizeKey.REGISTER_VALIDATION_IDENTITY_CARD_NO_INVALID
      ]
    }

    this.phoneNumber = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isPhoneNumber'],
      message: [
        this.localizeKey.FORGOT_VALIDATION_PHONE_NO_MISSING,
        this.localizeKey.REGISTER_VALIDATION_PHONE_NO_INVALID,
        this.localizeKey.REGISTER_VALIDATION_PHONE_NO_INVALID
      ]
    }

    this.username = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isUsername'],
      message: [
        this.localizeKey.REGISTER_VALIDATION_USERNAME_MISSING,
        this.localizeKey.REGISTER_VALIDATION_USERNAME_INVALID,
        this.localizeKey.REGISTER_VALIDATION_USERNAME_INVALID
      ]
    }

    this.password = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isPassword'],
      message: [
        this.localizeKey.REGISTER_VALIDATION_PASSWORD_MISSING,
        this.localizeKey.REGISTER_VALIDATION_PASSWORD_INVALID,
        this.localizeKey.REGISTER_VALIDATION_PASSWORD_INVALID
      ]
    }

    this.city = {
      value: '',
      validator: [],
      message: []
    }

    this.branch = {
      value: '',
      validator: [],
      message: []
    }

    this.date = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isDate', 'isDateRegisterBooking'],
      message: [
        this.localizeKey.REGISTER_VALIDATION_DATE_WILL_COME_MISSING,
        this.localizeKey.REGISTER_VALIDATION_DATE_WILL_COME_INVALID,
        this.localizeKey.REGISTER_VALIDATION_DATE_WILL_COME_INVALID,
        this.localizeKey.REGISTER_VALIDATION_DATE_WILL_COME_INVALID
      ]
    }

    this.meetingAt = {
      value: '',
      validator: [],
      message: []
    }

    this.refNo = {
      value: '',
      validator: [],
      message: []
    }
  }

  getValueMain() {
    return {
      fullName: this.fullName.value,
      identityDocument: this.identityDocument.value,
      identityNo: this.identityNo.value,
    }
  }

  getValueRequestCheckLicense() {
    return {
      license: this.identityNo.value,
    }
  }

  getValueRequestSendPhone() {
    return {
      license: this.identityNo.value,
      cusName: this.fullName.value,
      phone: this.phoneNumber.value,
      licenseType: this.identityDocument.value,
    }
  }

  getValueRequestUpdateRegisterUserAfterOtp() {
    return {
      refNo: this.refNo.value,
      username: this.username.value,
      password: this.hashPassword(this.password.value)
    }
  }

  getValueInputPhone() {
    return {
      phoneNumber: this.phoneNumber.value
    }
  }

  getValueInputAccount() {
    return {
      refNo: this.refNo.value,
      username: this.username.value,
      password: this.hashPassword(this.password.value)
    }
  }

  getValueSchedule() {
    return {
      city: this.city.value,
      branch: this.branch.value,
      date: this.date.value,
      dateSelected: new Date()
    }
  }

  getValueRequestSchedule() {
    return{
      cusName: this.fullName.value,
      address: this.branch.value,
      phone: this.phoneNumber.value,
      license: this.identityNo.value,
      meetingAt: this.meetingAt.value
    }
  }

}
