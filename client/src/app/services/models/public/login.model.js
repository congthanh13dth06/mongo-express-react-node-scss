/**
 * Created By Nguyen Cong Thanh on 09/05/2019 10:43.
 *
 * Copyright Intelin 2019.
 */

import BaseModel from '../base.model'

export default class LoginModel extends BaseModel {

  constructor() {
    super()

    this.username = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isUsername'],
      message: [
        this.localizeKey.LOGIN_VALIDATION_USERNAME_MISSING,
        this.localizeKey.LOGIN_VALIDATION_USERNAME_INVALID,
        this.localizeKey.LOGIN_VALIDATION_USERNAME_INVALID
      ]
    }

    this.password = {
      value: '',
      validator: ['isNotEmpty', 'isString'],
      message: [
        this.localizeKey.LOGIN_VALIDATION_PASSWORD_MISSING,
        this.localizeKey.LOGIN_VALIDATION_PASSWORD_MISSING,
      ]
    }

    this.token = {
      value: '',
      validator: [],
      message: []
    }

  }

  getValueUsername() {
    return {
      username: this.username.value
    }
  }

  getValueRequestCheckUsername() {
    return {
      username: this.username.value
    }
  }

  getValueToken() {
    return {
      token: this.token.value
    }
  }

  getValuePassword() {
    return {
      password: this.password.value
    }
  }

  getValueRequestCheckPassword() {
    return {
      token: this.token.value,
      password: this.hashPassword(this.password.value)
    }
  }

}
