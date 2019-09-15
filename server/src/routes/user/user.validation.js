/**
 * Created By Nguyen Cong Thanh on 10/09/2019 14:16.
 *
 * Copyright Intelin 2019.
 */

'use strict'

// import UserModel from './user.model'

class UserValidation {

  constructor() {
    if (!UserValidation.instance) {
      // this.UserModel = UserModel
      UserValidation.instance = this
    }
    return UserValidation.instance
  }
}

export default new UserValidation()
